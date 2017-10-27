<?php

namespace SDK\Services;
use SDK\Objects\CManagerActionHistory;
use SDK\Objects\COrderPaymentLog;
use Vendor\Core\ActiveRecordList;


/**
 *
 * Отчет по менеджерам
 *
 * https://redmine.napdev.ru/issues/5294
 *
 * Class ServiceManagerReport
 * @package SDK\Services
 */
class ServiceManagerReport {

    /**
     * отчет
     * @var ActiveRecordList
     */
    protected $__report = null;

    /**
     * Начала периода
     * @var string
     */
    protected $__period_s;

    /**
     * Окончание периода
     * @var string
     */
    protected $__period_f;

    /**
     * ID менеджера для фильтрации
     * @var int || null
     */
    protected $__manager_id = null;

    /**
     * Флаг подтвержденные заказы
     * Описание подтвержденного заказа https://redmine.napdev.ru/issues/6945
     * @var bool
     */
    protected $__confirmation = false;

    /**
     * ServiceManagerReport constructor.
     * @param $date_s - Дата начала отчета в формате YYYY-mm-dd
     * @param $date_f - Дата окончания отчета в формате YYYY-mm-dd
     */
    public function __construct($date_s, $date_f) {

        $this->__period_s = sprintf('%s 00:00:00', $date_s);
        $this->__period_f = sprintf('%s 23:59:59', $date_f);
    }

    /**
     * Фильтрация по менеджеру
     * @param int $id || null
     */
    public function manager($id) {
        $this->__manager_id = $id;
    }

    /**
     * Выставляет флаг подтвержденного заказа
     * @param bool $value
     */
    public function confirmation($value) {
        $this->__confirmation = $value;
    }

    /**
     * Построение отчета
     * @return [
     *          ORDER_TYPE => [
     *              'payment_cnt' => Количество проведенных в период платежей,
     *              'orders_cnt' => Количество оплаченных в период заказов,
     *              'sum' => Сумма оплаченных заказов в период,
     *              'f_sum' => Сумма первой предоплаты за заказ,
     *              'f_cnt' => Количество первых предоплат за заказ,
     *              's_sum' => Сумма второй предоплаты за заказ,
     *              's_cnt' => Количество вторых предоплат за заказ,
     *              '100_sum' => Сумма полных оплат за заказ,
     *              '100_cnt' => Количество полных оплат за заказ,
     *          ]
     *      ]
     */
    public function build() {

        $this->__build();

        $__initial = [
            'payment_cnt' => 0, 'orders_cnt' => 0, 'sum' => 0, 'f_sum' => 0, 'f_cnt' => 0,
            's_sum' => 0, 's_cnt' => 0, 'cnt_100' => 0, 'sum_100' => 0
        ];

        $result = [];

        $period_s = strtotime($this->__period_s);
        $period_f = strtotime($this->__period_f);

        foreach ($this->__report as $log) {


            if(!isset($result[$log->type])) {
                $result[$log->type] = $__initial;
            }

            $result[$log->type]['orders_cnt']++;

            $f_pay = strtotime($log->first_date);
            $s_pay = strtotime($log->second_date);

            // Обработка первого платежа
            if($f_pay >= $period_s && $f_pay <= $period_f) {

                $result[$log->type]['payment_cnt']++;
                $result[$log->type]['sum'] += $log->first_sum;

                if($log->budget == $log->first_sum) {
                    // Заказ оплачен на 100% одним платежем
                    $result[$log->type]['sum_100'] += $log->first_sum;
                    $result[$log->type]['cnt_100']++;
                } else {
                    $result[$log->type]['f_sum'] += $log->first_sum;
                    $result[$log->type]['f_cnt']++;
                }

            }

            // Обработка второго платежа
            if($s_pay >= $period_s && $s_pay <= $period_f) {

                $result[$log->type]['payment_cnt']++;
                $result[$log->type]['sum'] += $log->second_sum;

                $result[$log->type]['s_sum'] += $log->second_sum;
                $result[$log->type]['s_cnt']++;

            }

        }

        return $this->__buildTotal($result);
    }

    /**
     * Построение строки ИТОГИ
     * @param array $data
     */
    protected function __buildTotal($data) {

        $__total = [
            'payment_cnt' => 0, 'orders_cnt' => 0, 'sum' => 0, 'f_sum' => 0, 'f_cnt' => 0,
            's_sum' => 0, 's_cnt' => 0, 'cnt_100' => 0, 'sum_100' => 0
        ];

        foreach ($data as $type => $values) {
            foreach ($values as $key => $value) {
                $__total[$key] += $value;
            }
        }

        $data['total'] = $__total;

        return $data;
    }

    /**
     * Выборка первоначальных данных
     */
    protected function __build() {

        $extra = [

            'fields' => [
                'o.type' => 'type',
                'o.budget' => 'budget'
            ],

            'join' => [
                'JOIN orders AS o ON o.id = order_payment_log.order_id AND ' . ($this->__manager_id ? 'o.pers_id = :manager_id' : '!ISNULL(o.pers_id)')
            ]
        ];

        $criteria = '((order_payment_log.first_date BETWEEN :start AND :finish) OR (order_payment_log.second_date BETWEEN :start AND :finish))';


        $params = [
            ':start' => $this->__period_s, ':finish' => $this->__period_f
        ];

        if($this->__manager_id) {
            $params[':manager_id'] = $this->__manager_id;
        }

        if($this->__confirmation) {

            $params[':action_type'] = 2;

            $orders_extra = [];
            $orders_extra['fields'] = [
                'manager_action_history.id'         => 'h_id',
                'manager_action_history.order_id'   => 'h_order',
                'manager_action_history.status'     => 'last_status'
            ];
            $orders_extra['join'][] = 'JOIN orders as o ON manager_action_history.order_id = o.id';
            $orders_extra['orderby'] = 'manager_action_history.date DESC';

            $orders_params = [
                ':action_type'  => 2
            ];


            $orders_criteria = 'manager_action_history.id IN (SELECT MAX(h2.id) as h_id FROM manager_action_history as h2 JOIN orders as o2 ON h2.order_id = o2.id WHERE h2.action_type = :action_type AND h2.date <= o2.in_progress_date GROUP BY h2.order_id) AND manager_action_history.date <= o.in_progress_date';

            if($this->__manager_id) {
                $orders_criteria .= ' AND o.pers_id = :manager_id ';
                $orders_params[':manager_id'] = $this->__manager_id;
            }

            $actions = CManagerActionHistory::find($orders_criteria, $orders_params, $orders_extra);

            $orders_id = array();
            foreach ($actions as $action) {
                if ($action->last_status == 4 || $action->last_status == 0) {
                    $orders_id[] = $action->h_order;
                }
            }
            
            $extra['groupby'] = 'order_payment_log.id';
            $extra['join'][] = 'JOIN manager_action_history AS h ON h.order_id = o.id AND h.action_type = :action_type AND h.date <= o.in_progress_date';


            if (count($orders_id)) {

                $params[':orders'] = $orders_id;

                $criteria .= ' AND order_payment_log.order_id NOT IN (:orders) AND o.id NOT IN (:orders) AND h.order_id NOT IN (:orders)';
            }
        }

        $this->__report = COrderPaymentLog::find($criteria, $params, $extra);

    }

}
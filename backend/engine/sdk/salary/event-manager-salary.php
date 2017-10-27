<?php

namespace SDK\Salary;
use SDK\Objects\CManagerActionHistory;
use SDK\Objects\CManagerSalary;
use SDK\Objects\CManagerTypePercent;
use SDK\Objects\COrder;
use SDK\Objects\CSettings;
use Vendor\Core\Db\DbFilter;

/**
 * Class EventManagerSalary
 *
 * Событие начисления/списания ЗП менеджера
 *
 * @package SDK\Salary
 */
abstract class EventManagerSalary {

    /**
     * Тип связи "телефонный звонок"
     */
    const ACTION_PHONE = 3;

    /**
     * Тип связи "Письмо"
     */
    const ACTION_MAIL = 4;

    /**
     * Константа настройки коэфициента телефонного звонка
     */
    const ACTION_SETTINGS_PHONE = 'call_percent_manager';

    /**
     * Константа настройки коэфициента телефонного звонка
     */
    const ACTION_SETTINGS_MAIL = 'mail_percent_manager';


    /**
     * Сумма от которой производится расчет ЗП
     * @var int
     */
    protected $__sum;

    /**
     * Заказ по которому начисляется ЗП
     * @var COrder
     */
    protected $__order;

    public function __construct($sum) {
        $this->__sum = $sum;
    }

    /**
     * Проводит начисление ЗП менеджера (создание записи)
     * @param COrder $order
     */
    public function process(COrder $order) {

        $this->__order = $order;

        $salary = new CManagerSalary();
        $salary->order_id = $order->id;
        $salary->action = $this->__action();
        $salary->action_sum = $this->__actionSum();
        $salary->salary_sum = $this->__salary();
        $salary->save();

        return true;
    }

    /**
     * Получаем сумму события
     * @return int
     */
    protected function __actionSum() {
        return $this->__sum;
    }

    /**
     * Получение коэффициента типа работы
     * @return float
     */
    protected function __kType() {

        if(!$p = CManagerTypePercent::findOne('manager = :m AND type = :t', [':m' => $this->__order->pers_id, ':t' => $this->__order->type])) {
            return 0;
        }

        return $p->persent / 100;
    }

    /**
     * Получение коэффициента начала работы с заказом
     * @return float
     */
    protected function __kStart() {
        return $this->__order->pers_rate;
    }

    /**
     * Получение коэффициента типа связи с клиентом (почта, телефон и тд)
     * @return float
     */
    protected function __kContact() {

        $criteria = new DbFilter();
        $criteria->addEqualCondition('order_id', $this->__order->id);
        $criteria->addInCondition('action_type', [self::ACTION_PHONE, self::ACTION_MAIL]);

        /**
         * Если заказ еще не перешел на выполнение - считаем, что работа началась до выполнения, тк в данном случае  in_progress_date равна NULL
         */
        if($this->__order->in_progress_date) {
            $criteria->addLessCondition('date', $this->__order->in_progress_date);
        }

        $list = CManagerActionHistory::find($criteria->getCriteria(), $criteria->getParams());


        if($list->getCount() == 0) {
            return 0;
        }

        $type = null;

        foreach ($list as $action) {

            /**
             * Коэфициент звонка является приоритетным
             */
            if($action->action_type == self::ACTION_PHONE) {
                $type = self::ACTION_SETTINGS_PHONE;
                break;
            }

            $type = self::ACTION_SETTINGS_MAIL;
        }

        if(!$k = CSettings::findValueByName($type)) {
            return 0;
        }

        return $k;
    }

    /**
     * Получение типа операции по которой происходит начисление ЗП
     * @return mixed
     */
    abstract protected function __action();

    /**
     * Функция расчет ЗП
     * @return mixed
     */
    abstract protected function __salary();

}
<?php

namespace SDK\Services;
use Bill\Objects\CTransaction;
use Bill\Services\ServicePayment;
use SDK\Objects\COrder;
use SDK\Objects\CUserGroup;
use Vendor\Core\Error\Ex404;


/**
 * Сервис для сбора статистики по промогруппе
 * Class ServicePromoGroupStatistic
 * @package SDK\Services
 */
class ServicePromoGroupStatistic {

    /**
     * Id владельца группы
     * @var
     */
    protected $group_owner_id;

    /**
     * Период, за который собирается статистика
     * @var
     */
    protected $period;

    /**
     * ServicePromoGroupStatistic constructor.
     * @param $user_id
     * @throws Ex404
     */
    public function __construct($user_id) {
        $group = CUserGroup::find('user_id = :user_id AND group_owner_id = :user_id', [':user_id' => $user_id]);

        if($group->getCount() == 0) {
            throw new Ex404();
        }

        $this->group_owner_id = $user_id;
    }

    /**
     * Получение статистики для владельца группы
     * Период задаётся в днях. Если не задано - расчёт ведётся за всё время
     * @param null $days
     * @return array
     */
    public function totalForPeriod($days = null) {

        $this->period = $days;

        return array_merge($this->__paid(), $this->__profit(), $this->__registers());
    }

    /**
     * Получение числа регистраций в промогруппу
     * @return ar
     */
    protected function __registers() {
        $criteria = [
            "group_owner_id = :owner_id"
        ];

        $params = [':owner_id' => $this->group_owner_id];

        if($this->period) {
            $criteria[] = 'create_date > NOW() - INTERVAL :period DAY';

            $params[':period'] = $this->period;
        }

        $result = CUserGroup::count(join(" AND ", $criteria), $params);

        return ['registers' => $result];
    }


    /**
     * Получение заработка владельца группы
     * @return array
     */
    protected function __profit() {
        //select SUM(trans_summ) as summ from transaction where to_acc = ? and trans_status = ? and trans_type = ? and create_date >= ? and create_date <= ?', array($user_id, CTransaction::BILLING_STATUS_OK, CTransaction::BILLING_PROMO_CODE_REFERAL_BONUS, $date_from, $date_to))

        $extra = [
            'fields' => [
                'SUM(trans_summ)' => 'profit'
            ]
        ];

        $criteria = [
            "to_acc = :group_owner_id",
            'trans_status = :ok_status',
            'trans_type = :trans_type',
        ];

        $params = [':group_owner_id' => $this->group_owner_id, ':ok_status' => CTransaction::STATUS_OK, ':trans_type' => ServicePayment::TYPE_PROMO_CODE_REFERAL_BONUS];

        if($this->period) {
            $criteria[] = 'create_date > NOW() - INTERVAL :period DAY';

            $params[':period'] = $this->period;
        }

        $result = CTransaction::findOne(join(" AND ", $criteria), $params, $extra);

        return ['profit' => $result->profit ? $result->profit : 0];

    }

    /**
     * Получение суммы и количества оплаченных заказов для пользователей, входящих в промогруппу
     * @return array
     */
    protected function __paid() {
        $ids = CUserGroup::findByOwner($this->group_owner_id);

        $extra = [
            'fields' => [
                'SUM(IF(status = :status_arbitrage, cash * complete_percent / 100, cash))' => 'sum',
                'COUNT(id)' => 'paid_count'
            ]
        ];

        $criteria = [
            "owner_id IN (:ids)",
            'pay_date IS NOT NULL'
        ];

        $params = [':ids' => $ids, ':status_arbitrage' => COrder::STATUS_ORDER_COMPLETED_ARBITRAGE];

        if($this->period) {
            $criteria[] = 'pay_date > NOW() - INTERVAL :period DAY';

            $params[':period'] = $this->period;
        }

        $result = COrder::findOne(join(" AND ", $criteria), $params, $extra);
        return ['paid_count' => $result->paid_count ? $result->paid_count : 0, 'paid_sum' => $result->sum ? $result->sum : 0];
    }

}
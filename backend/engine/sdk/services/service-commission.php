<?php

namespace SDK\Services;

use SDK\Objects\CCommissionSize;
use SDK\Objects\CComulativeDiscount;
use SDK\Objects\COrder;
use SDK\Objects\CUser;

/**
 * Class ServiceSubject
 * Работа с комиссиями системы
 * @package SDK\Services;
 */

class ServiceCommission {

    const DEFAULT_COMMISSION = 100;
    const DEFAULT_AGENCY_COMMISSION = 50;

    protected $order;
    protected $customer;

    protected $fee = 0;
    protected $discount_sum = 0;

    public function __construct(COrder $order, $sum) {

        $this->order = $order;
        $this->customer = CUser::findById($this->order->owner_id);

        $this->fee($sum);
    }

    /**
     * Расчет суммы комиссии
     * @param $sum
     */
    protected function fee($sum) {

        $commission_size = self::DEFAULT_AGENCY_COMMISSION / 100;

        if(empty($this->customer->agency_id)) {
            $result = CCommissionSize::find("type = :type AND interval_start <= :sum AND interval_end >= :sum", [':type' => $this->order->type, ':sum' => $sum]);
            $commission_size = ($result->getCount() == 0 ? self::DEFAULT_COMMISSION : $result->get(0)->comission_size) / 100;
        }

        // Размер комиссии для заказа
        $this->fee = $sum * $commission_size;

        if(empty($this->customer->agency_id) && !empty($this->customer->com_discount_id)) {
            if($discount = CComulativeDiscount::findById($this->customer->com_discount_id)) {
                if($discount->status == CComulativeDiscount::DISCOUNT_ACTIVE) {
                    $this->discount_sum = round(($this->fee + $sum) * $discount->discount / 100);
                    $this->fee = $this->fee - $this->discount_sum;
                }
            }
        }
    }

    /**
     * Получает расчитанную комиссию
     * @return int
     */
    public function getFee() {
        return $this->fee;
    }

    /**
     * Получает сумму скидки
     * @return int
     */
    public function getDiscountSum() {
        return $this->discount_sum;
    }

}
<?php

namespace SDK\Salary;

use SDK\Objects\CManagerSalary;
use SDK\Objects\COrder;

/**
 * Class EventOrderPayment
 *
 * Событие Расчет ЗП менеджера за завершение заказа
 *
 * @package SDK\Salary
 */
class EventOrderComplete extends EventManagerSalary {

    /**
     * Успешно заверешнный статус заказа
     */
    const SUCCESS_STATUS = 18;

    /**
     * Статус заказа Завершен арбитражем
     */
    const COMPLETE_BY_ARBITRAGE = 20;

    /**
     * Статус заказа Отменен арбитражем
     */
    const CANCELED_BY_ARBITRAGE = 21;


    /**
     * @see EventManagerSalary
     * @param COrder $order
     */
    public function process(COrder $order) {

        if(!in_array(intval($order->status), [self::SUCCESS_STATUS, self::COMPLETE_BY_ARBITRAGE, self::CANCELED_BY_ARBITRAGE])) {
            return false;
        }

        return parent::process($order);
    }


    /**
     * @see EventManagerSalary
     */
    protected function __action() {

        if($this->__order->status == self::SUCCESS_STATUS) {
            return 'COMPLETED';
        }

        return $this->__order->status == self::COMPLETE_BY_ARBITRAGE ? 'COMPLETED_ARBITRAGE' : 'CANCELED_ARBITRAGE';
    }

    /**
     * Получение суммы предыдущих начислений
     */
    protected function __salarySum() {
        $list = CManagerSalary::find("order_id = :oid", [':oid' => $this->__order->id]);
        return array_sum($list->salary_sum);
    }

    /**
     * @see EventManagerSalary
     */
    protected function __salary() {
        return round((($this->__actionSum() * ($this->__order->complete_percent / 100) * $this->__kType() * ($this->__kStart() + $this->__kContact())  / 2)), 2) - $this->__salarySum();
    }

}
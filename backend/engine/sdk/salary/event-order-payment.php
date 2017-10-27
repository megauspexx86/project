<?php

namespace SDK\Salary;

/**
 * Class EventOrderPayment
 *
 * Событие Расчет ЗП менеджера за оплату заказа
 *
 * @package SDK\Salary
 */
class EventOrderPayment extends EventManagerSalary {

    /**
     * Порядковый номер оплаты за заказ
     * @var int
     */
    protected $__payment_index;

    public function __construct($sum, $index) {

        parent::__construct($sum);

        $this->__payment_index = intval($index);
    }

    /**
     * @see EventManagerSalary
     */
    protected function __action() {
        return $this->__payment_index == 1 ? 'FIRST_PAYMENT' : 'SECOND_PAYMENT';
    }

    /**
     * @see EventManagerSalary
     */
    protected function __salary() {
        return round((($this->__sum * $this->__kType() * ($this->__kStart() + $this->__kContact())  / 2)), 2);
    }

}
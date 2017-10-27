<?php

namespace SDK\Salary;
use SDK\Objects\CManagerSalary;
use SDK\Objects\COrder;

/**
 * Class EventRefund
 *
 * Событие полный вовзрат суммы (автор отказался и необходимо вернуть всю сумму)
 *
 * @package SDK\Salary
 */
class EventRefund extends EventManagerSalary {


    /**
     * Сумма текущих начислений
     * @var float
     */
    protected $__salary_sum = 0;

    /**
     * @param COrder $order
     * @see EventManagerSalary
     */
    public function process(COrder $order) {

        $this->__order = $order;

        $this->__salarySum();

        if($this->__salary_sum == 0) {
            return false;
        }

        return parent::process($order);
    }

    /**
     * @see EventManagerSalary
     */
    protected function __actionSum() {
        return $this->__sum * -1;
    }

    /**
     * @see EventManagerSalary
     */
    protected function __action() {
        return 'AUTHOR_REFUSED';
    }

    /**
     * Получение суммы предыдущих начислений
     */
    protected function __salarySum() {
        $list = CManagerSalary::find("order_id = :oid", [':oid' => $this->__order->id]);
        $this->__salary_sum = array_sum($list->salary_sum);
    }

    /**
     * @see EventManagerSalary
     */
    protected function __salary() {
        return $this->__salary_sum * -1;
    }

}
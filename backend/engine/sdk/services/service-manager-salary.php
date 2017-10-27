<?php

namespace SDK\Services;

use SDK\Objects\CManagerActionHistory;
use SDK\Objects\COrder;
use SDK\Salary\EventManagerSalary;

/**
 * Class ServiceManagerSalary
 *
 * Алгоритм начисления ЗП менеджерам
 *
 * https://redmine.napdev.ru/issues/9551
 *
 * @package SDK\Services
 */
class ServiceManagerSalary {

    /**
     * Тип действия "Смена статуса" менеджера по заказу
     * MANAGER_ACTION_HISTORY.ACTION_TYPE
     */
    const MANAGER_ACTION_CHANGE_STATUS = 2;

    /**
     * Действие "ОТЛОЖЕН" по заказу
     * MANAGER_ACTION_HISTORY.STATUS
     */
    const MANAGER_ACTION_DEFFERED = 4;

    /**
     * Объект события при котором наступает начисление ЗП
     * @var EventManagerSalary
     */
    protected $__event;

    /**
     * Заказ по которому наступает событие
     * @var COrder
     */
    protected $__order;

    public function __construct(COrder $order, EventManagerSalary $event) {
        $this->__order = $order;
        $this->__event = $event;
    }

    /**
     * Проводит операцию
     * @return bool
     */
    public function process() {

        if(!$this->__canProcess()) {
            return false;
        }

        return $this->__event->process($this->__order);
    }

    /**
     * Проверка необходимо ли проводить начисление ЗП менеджеру
     * @return bool
     */
    protected function __canProcess() {

        if(intval($this->__order->pers_id) == 0) {
            return false;
        }

        $params = [':oid' => $this->__order->id, ':type' => self::MANAGER_ACTION_CHANGE_STATUS];

        $actions = CManagerActionHistory::find('order_id = :oid AND action_type = :type', $params);

        $action_types = array_unique($actions->status);

        if($actions->getCount() == 0 || (sizeof($action_types) == 1 && $action_types[0] == self::MANAGER_ACTION_DEFFERED)) {
            return false;
        }

        return true;
    }

}
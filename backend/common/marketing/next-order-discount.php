<?php

namespace Marketing;

use SDK\Objects\CActionLog;
use SDK\Objects\CDiscount;
use SDK\Objects\CDiscountRegistration;
use SDK\Objects\COrder;
use Vendor\Core\Error\Ex403;
use Vendor\Core\Error\Ex404;
use Vendor\Core\ProjectConfig;

class NextOrderDiscount
{

    /**
     * Объект заказа
     * @var
     */
    protected $order;

    /**
     * Конфигурация для скидки
     * @var
     */
    protected $config;

    /**
     * Доступность скидки на второй заказ для пользователя
     * @var
     */
    protected $log_second;

    /**
     * Доступность скидки на третий заказ для пользователя
     * @var
     */
    protected $log_third;

    /**
     * Скидка на второй заказ
     * @var
     */
    protected $discount_second;

    /**
     * Скидка на третий заказ
     * @var
     */
    protected $discount_third;


    /**
     * NextOrderDiscount constructor.
     * @param COrder $order
     * @throws Ex403
     */
    public function __construct(COrder $order) {
        $this->order = $order;
        if($order->status != COrder::STATUS_MAKING_WORK) {
            throw new Ex403();
        }

        $this->config = ProjectConfig::getInstance()->getKey('marketing', 'second_third_orders_discounts');

        $this->discount_second = CDiscount::findByCode($this->config['second_order_discount']);
        $this->discount_third = CDiscount::findByCode($this->config['third_order_discount']);

        if(!$this->discount_second || !$this->discount_third) {
            throw new Ex404();
        }

        $this->log_second = CActionLog::findByOwnerObject($this->order->owner_id, $this->discount_second->id);
        $this->log_third = CActionLog::findByOwnerObject($this->order->owner_id, $this->discount_third->id);
    }

    /**
     * Генерация скидки на второй или третий заказ для пользователя
     * @return bool|CActionLog
     */
    public function generate() {
        if(empty($this->log_second)) {
            return $this->__generateSecondOrderDiscount();
        }

        if(empty($this->log_third)) {
            return $this->__generateThirdOrderDiscount();
        }

        return false;
    }

    /**
     * Регистрация скидки для пользователя на третий заказ
     * @return bool|CActionLog
     */
    protected function __generateThirdOrderDiscount() {
        if(CDiscountRegistration::findByOrderDiscountId($this->order->id, $this->discount_second->id)) {
            $action_log = new CActionLog();
            $action_log->owner_id = $this->order->owner_id;
            $action_log->action = CActionLog::CUSTOMER_PROMO_THIRD;
            $action_log->object_id = $this->discount_third->id;
            return $action_log->save();
        }

        return false;
    }

    /**
     * Регистрация скидки для пользователя на второй заказ
     * @return bool|CActionLog
     */
    protected function __generateSecondOrderDiscount() {
        if($this->__validate()) {
            $action_log = new CActionLog();
            $action_log->owner_id = $this->order->owner_id;
            $action_log->action = CActionLog::CUSTOMER_PROMO_SECOND;
            $action_log->object_id = $this->discount_second->id;
            return $action_log->save();
        }

        return false;
    }

    /**
     * Проверка заказа перед генерацией скидки пользователю на второй заказ
     * @return bool
     */
    protected function __validate() {

        if(!$this->__checkCreateDate()) {
            return false;
        }

        if(!$this->__checkPayDate()) {
            return false;
        }

        if(!(intval($this->order->prepayment_percent) == 100)) {
            return false;
        }

        return true;
    }

    /**
     * Проверка на дату создания заказа
     * @return bool
     */
    protected function __checkCreateDate() {
        return strtotime($this->config['order_create_date_from']) <= strtotime($this->order->create_day) && strtotime($this->config['order_create_date_to']) >= strtotime($this->order->create_day);
    }

    /**
     * Проверка заказа на дату оплаты
     * @return bool
     */
    protected function __checkPayDate() {
        return strtotime($this->config['order_pay_date_from']) <= strtotime($this->order->pay_date) && strtotime($this->config['order_pay_date_to']) >= strtotime($this->order->pay_date);
    }

}
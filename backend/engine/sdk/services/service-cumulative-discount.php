<?php

namespace SDK\Services;

use Email\Objects\EmlChangeDiscount;
use SDK\Objects\CComulativeDiscount;
use SDK\Objects\CDiscountComRegistration;
use SDK\Objects\COrder;
use SDK\Objects\COrderBet;
use SDK\Objects\CUser;
use SDK\Objects\CUserGroup;


/**
 *
 * Реализация функционала по накопительной скидке
 *
 * Class ServiceDiscount
 * @package SDK\Services
 */
class ServiceCumulativeDiscount {

    /**
     * @var \Vendor\Core\ActiveRecord
     */
    protected $user;

    /**
     * Начальная накопительная скидка
     * @var \Vendor\Core\ActiveRecord
     */
    protected $start_discount;


    /**
     * ServiceCumulativeDiscount constructor.
     * @param $user_id
     */
    public function __construct($user_id) {
        $this->user = CUser::findById($user_id);

    }

    /**
     * Пересчёт накопительной скидки
     * @return bool
     */
    public function recount() {
        if($this->__canUse()) {
            if($group = CUserGroup::findByUserId($this->user->id)) {
                return $this->__recountGroup($group);
            }
            return $this->__recountSimple();
        }
    }

    /**
     * Регистрация применения накопительной скидки по заказу
     * @param COrderBet $offer
     * @param COrder $order
     * @return bool
     */
    public function registerDiscount(COrderBet $offer, COrder $order) {

        if(CDiscountComRegistration::activeDiscount($order->id)) {
            return false;
        }

        if($offer->discount_sum) {
            $discount_reg = new CDiscountComRegistration();
            $discount_reg->discount_id = $this->user->com_discount_id;
            $discount_reg->user_id = $this->user->id;
            $discount_reg->order_id = $order->id;
            $discount_reg->discount_sum = $offer->discount_sum;
            $discount_reg->save();
        }
    }

    /**
     * Удаляем накопительную скидку
     * @param COrder $order
     */
    public function delete(COrder $order) {
        if($discount = CDiscountComRegistration::activeDiscount($order->id)) {
            $discount->delete();
        }
    }

    /**
     * Проверка на использования накопительной скидки
     * @return bool
     */
    protected function __canUse() {
        if($this->user->com_discount_id) {
            $this->start_discount = CComulativeDiscount::findById($this->user->com_discount_id);
        }

        if ($this->user->agency_id || $this->user->is_agent || $this->user->role != CUser::ROLE_CUSTOMER) {
            $this->user->com_discount_id = null;
            $this->user->save();
            return false;
        }
        return true;
    }


    /**
     * Пересчёт накопительной скидки для группы
     * @param CUserGroup $group
     * @return bool
     */
    protected function __recountGroup(CUserGroup $group) {
        $user_ids = CUserGroup::findByOwner($group->group_owner_id);

        if(empty($user_ids)) {
            return false;
        }

        $list = CUser::findByIds($user_ids);

        $discount_id = $this->__level($user_ids, 'GROUP');

        if ($discount_id) {
            if ($this->__canChange($discount_id)) {
                $this->syncGroup($list, $discount_id);
            }
        }

        //синхронизируем скидки пользователей группы, если добавился новый участник, а скидка группы устарела
        $group_owner = CUser::findById($group->group_owner_id);
        $this->syncGroup($list, $group_owner->com_discount_id);

    }

    /**
     * Пересчет негрупповой накопительной скидки
     */
    protected function __recountSimple() {
        $discount_id = $this->__level($this->user->id);

        if ($discount_id) {
            if ($this->__canChange($discount_id)) {
                $this->user->com_discount_id = $discount_id;
                $this->user->save();

                if (!$this->start_discount || $this->start_discount->id != $discount_id) {
                    $mail = new EmlChangeDiscount($this->user);
                    $mail->send();
                }
                return true;
            }
        }
        return false;
    }

    /**
     * Проверка на возможность изменения накопительной скидки
     * @param $discount_id
     * @return bool
     */
    protected function __canChange($discount_id) {

        $new_discount = CComulativeDiscount::findById($discount_id);

        $start_discount_percent = 0;
        if ($this->start_discount) {
            $start_discount_percent = $this->start_discount->discount;
            $start_discount_actual = $this->start_discount->actual == CComulativeDiscount::DISCOUNT_ACTUAL;
        }

        return (($new_discount->discount >= $start_discount_percent && isset($start_discount_actual) && !$start_discount_actual) || !$start_discount_percent || (isset($start_discount_actual) && $start_discount_actual));
    }


    /**
     * Получение текущего уровня накопительной скидки
     * @param $user_ids
     * @param string $type
     * @return bool|int
     */
    protected function __level($user_ids, $type = "PERSONAL") {
        $service_order = new ServiceOrder();
        $sum = $service_order->amountFinishedOrders($user_ids);
        if($sum) {
            $discount = CComulativeDiscount::findOne('actual = :actual AND summ <= :sum AND status = :status AND discount_type = :discount_type', [':actual' =>CComulativeDiscount::DISCOUNT_ACTUAL, ':sum' => $sum, ':status' => CComulativeDiscount::DISCOUNT_ACTIVE, ':discount_type' => $type], array('orderby' => 'summ DESC'));
            if($discount) {
                return $discount->id;
            }
        }
        return false;
    }

    /**
     * Синхронизация скидок всех пользователей группы
     * @param $list
     * @param $discount_id
     */
    protected function syncGroup($list, $discount_id) {
        if($list->getCount()){
            foreach($list as $user) {
                if($user->role == CUser::ROLE_CUSTOMER) {
                    $user->com_discount_id = $discount_id;
                    $user->save();
                }
            }
        }
    }


}
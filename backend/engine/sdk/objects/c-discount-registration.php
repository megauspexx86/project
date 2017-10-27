<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CDiscountRegistration extends ActiveRecord {

    static protected function model() {

        return [
            'create_date' => '',
            'discount_id' => '',
            'user_id' => '',
            'order_id' => '',
            'discount_sum' => ''
        ];

    }

    /**
     * Получение количества активированных кодов
     * @param $discount_id
     * @param $user_id
     * @return int
     */
    public static function countActivatedCodes($discount_id, $user_id) {
        return self::count('discount_id = :discount_id AND user_id = :user_id', [':discount_id' => $discount_id, ':user_id' => $user_id]);
    }

    /**
     * Получение активной скидки по заказу
     * @param $order_id
     * @return ActiveRecord
     */
    public static function activeDiscount($order_id) {
        return self::findOne('order_id = :order_id', [':order_id' => $order_id]);
    }

    /**
     * Получение применённой скидки по заказу и по id скидки
     * @param $order_id
     * @param $discount_id
     * @return ActiveRecord
     */
    public static function findByOrderDiscountId($order_id, $discount_id) {
        return self::findOne('order_id = :order_id AND discount_id = :discount_id', [':order_id' => $order_id, ':discount_id' => $discount_id]);
    }

    protected function saveInsert() {
        $this->create_date = (new \DateTime())->format('Y-m-d H:i:s');
        parent::saveInsert();
    }

    static protected function dbTable() {
        return 'discount_registration';
    }

}

?>
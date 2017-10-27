<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CDiscountComRegistration extends ActiveRecord {

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
     * Получение активной накопительной скидки по заказу
     * @param $order_id
     * @return ActiveRecord
     */
    public static function activeDiscount($order_id) {
        return self::findOne('order_id = :order_id', [':order_id' => $order_id]);
    }

    protected function saveInsert() {
        $this->create_date = (new \DateTime())->format('Y-m-d H:i:s');
        parent::saveInsert();
    }

    static protected function dbTable() {
        return 'discount_com_registration';
    }

}

?>
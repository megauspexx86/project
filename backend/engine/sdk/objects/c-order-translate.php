<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class COrderTranslate extends ActiveRecord {

    static protected function model() {

        return [
           'order_id' => '', 'language' => ''
        ];

    }

    static protected function dbTable() {
        return 'order_translate';
    }

    /**
     * Получение объекта перевода по order_id
     * @param $order_id
     * @return ActiveRecord
     */
    static public function findByOrderId($order_id) {
        return self::findOne('order_id = :order_id', [':order_id' => $order_id]);
    }
}

?>
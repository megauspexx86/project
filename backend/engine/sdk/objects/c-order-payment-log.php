<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;
use Vendor\Core\ActiveRecordExtended;

class COrderPaymentLog extends ActiveRecordExtended {

    static protected function model() {

        return [
           'order_id' => null, 'first_sum' => null, 'first_date' => null, 'second_sum' => null, 'second_date' => null
        ];

    }

    /**
     * Получение лога по order_id
     * @param $id
     * @return ActiveRecord
     */
    static public function findByOrderId($id) {
        return self::findOne('order_id = :id', [':id' => $id]);
    }

    static protected function dbTable() {
        return 'order_payment_log';
    }
}

?>
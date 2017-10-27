<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CDiscount extends ActiveRecord {

    const STATUS_ACTIVE = 'active';

    const STATUS_DISABLED = 'disabled';

    const RECIPIENT_TYPE_ALL = 'all';
    const RECIPIENT_TYPE_CUSTOMER = 'customer';
    const RECIPIENT_TYPE_AGENCY = 'agency';
    const RECIPIENT_TYPE_AUTHOR = 'author';

    static protected function model() {

        return [
            'create_date' => '',
            'code' => '',
            'min_sum' => '',
            'discount_type' => '',
            'discount' => '',
            'user_limit' => '',
            'user_id' => '',
            'comment' => '',
            'status' => '',
            'signup_from' => '',
            'signup_to' => '',
            'can_edit' => '',
            'deleted' => '',
            'recipient_type' => '',
            'order_type' => '',
            'period_from' => '',
            'period_to' => ''
        ];

    }

    protected function saveInsert() {
        $this->create_date = (new \DateTime())->format('Y-m-d H:i:s');
        parent::saveInsert();
    }

    /**
     * Получение объекта CDiscount по коду скидки
     * @param $code
     * @return ActiveRecord
     */
    public static function findByCode($code) {
        return self::findOne('code = :code', [':code' => $code]);
    }

    static protected function dbTable() {
        return 'discount';
    }



}

?>
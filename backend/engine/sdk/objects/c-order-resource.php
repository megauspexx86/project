<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class COrderResource extends ActiveRecord {

    static protected function model() {

        return [
           'order_id' => '', 'file_name' => '', 'original_name' => '', 'owner_id' => '', 'create_day' => '', 'is_new' => '', 'is_deleted' => '0'
        ];

    }

    /**
     * @param int $order_id
     * @param int $user_id
     * @return ObjectList
     */
    static public function findByOrderIdAndUserId($order_id, $user_id) {
        return self::find("order_id = ? and owner_id = ?", array($order_id, $user_id));
    }

    static protected function dbTable() {
        return 'order_resource';
    }

    protected function saveInsert() {

        $this->create_day = (new \DateTime())->format('Y-m-d H:i:s');

        return parent::saveInsert();
    }
}

?>
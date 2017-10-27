<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class COrderDeleteCause extends ActiveRecord {

    static protected function model() {

        return [
           'order_id' => null, 'owner_id' => null, 'cause' => null, 'date' => null, 'comment' => null, 'order_create_date' => null, 'type' => ''
        ];

    }

    protected function saveInsert() {
        $this->date = (new \DateTime())->format('Y-m-d H:i:s');
        parent::saveInsert();
    }

    static protected function dbTable() {
        return 'order_delete_cause';
    }



}

?>
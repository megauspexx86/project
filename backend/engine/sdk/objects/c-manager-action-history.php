<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CManagerActionHistory extends ActiveRecord {

    static protected function model() {

        return [
            'order_id'      => '',
            'manager_id'    => '',
            'action'        => '',
            'date'          => null,
            'status'        => 0,
            'type'          => 0,
            'id'            => null,
            'action_type'   => null
        ];
    }

    static protected function dbTable() {
        return 'manager_action_history';
    }

}
<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class COrderProperty extends ActiveRecord {

    static protected function model() {

        return [
           'order_id' => '', 'property_code' => '', 'property_value' => ''
        ];

    }

    static protected function dbTable() {
        return 'order_property';
    }
}

?>
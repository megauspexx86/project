<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CDefaultFee extends ActiveRecord {

    static protected function model() {

        return [
           'type_id' => null, 'value' => null
        ];

    }

    static protected function dbTable() {
        return 'default_fee';
    }
}

?>
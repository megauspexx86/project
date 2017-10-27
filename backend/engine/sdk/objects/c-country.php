<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CCountry extends ActiveRecord {

    static protected function model() {

        return [
           'country_name' => null, 'sort_index' => null
        ];

    }

    static protected function dbTable() {
        return 'country';
    }
}

?>
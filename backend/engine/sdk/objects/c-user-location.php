<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CUserLocation extends ActiveRecord {

    static protected function model() {

        return [
           'type' => 'php', 'user_id' => null, 'date' => null, 'country_name' => null,
            'region' => null, 'city' => null, 'adress' => null, 'int_val' => null,
            'main_country' => null
        ];

    }

    static protected function dbTable() {
        return 'user_location';
    }
}

?>
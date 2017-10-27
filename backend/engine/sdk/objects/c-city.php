<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CCity extends ActiveRecord {

    static protected function model() {

        return [
           'country_id' => null, 'city_name' => null, 'sort_index' => null
        ];

    }

    static protected function dbTable() {
        return 'city';
    }

    static function getCitiesByUserId($user_id) {

        $extra = [

            'join' => [
                'JOIN users ON users.country = city.country_id'
            ],

            'orderby' => 'sort_index ASC'
        ];

        return CCity::find("users.id = :user_id", [':user_id' => $user_id], $extra);

    }
}

?>
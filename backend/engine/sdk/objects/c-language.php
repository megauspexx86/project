<?php

namespace SDK\Objects;


use Vendor\Core\ActiveRecord;

class CLanguage extends ActiveRecord {


    static protected function model() {

        return [
           'name' => null, 'sort' => null
        ];
    }

    static protected function dbTable() {
        return 'language';
    }
}

?>
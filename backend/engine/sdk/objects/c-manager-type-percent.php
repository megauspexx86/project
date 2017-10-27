<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CManagerTypePercent extends ActiveRecord  {


    static protected function model() {

        return [
           'type' => null, 'persent' => null, 'manager' => null
        ];

    }

    static protected function dbTable() {
        return 'pers_managers_persent';
    }



}

?>
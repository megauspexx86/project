<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CPersManagers extends ActiveRecord {

    static protected function model() {

        return [
           'name' => null, 'status' => null, 'tel' => null, 'icq' => null, 'mail' => null, 'skype' => null, 'avatar' => null, 'to_manager' => '', 'date_block' => ''
        ];

    }


    static protected function dbTable() {
        return 'pers_managers';
    }



}

?>
<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CAdmin extends ActiveRecord {


    static protected function model() {

        return [
           'name' => null, 'email' => null, 'password_md5' => null, 'role' => null, 'persm_id' => null, 'auth_token' => null
        ];

    }


    static protected function dbTable() {
        return 'admin';
    }



}

?>
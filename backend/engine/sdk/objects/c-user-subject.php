<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CUserSubject extends ActiveRecord {


    static protected function model() {

        return [
           'user_id' => null, 'subject_id' => null
        ];

    }

    static protected function dbTable() {
        return 'user_subject';
    }



}

?>
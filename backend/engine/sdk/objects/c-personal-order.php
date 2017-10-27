<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecordExtended;

class CPersonalOrder extends ActiveRecordExtended {


    static protected function model() {

        return [
           'order_id' => null, 'author_id' => null, 'status' => 'ACTIVE', 'comment' => null
        ];

    }

    static protected function dbTable() {
        return 'personal_order';
    }
}

?>
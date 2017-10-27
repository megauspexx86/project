<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CCommissionSize extends ActiveRecord {

    static protected function model() {
        return ['type' => null, 'interval_start' => null, 'interval_end' => null, 'comission_size' => null];
    }

    static protected function dbTable() {
        return 'comission_size';
    }
}

?>
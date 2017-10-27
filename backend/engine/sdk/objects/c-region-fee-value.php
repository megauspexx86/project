<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecordExtended;

class CRegionFeeValue extends ActiveRecordExtended  {


    static protected function model() {

        return [
           'region_id' => null, 'status' => 'ACTIVE', 'type' => null, 'value' => null
        ];

    }

    static protected function dbTable() {
        return 'region_fee_value';
    }



}

?>
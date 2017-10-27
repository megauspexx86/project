<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecordExtended;

class CRegionFee extends ActiveRecordExtended  {


    static protected function model() {

        return [
           'country_id' => null, 'region_id' => null, 'city_id' => null, 'status' => 'ACTIVE'
        ];

    }

    static protected function dbTable() {
        return 'region_fee';
    }



}

?>
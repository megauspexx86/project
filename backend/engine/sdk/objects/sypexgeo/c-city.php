<?php

namespace SDK\Objects\Sypexgeo;

use Vendor\Core\ActiveRecord;


class CCity extends ActiveRecord  {


    static protected function model() {

        return [
           'region_id' => null, 'name_ru' => null, 'name_en' => null,
            'lat' => null, 'lon' => null, 'okato' => null
        ];

    }

    static protected function dbTable() {
        return 'sxgeo_cities';
    }



}

?>
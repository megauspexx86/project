<?php

namespace SDK\Objects\Sypexgeo;

use Vendor\Core\ActiveRecord;


class CCountry extends ActiveRecord  {


    static protected function model() {

        return [
           'iso' => null, 'continent' => null, 'name_ru' => null, 'name_en' => null,
            'lat' => null, 'lon' => null, 'timezone' => null
        ];

    }

    static protected function dbTable() {
        return 'sxgeo_country';
    }



}

?>
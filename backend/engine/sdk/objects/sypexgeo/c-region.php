<?php

namespace SDK\Objects\Sypexgeo;

use Vendor\Core\ActiveRecord;


class CRegion extends ActiveRecord  {


    static protected function model() {

        return [
           'iso' => null, 'country' => null, 'name_ru' => null, 'name_en' => null, 'timezone' => null, 'okato' => null
        ];

    }

    static protected function dbTable() {
        return 'sxgeo_regions';
    }



}

?>
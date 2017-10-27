<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CUserGeo extends ActiveRecord {

    static protected function model() {

        return [
           'owner_id' => null, 'ip' => null, 'country_id' => null, 'region_id' => null, 'city_id' => null
        ];

    }

    /**
     * Поиск по владельцу
     * @param $id
     * @return null | CUserGeo
     */
    static public function findByOwnerId($id) {
        return self::findOne("owner_id = :oid", [':oid' => $id]);
    }

    static protected function dbTable() {
        return 'user_geo';
    }
}

?>
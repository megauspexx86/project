<?php

namespace SDK\Objects;


use Vendor\Core\ActiveRecordExtended;

class CManagerType extends ActiveRecordExtended {


    static protected function model() {

        return [
           'type_id' => null, 'status' => "ENABLED", 'phone_required' => 'YES'
        ];

    }

    /**
     * @param $id
     * @return CManagerType
     */
    static public function findByTypeId($id) {
        return self::findOne("type_id = :id", [':id' => $id]);
    }

    static protected function dbTable() {
        return 'manager_type';
    }
}

?>
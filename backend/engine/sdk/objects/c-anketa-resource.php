<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CAnketaResource extends ActiveRecord {


    const PASPORT = 1;
    const DIPLOM = 2;
    const SVID = 3;
    const CHILD = 4;

    static protected function model() {

        return [
           'owner_id' => '', 'file_name' => '', 'original_name' => '', 'create_day' => '', 'type' => '', 'status' => ''
        ];

    }

    static protected function dbTable() {
        return 'anketa_resource';
    }

    protected function saveInsert() {

        $this->create_day = (new \DateTime())->format('Y-m-d H:i:s');

        return parent::saveInsert();
    }
}

?>
<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CResponse extends ActiveRecord {


    static protected function model() {

        return [
           'create_date' => null, 'content' => null
        ];

    }

    protected function saveInsert() {

        $this->create_date = (new \DateTime())->format('Y-m-d H:i:s');

        parent::saveInsert();
    }

    static protected function dbTable() {
        return 'response';
    }



}

?>
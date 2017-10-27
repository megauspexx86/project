<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CUserGroupRating extends ActiveRecord {


    static protected function model() {

        return [
            'group_owner_id' => '', 'create_date' => ''
        ];

    }

    protected function saveInsert() {
        $this->create_date = (new \DateTime())->format('Y-m-d H:i:s');
        parent::saveInsert();
    }


    static protected function dbTable() {
        return 'user_group_rating';
    }

}

?>
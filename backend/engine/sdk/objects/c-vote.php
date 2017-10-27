<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CVote extends ActiveRecord {

    const DELAYED = 0;
    const IN_TIME = 1;
    const AHEAD_OF_TIME = 2;

    static protected function model() {

        return [
           'from_user' => null, 'to_user' => null, 'order_id' => null, 'author_response' => null, 'work_quality' => null, 'time_quality' => null, 'create_date' => null, 'has_deleted' => '', 'author_answer' => '', 'is_auto' => 'USER'
        ];

    }

    public function view($fields = []) {

        if(in_array('author_response_trim', $fields)) {
            $this->extend('author_response_trim', trim($this->author_response));
        }

        return parent::view($fields);
    }

    protected function saveInsert() {
        $this->create_date = (new \DateTime())->format('Y-m-d H:i:s');
        parent::saveInsert();
    }

    static protected function dbTable() {
        return 'vote';
    }



}

?>
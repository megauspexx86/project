<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;
use Vendor\Lib\Validator\CRuleNotEmpty;

class COrderArbitrageComment extends ActiveRecord {

    static protected function model() {

        return [
           'appeal_id' => null, 'create_date' => null, 'owner_id' => null, 'comment_text' => '', 'complete_percent' => ''
        ];

    }

    static public function rules() {
        return [
            'comment' => [new CRuleNotEmpty('comment')]
        ];
    }

    protected function saveInsert() {
        $this->create_date = (new \DateTime())->format('Y-m-d H:i:s');
        parent::saveInsert();
    }

    static protected function dbTable() {
        return 'order_arbitrage_comment';
    }



}

?>
<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CUserReferer extends ActiveRecord {


    static protected function model() {

        return [
           'create_date' => null, 'user_id' => null, 'host' => null, 'uri' => null, 'utm_source' => null, 'utm_medium' => null, 'utm_content' => null, 'utm_campaign' => ''
        ];

    }

    protected function saveInsert() {
        $this->create_date = (new \DateTime())->format('Y-m-d H:i:s');

        if($this->uri) {
            $h = parse_url($this->uri);
            $this->host = isset($h['host']) ? $h['host'] : "";
        }
        parent::saveInsert();
    }


    static protected function dbTable() {
        return 'user_referrer';
    }



}

?>
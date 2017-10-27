<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CSmsMessageLog extends ActiveRecord {

    static protected function model() {

        return [
           'user_id' => null, 'phones' => null, 'text' => null, 'date' => null, 'status' => null, 'sender' => null
        ];

    }

    static protected function dbTable() {
        return 'sms_message_log';
    }
}

?>
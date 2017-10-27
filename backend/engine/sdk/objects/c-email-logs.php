<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecordExtended;

class CEmailLogs extends ActiveRecordExtended {


    static protected function model() {

        return [
           'subject' => null, 'template' => null, 'user_id' => null, 'create_date' => null, 'update_date' => null, 'result' => null, 'error' => null
        ];

    }


    static protected function dbTable() {
        return 'email_logs';
    }

}

?>
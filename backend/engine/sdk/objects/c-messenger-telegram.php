<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;
use Vendor\Core\ActiveRecordExtended;

class CMessengerTelegram extends ActiveRecordExtended {

    static protected function model() {

        return [
            'token' => null, 'owner_id' => null, 'messenger_id' => null
        ];

    }

    static protected function dbTable() {
        return 'messenger_telegram';
    }
}

?>
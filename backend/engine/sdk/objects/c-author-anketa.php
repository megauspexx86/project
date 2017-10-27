<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CAuthorAnketa extends ActiveRecord {

    static protected function model() {

        return [
           'user_id' => null, 'surname' => null, 'first_name' => null, 'father_name' => null, 'burn_date' => null, 'family_status' => null, 'family' => null, 'kval' => null,
           'spec' => null, 'degree' => null, 'rank' => null, 'skype' => null,
        ];

    }

    static protected function dbTable() {
        return 'author_anketa';
    }

}

?>
<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecordExtended;

class CManagerSalary extends ActiveRecordExtended  {


    static protected function model() {

        return [
           'order_id' => null, 'action' => null, 'action_sum' => null, 'salary_sum' => null
        ];

    }

    static protected function dbTable() {
        return 'manager_salary';
    }

}

?>
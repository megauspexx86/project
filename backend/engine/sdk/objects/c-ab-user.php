<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecordExtended;

class CAbUser extends ActiveRecordExtended  {


    static protected function model() {

        return [
           'owner_id' => null, 'test_id' => null, 'variant' => null
        ];

    }

    /**
     * Поиск теста по ID пользователя и ID теста
     * @param $user_id
     * @param $test_id
     */
    static public function findByUserIdAndTestId($user_id, $test_id){
        return self::findOne('owner_id = :id AND test_id = :test', [':id' => $user_id, ':test' => $test_id]);
    }

    static protected function dbTable() {
        return 'ab_user';
    }



}

?>
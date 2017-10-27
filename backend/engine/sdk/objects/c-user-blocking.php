<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CUserBlocking extends ActiveRecord {

    const TIME_BLOCKED = 1;
    const UNBLOCKED = 2;
    const BLOCKED_FULL = 3;

    static protected function model() {

        return [
           'user_id' => null, 'date_block_from' => null, 'date_block_to' => null, 'action' => null, 'can_money_out' => null, 'penalty_val' => null, 'blocking_reason' => null, 'comment' => '', 'is_active' => '', 'penalty' => '', 'operator' => '', 'can_money_in' => ''
        ];

    }


    /**
     * Получение последней блокировки
     * @param $user_id
     * @return bool
     */
    public function getLastBlocking($user_id) {

        $extra = array('orderby' => 'id DESC');
        $blockings = CUserBlocking::find('user_id = :user_id', array('user_id' => $user_id), $extra);
        if ($blockings->getCount() > 0) {
            return $blockings->get(0);
        } else {
            return false;
        }
    }


    static protected function dbTable() {
        return 'user_blocking';
    }



}

?>
<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CUserGroup extends ActiveRecord {


    static protected function model() {

        return [
           'name' => null, 'group_owner_id' => '', 'user_id' => '', 'bonus_order_id' => null, 'invite_user_id' => '', 'create_date' => ''
        ];

    }

    /**
     * @param $user_id
     * @return ActiveRecord
     */
    static public function findByUserId($user_id) {
        $extra = [
            'fields' => [
                'users.name' => 'owner_name',
            ],
            'join' => [
                'LEFT JOIN users ON users.id = user_group.group_owner_id',
            ]
        ];

        return self::findOne('user_id = :user_id', [':user_id' => $user_id], $extra);
    }

    /**
     * Получение id пользователей группы по владельцу
     * @param $owner_id
     * @return array
     */
    static public function findByOwner($owner_id) {

        $list = self::find('group_owner_id = :owner_id', [':owner_id' => $owner_id]);

        return $list->user_id;
    }

    protected function saveInsert() {
        $this->create_date = (new \DateTime())->format('Y-m-d H:i:s');
        parent::saveInsert();
    }


    static protected function dbTable() {
        return 'user_group';
    }

}

?>
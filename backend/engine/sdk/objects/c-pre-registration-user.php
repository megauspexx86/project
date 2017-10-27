<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CPreRegistrationUser extends ActiveRecord {

    static public function model() {
        return [
            'create_date' => null, 'name' => null, 'email' => null, 'user_id' => 0
        ];
    }
	
	protected function saveInsert() {
		$this->create_date = (new \DateTime())->format("Y-m-d H:i:s");
		parent::saveInsert();
	}

    /**
     * @param $email
     * @return CPreRegistrationUser
     * @throws \Vendor\Core\ExCommon
     */
	static public function findByEmail($email) {

        $list = self::find("email = :eml", [':eml' => $email], ['limit' => 1, 'offset' => 0]);

        if($list->getCount()) {
            return $list->get(0);
        }

        return null;
	}

	static protected function dbTable() {
		return 'pre_registration_user';
	}
}

?>
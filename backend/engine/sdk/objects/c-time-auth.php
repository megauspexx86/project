<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CTimeAuth extends ActiveRecord {

    static protected function model() {
        return [
            'token' => null, 'series' => null, 'user_id' => null, 'expire_date' => null
        ];
    }

	static public function findByToken($token) {

        $list = self::find('token = :token', [':token' => $token]);

		if ($list->getCount() == 1) {
			return $list->get(0);
		}
		return false;
	}

    static public function dbTable() {
		return 'time_auth';
	}

}


?>
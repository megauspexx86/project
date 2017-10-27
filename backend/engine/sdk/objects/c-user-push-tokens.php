<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CUserPushTokens extends ActiveRecord {

	static protected function model() {
		return [
			'create_date' => null, 'user_id' => null, 'token' => null
		];
	}

	static public function findByToken($token, $extra = []) {

		return self::findOne("token = :token", array(':token' => $token), $extra);
	}

	static public function findByUserId($user_id, $extra = []) {

		return self::find("user_id = :user_id", array(':user_id' => $user_id), $extra);
	}

	static protected function dbTable() {
		return 'user_push_tokens';
	}
}

?>
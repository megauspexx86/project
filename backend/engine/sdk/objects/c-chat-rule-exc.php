<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CChatRuleExc extends ActiveRecord {

	static protected function model() {
		return [
			'rule_id' => null, 'exc' => null
		];

	}

	static public function dbTable() {
		return 'chat_rule_exc';
	}
}
?>
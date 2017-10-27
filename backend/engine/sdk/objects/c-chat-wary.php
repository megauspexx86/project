<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CChatWary extends ActiveRecord {


	static protected function model() {

		return [
			'user_id' => null, 'message_id' => null, 'status' => null,  'rule_id' => null,
			'recipient_id' => null, 'order_id' => null, 'date' => null
		];

	}


	/**
	 * Получает объем последней выборки (выборка должна содержать конструкцию SQL_CALC_FOUND_ROWS)
	 *
	 * @return int
	 */
	static public function totalRowsCount() {
		return parent::countRows();
	}

	static public function findCountForBlock($user_id, $blocking_rules_ids, $wary_date) {
		$params = [':user_id' => $user_id, ':status' => 'new', ':blocking_rules_ids' => $blocking_rules_ids, ':wary_date' => $wary_date];
		return self::count("user_id = :user_id and status = :status and rule_id in(:blocking_rules_ids) and date >= :wary_date", $params);
	}


	static public function findCountByRule($rule_id, $status){
		return self::count("rule_id = :rule_id and status = :status",[':rule_id' => $rule_id, ':status' => $status]);

	}

	public function view($fields = []) {
		return parent::view($fields);
	}

	static public function dbTable() {
		return 'chat_wary';
	}

}
/*class ChatWaryList extends ObjectList {

	public function getUserIds(){

		$user_id_list = array();
		foreach($this->list as $obj) {
			$user_id_list[] = $obj->user_id;
		}

		return $user_id_list;

	}
	public function getRecipientIds(){

		$rec_id_list = array();
		foreach($this->list as $obj) {
			$rec_id_list[] = $obj->recipient_id;
		}

		return $rec_id_list;

	}
	public function getMessageIds(){

		$message_id_list = array();
		foreach($this->list as $obj) {
			$message_id_list[] = $obj->message_id;
		}

		return $message_id_list;
	}
	public function getRuleIds(){

		$rule_id_list = array();
		foreach($this->list as $obj) {
			$rule_id_list[] = $obj->rule_id;
		}

		return $rule_id_list;

	}
}*/
?>
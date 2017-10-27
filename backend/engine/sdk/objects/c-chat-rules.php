<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;
use Vendor\Core\Db\DbFilter;

class CChatRules extends ActiveRecord {
	const TYPE_FIND_WORD = 'word';// ищем вхождение слова
	const TYPE_FIND_REPEATS = 'repeats';// ищем повторения символа

	const ACTION_MODER = 'moder';
	const ACTION_HIDE = 'hide';
	const ACTION_BLOCK = 'block';

	static protected function model() {

		return [
			'status' => null, 'rule' => null, 'type' => null,  'full_word' => null,
			'repeat_count' => null, 'precision_percent' => null, 'blocking' => null, 'priority' => null, 'action' => 'moder'
		];

	}

	static public function findByIds($ids) {
		return self::find("id  in(:ids)", [':ids' => $ids]);
	}
	/**
	 * find by priority
	 *
	 * @param int $id
	 * @throws ExObjectNotFound
	 * @return CChatRules
	 */
	static public function findByPriority($priority) {
		return parent::findOne("priority = ?", [':priority' => $priority], []);
	}
	/**
	 * Получает объем последней выборки (выборка должна содержать конструкцию SQL_CALC_FOUND_ROWS)
	 *
	 * @return int
	 */
	/*static public function totalRows() {
		$result = DbBridge::getInstance()->query("SELECT FOUND_ROWS() as total_rows;")->fetchHash();
		return $result['total_rows'];
	}*/

	static public function countAll() {
		return self::count("status = :status", ['accept']);
	}

	static public function getLastPriority() {
		$result = DbFilter::getInstance()->query("SELECT max(priority) as mm from chat_rules")->fetchHash();
		return $result['mm'];
	}

	public function view($fields = []) {


		$this->extend('count_accept', CChatWary::findCountByRule($this->id,'accept'));
		$this->extend('count_disline', CChatWary::findCountByRule($this->id,'disline'));

		if($this->precision_percent >=  MyApplication::getInstance()->getConfig()->getKey('block_percent', 'filter_chat')){
			$this->extend('can_block', CChatWary::findCountByRule($this->id,'disline'));
		}
		return parent::view($fields);
	}

	/*public function toDomDocument(DOMElement $root) {

		$root->appendChild(new DOMElement("count_accept"))->appendChild(new DOMText($count_accept = CChatWary::findCountByRule($this->id,'accept')));
		$root->appendChild(new DOMElement("count_disline"))->appendChild(new DOMText($count_disline = CChatWary::findCountByRule($this->id,'disline')));

		if($this->getPrecisionPercent() >=  MyApplication::getInstance()->getConfig()->getKey('block_percent', 'filter_chat')){
			$root->appendChild(new DOMElement("can_block"))->appendChild(new DOMText('1'));

		}
		return parent::toDomDocument($root);
	}*/


	static public function dbTable() {
		return 'chat_rules';
	}

}
?>
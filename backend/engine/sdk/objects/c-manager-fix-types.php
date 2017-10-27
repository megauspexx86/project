<?php
namespace SDK\Objects;

use Vendor\Core\ActiveRecordExtended;
use Vendor\Core\Db\DbBridge;
use Vendor\Core\Db\DbCriteria;


class CManagerFixTypes extends ActiveRecordExtended {

	static protected function model() {

		return [
			'type_id' => null, 'manager_id' => null
		];

	}

	static public function findByTypeId($type_id) {
		return self::find("type_id = :type_id", [':type_id' => $type_id], ['groupby' => 'manager_id']);
	}


	//@todo code_review
	static public function findActiveByType($type_id) {
		$extra = [
			'join' => [
				'JOIN pers_managers ON pers_managers.id = manager_fix_types.manager_id'
			]
		];

		return self::find('type_id = :type_id and pers_managers.status = :m_status', [":type_id" => $type_id, ":m_status" => 1], $extra);
	}

	/*
	 * Получаем количество менеджеров закрепленных за типом с учетом неактивных
	 * @type_id
	 * @return int cnt
	 *
	 * */
	static public function findCountByType($type_id) {
		$extra = [
			'join' => [
				'JOIN pers_managers ON pers_managers.id = manager_fix_types.manager_id'
			]
		];
		return CManagerFixTypes::count('type_id = :type_id', [':type_id' => $type_id], $extra);
	}

	static public function findByTypeManager($type_id, $manager_id) {
		return self::findOne("type_id = :type_id and manager_id = :manager_id", [':type_id' => $type_id, ':manager_id' => $manager_id], __CLASS__);
	}

	public function view($fields = []) {
		$manager = CPersManagers::findById($this->manager_id);
		$this->extend('name', $manager->name);

		return parent::view($fields);
	}

	static protected function dbTable() {
		return 'manager_fix_types';
	}
}
?>
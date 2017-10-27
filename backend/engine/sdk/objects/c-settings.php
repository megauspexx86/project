<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;
use Vendor\Core\Error\Ex404;

class CSettings extends ActiveRecord {

	static protected function model() {

		return [
			'name' => null, 'value' => null
		];

	}

	/**
	 * Получение значения по имени свойства
	 * @param $name
	 * @return mixed|null
	 */
	static public function findValueByName($name){

		try{
			$setting = self::findOne("name = :name", [':name' => $name]);
			return $setting->value;
		} catch(Ex404 $e){
			return null;
		}
	}


	static public function getAllPaymentSystemsFee() {

		$names = array(
			'_A_IP_WITHDRAW_COMISSION_', '_A_IP_WITHDRAW_COMISSION_REAL', '_A_IP_WITHDRAW_COMISSION_CUSTOMER',

			'_A_BANK_CARD_WITHDRAW_COMISSION_', '_A_BANK_CARD_WITHDRAW_COMISSION_REAL', '_A_BANK_CARD_WITHDRAW_COMISSION_CUSTOMER',

			'_A_BANK_CARD_WITHDRAW_FIX_COMISSION_', '_A_BANK_CARD_WITHDRAW_FIX_COMISSION_REAL', '_A_BANK_CARD_WITHDRAW_FIX_COMISSION_CUSTOMER',

			'_A_YANDEX_WITHDRAW_COMISSION_', '_A_YANDEX_WITHDRAW_COMISSION_REAL', '_A_YANDEX_WITHDRAW_COMISSION_CUSTOMER',

			'_A_WEBMONEY_WITHDRAW_COMISSION_', '_A_WEBMONEY_WITHDRAW_COMISSION_REAL', '_A_WEBMONEY_WITHDRAW_COMISSION_CUSTOMER',

			'_A_QIWI_WITHDRAW_COMISSION_RUS', '_A_QIWI_WITHDRAW_COMISSION_REAL_RUS', '_A_QIWI_WITHDRAW_COMISSION_CUSTOMER_RUS',

			'_A_QIWI_WITHDRAW_COMISSION_OTHER', '_A_QIWI_WITHDRAW_COMISSION_REAL_OTHER', '_A_QIWI_WITHDRAW_COMISSION_CUSTOMER_OTHER'
		);

		$all_comissions = self::find('name IN (:names)', [':names' => $names], ['orderby' => 'id ASC']);

		$comissions = [];

		foreach ($all_comissions as $comission) {
			$comissions[$comission->name] = $comission->value;
		}

		return $comissions;
	}


	static protected function dbTable() {
		return 'settings';
	}
}
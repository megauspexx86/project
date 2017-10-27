<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class COrderCategory extends ActiveRecord {


	static protected function model() {

		return [
			'order_id' => null, 'category_id' => null
		];

	}


	static protected function dbTable() {
		return 'order_category';
	}

    /**
     * Получение объекта категории по order_id
     * @param $order_id
     * @return ActiveRecord
     */
    static public function findByOrderId($order_id) {
        return self::findOne('order_id = :order_id', [':order_id' => $order_id]);
    }

}

?>
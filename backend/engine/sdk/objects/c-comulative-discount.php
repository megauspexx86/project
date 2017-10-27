<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CComulativeDiscount extends ActiveRecord {
	
    const DISCOUNT_ACTIVE = 1;
    const DISCOUNT_DELETED = 0;

    const  DISCOUNT_ACTUAL = 'ACTUAL';
    const  DISCOUNT_NOT_ACTUAL = 'NOT_ACTUAL';

    static public function model() {
        return ['discount' => null, 'summ' => null, 'comment' => null, 'actual' => null, 'status' => CComulativeDiscount::DISCOUNT_ACTIVE, 'discount_type' => 'PERSONAL'];
    }

    /**
     * Получение доступных накопительных скидок по типу
     * @param $type
     * @return \Vendor\Core\ActiveRecordList
     */
    static public function findByType($type) {
        $extra = [
            'orderby' => 'discount asc, summ asc'
        ];

        return self::find('status = :status AND discount_type = :type AND actual = :actual', [':status' => self::DISCOUNT_ACTIVE, ':type' => $type, ':actual' => self::DISCOUNT_ACTUAL], $extra);
    }
	
	static protected function dbTable() {
		return 'comulative_discount';
	}
}


?>
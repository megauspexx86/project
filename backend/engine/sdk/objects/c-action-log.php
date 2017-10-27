<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecordExtended;

/**
 * Class CActionLog
 *
 * Общий лог действий пользователей над объектами
 *
 * @package SDK\Objects
 */
class CActionLog extends ActiveRecordExtended  {

    /**
     * Aсtion для скидки на третий заказ
     */
    const CUSTOMER_PROMO_THIRD = 'CUSTOMER_PROMO_THIRD';

    /**
     * Aсtion для скидки на второй заказ
     */
    const CUSTOMER_PROMO_SECOND = 'CUSTOMER_PROMO_SECOND';

    static protected function model() {

        return [
           'owner_id' => null, 'action' => null, 'object_id' => null
        ];

    }

    static protected function dbTable() {
        return 'action_log';
    }

    /**
     * Получение объекта по owner_id и object_id
     * @param $owner_id
     * @param $object_id
     * @return ActiveRecordExtended
     */
    static public function findByOwnerObject($owner_id, $object_id) {
        return CActionLog::findOne('owner_id = :owner_id AND object_id = :object_id', [':owner_id' => $owner_id, ':object_id' => $object_id]);
    }



}

?>
<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class COrderBetOwner extends ActiveRecord {




    static protected function model() {

        return [
            'owner_id' => '', 'author_id' => '', 'order_id' => '', 'bet' => '', 'status' => '', 'date' => null
        ];
    }

    static protected function dbTable() {
        return 'order_bet_owner';
    }

    protected function saveInsert() {

        $this->date = (new \DateTime())->getTimestamp();

        return parent::saveInsert();
    }

    /**
     * Поиск ставки по ID заказа и ID заказчика
     * @param $order_id
     * @param $author_id
     * @return COrderBet
     */
    static public function findByOrderOwnerAuthorId($order_id, $owner_id, $author_id) {

        $list = self::find("order_id = :order_id AND owner_id = :owner AND author_id = :author_id", [':owner' => $owner_id, ':order_id' => $order_id, ':author_id' => $author_id]);

        if($list->getCount() == 0) {
            return null;
        }

        return $list;
    }
}

?>
<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;
use Vendor\Lib\Validator\CRuleNotEmpty;
use Vendor\Lib\Validator\ExValidateFails;
use Vendor\Lib\Validator\FormValidator;

class COrderArbitrage extends ActiveRecord {

    const STATUS_NEW = 0; // Заявка открыта
    const STATUS_COMPLETE = 1; // Заявка закрыта
    const STATUS_DELETE = 2; // Заявка удалена
    const STATUS_CANCELED = 3; // Заказ отменен арбитражем

    static protected function model() {

        return [
           'order_id' => '', 'create_date' => null, 'finish_date' => null, 'owner_id' => null, 'status' => 0, 'complete_percent' => '', 'has_penalty' => null, 'has_rating_down' => '', 'admin_comment' => '', 'resolve_percent' => '', 'not_satisfied' => '', 'order_type_name' => ''
        ];

    }

    static public function rules() {
        return [
            'complete_percent' => [new CRuleNotEmpty('complete_percent')],
            'order_id' => [new CRuleNotEmpty('order_id')]
        ];
    }


    static public function getActiveBid($order_id) {
        $extra = [

            'fields' => [
                'u.role' => 'owner_role'
            ],

            'join' => [
                'LEFT JOIN users AS u ON (u.id=order_arbitrage.owner_id)'
            ]
        ];
        return self::findOne('order_id = :oid AND status IN (:status_active, :status_complete, :status_cancelled)', [':oid' => $order_id, ':status_active' => self::STATUS_NEW, ':status_complete' => self::STATUS_COMPLETE, ':status_cancelled' => self::STATUS_CANCELED], $extra);
    }

    /**
     * Инициализация объекта COrderArbitrage из хэша.
     * Сделано для синхронизации старого объекта COrderArbitrage(старого кабинета) в случае, если объект создаётся в рамках транзакции БД
     * @param $hash
     */
    public function initialize($hash) {
        $this->initFromHash($hash);
        return $this;
    }


    protected function saveInsert() {
        $this->create_date = (new \DateTime())->format('Y-m-d H:i:s');
        parent::saveInsert();
    }

    static protected function dbTable() {
        return 'order_arbitrage';
    }



}

?>
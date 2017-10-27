<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;
use Vendor\Lib\Validator\CRuleNotEmpty;
use Vendor\Lib\Validator\CRuleNumberFormat;
use Vendor\Lib\Validator\CRuleObjectExists;

class COrderBet extends ActiveRecord {

    const RESTRICTION_NOT = "NOT"; // Нет ограничений по количеству удалений
    const RESTRICTION_WARNING = "WARNING"; // Было одно удаление
    const RESTRICTION_BLOCK = "BLOCK"; // Запрещено ставить новую ставку

    const DELETED = 'DELETED';

    static protected function model() {

        return [
            'order_id' => null, 'author_id' => null, 'summ' => null, 'comment' => '', 'bet_date' => '', 'is_new' => null,
            'fee' => null, 'discount_sum' => 0, 'mail_send' => 1, 'terms' => null, 'author_level' => 0, 'prepayment' => 0,
            'status' => "ACTIVE", 'restriction' => 'NOT', 'create_date' => null, 'first_summ' => null, 'analytics_fee_percent' => null
        ];
    }

    static public function rules() {
        return [
            'order_id' => [new CRuleNotEmpty('order_id'), new CRuleObjectExists('order_id', 'SDK\Objects\COrder', 'id = :id')],
            'author_id' => [new CRuleNotEmpty('author_id'), new CRuleObjectExists('author_id', 'SDK\Objects\CUser', 'id = :id')],
            'summ' => [new CRuleNotEmpty('summ'), new CRuleNumberFormat('summ', true)],
            'terms' => [new CRuleNumberFormat('terms', true)],
        ];
    }

    public function view($fields = array()) {

        if (in_array('customer_sum', $fields)) {
            $this->__extension['customer_sum'] = $this->customerSum();
        }

        return parent::view($fields);
    }

    public function save() {
        $this->summ = ceil(floatval($this->summ) / 10) * 10;
        $this->bet_date = (new \DateTime())->format("Y-m-d H:i:s");
        return parent::save();
    }

    public function __set($name, $value) {

        if($name == 'prepayment') {
            $value = intval($value);
        }

        return parent::__set($name, $value);
    }

    protected function saveInsert() {

        $this->create_date = (new \DateTime())->format("Y-m-d H:i:s");
        $this->first_summ = $this->summ;
        $this->is_new = 1;

        return parent::saveInsert();
    }

    public function delete() {

        $this->status = "DELETED";

        $order = COrder::findById($this->order_id);

        if($order->selected_author == $this->author_id && in_array($order->status, [COrder::STATUS_AUTHOR_SELECTED, COrder::STATUS_PREPAYMENT, COrder::STATUS_PREPAYMENT_FULL])) {
            $this->restriction = $this->restrictionStatus();
        }

        $this->save();
    }

    /**
     * Получает сумму для заказчика
     */
    public function customerSum() {
        return $this->summ + $this->fee;
    }

    /**
     * Получает статус ограничения, в зависимости от текущего статуса
     */
    protected function restrictionStatus() {

        if($this->restriction == self::RESTRICTION_NOT) {
            return self::RESTRICTION_WARNING;
        }

        return self::RESTRICTION_BLOCK;
    }

    /**
     * Поиск ставки по ID заказа и ID автора
     * @param $order_id
     * @param $author_id
     * @return COrderBet
     */
    static public function findByOrderAuthorId($order_id, $author_id) {

        $list = self::find("order_id = :order_id AND author_id = :author", [':author' => $author_id, ':order_id' => $order_id], ['limit' => 1]);

        if($list->getCount() == 0) {
            return null;
        }

        return $list->get(0);
    }

    static protected function dbTable() {
        return 'order_bet';
    }
}

?>
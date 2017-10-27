<?php

namespace SDK\Services;
use Vendor\Core\ActiveRecordList;
use Vendor\Core\Db\DbBridge;
use Vendor\Core\Db\DbCriteria;
use Vendor\Core\Error\Ex403;
use Vendor\Core\Error\Ex404;
use Vendor\Core\Locale;
use Vendor\Core\ProjectConfig;
use Vendor\Core\Request;
use SDK\Objects\CChatMessage;
use SDK\Objects\COrder;
use SDK\Objects\COrderBet;
use SDK\Objects\COrderBetOwner;
use SDK\Objects\CUser;


/**
 *
 * Реализация функций для автора
 *
 * Class ServiceAuthor
 * @package SDK\Services
 */
class ServiceAuthor {

    /**
     * @var $id автора
     */
    protected $id;

    public function __construct($id) {
        $this->id = $id;
    }

    /**
     *
     * Получает заказы автора
     *
     * @param int $limit
     * @param int $offset
     * @param mixed $status
     * @return ActiveRecordList
     */
    public function orders($limit, $offset, $status = false) {

        $extra = [

            'fields' => [
                'listelements.name' => 'typename',
                's.subject_name' => 'subject_name',
                'u.avatar' => 'avatar',
                'order_bet.summ' => 'bet_sum'
            ],

            'join' => [
                'JOIN listelements ON listelements.id = orders.type',
                'JOIN subject AS s ON s.id = orders.subject',
                'JOIN users AS u ON u.id = orders.owner_id',
                'LEFT JOIN order_bet ON order_bet.order_id = orders.id'
            ],

            'orderby' => 'FIELD(orders.status, :status_sort), id DESC',

            'count' => true,
            'limit' => abs($limit),
            'offset' => abs($offset)

        ];

        $criteria = [
            'orders.deleted = :deleted_status', 'order_bet.author_id = :user_id',
            'order_bet.status = :offer_status',
            '(selected_author IN(:valid_user_ids) OR ISNULL(selected_author))'
        ];


        $sql_params = [
            ':deleted_status' => 0, ':user_id' => $this->id,
            ':offer_status' => "ACTIVE", ':valid_user_ids' => [0, $this->id],
            ':status_sort' => [COrder::STATUS_PREPAYMENT_FULL, COrder::STATUS_PREPAYMENT, COrder::STATUS_AUTHOR_SELECTED,
                COrder::STATUS_NEW, COrder::STATUS_CUSTOMER_REFUSED, COrder::STATUS_AUTHOR_REFUSED, COrder::STATUS_AUTHOR_NOT_SELECTED, COrder::STATUS_NOT_PAYD,
                COrder::STATUS_WAIT_MONEY, COrder::STATUS_NOT_COMPLETED, COrder::STATUS_MAKING_WORK, COrder::STATUS_COMPLETE_WAITAGREE, COrder::STATUS_ORDER_FINISH,
                COrder::STATUS_ORDER_COMPLETED, COrder::STATUS_ORDER_COMPLETED_ARBITRAGE, COrder::STATUS_ORDER_CANCELED_ARBITRAGE]
        ];

        if(in_array($status, ['chosen', 'my_bets', 'waiting_payment', 'expired', 'inprogress', 'approval', 'support', 'cancelled', 'arbitrage_cancelled'])) {

            $statuses = [
                "chosen" => [COrder::STATUS_AUTHOR_SELECTED, COrder::STATUS_PREPAYMENT, COrder::STATUS_PREPAYMENT_FULL],
                "my_bets" => [COrder::STATUS_NEW, COrder::STATUS_AUTHOR_REFUSED, COrder::STATUS_AUTHOR_NOT_SELECTED, COrder::STATUS_CUSTOMER_REFUSED],
                "waiting_payment" => [COrder::STATUS_WAIT_MONEY, COrder::STATUS_NOT_PAYD],
                "expired" => [COrder::STATUS_NOT_COMPLETED],
                "inprogress" => [COrder::STATUS_MAKING_WORK],
                "approval" => [COrder::STATUS_COMPLETE_WAITAGREE],
                "support" => [COrder::STATUS_ORDER_FINISH],
                "cancelled" => [COrder::STATUS_ORDER_COMPLETED],
                "arbitrage_cancelled" => [COrder::STATUS_ORDER_COMPLETED_ARBITRAGE, COrder::STATUS_ORDER_CANCELED_ARBITRAGE]
            ];

            $criteria[] = "orders.status IN(:filterstatus)";
            $sql_params[':filterstatus'] = $statuses[$status];
        }

        return COrder::find(join(' AND ', $criteria), $sql_params, $extra);
    }

    /**
     * Отдает заказы, которые можно оценить
     * @param $limit
     * @param $offset
     * @return ActiveRecordList
     */
    public function newOrders($limit, $offset) {

        $extra = [

            'fields' => [
                'listelements.name' => 'typename',
                'order_bet.summ' => 'my_bet',
                's.subject_name' => 'subject_name'
            ],

            'join' => [
                'JOIN listelements ON listelements.id = orders.type',
                'JOIN subject AS s ON s.id = orders.subject',
                'LEFT JOIN order_bet ON order_bet.order_id = orders.id AND order_bet.author_id = :author AND order_bet.status = :bet_status'
            ],

            'orderby' => 'orders.id DESC',

            'count' => true,
            'limit' => $limit,
            'offset' => $offset
        ];

        $criteria = ["orders.step = :step AND orders.deleted IN(:deleted) AND orders.status IN(:statuses)"];

        $sql_params = [
            ':step' => COrder::STEP_SELECT_AUTHOR,
            ':deleted' => [COrder::DELETED_NOT],
            ':statuses' => [COrder::STATUS_NEW, COrder::STATUS_CUSTOMER_REFUSED, COrder::STATUS_AUTHOR_REFUSED],
            ':author' => $this->id, ':bet_status' => "ACTIVE"
        ];

        return COrder::find(join(' AND ', $criteria), $sql_params, $extra);
    }

    /**
     * Делает ставку на заказ
     * @todo Здесь мы выставляем всегда статус ACTIVE, в текущей production версии логика статусов сложнее
     * @param int $order_id
     * @param int $sum
     * @param int $terms
     * @param int $prepayment
     * @param String $comment
     * @return COrderBet
     * @throws Ex403
     * @throws Ex404
     * @throws ExValidateFails
     */
    public function offer($order_id, $sum, $terms, $prepayment = 0, $comment = '') {

        $order = COrder::findById($order_id);

        if(is_null($order)) {
            throw new Ex404();
        }

        if(!$order->canOffer()) {
            throw new Ex403();
        }

        $author = CUser::findById($this->id);

        $c = new ServiceCommission($order, $sum);

        $hash = [
            'summ' => $sum, 'terms' => $terms, 'prepayment' => intval($prepayment), 'comment' => $comment,
            'author_id' => $this->id, 'order_id' => $order_id, 'status' => 'ACTIVE', 'author_level' => $author->author_level,
            'fee' => $c->getFee(), 'discount_sum' => $c->getDiscountSum()
        ];

        COrderBet::validate($hash);

        $offer = COrderBet::findByOrderAuthorId($order->id, $this->id);
        if(is_null($offer)) {
            $offer = new COrderBet();
        }

        $offer->loadFromHash($hash);
        $offer->save();

        $this->recountOffers($order);

        $service_chat = new ServiceChat($order->owner_id, $order->id);
        $service_chat->changeMessageType(CChatMessage::TYPE_NEW_BET_AUTHOR, CChatMessage::TYPE_MESSAGE);


        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');
        // Сообщения в чат
        // для автора
        $author_message = vsprintf($locale['CHAT_BET'], [$offer->summ, $offer->terms, intval($offer->prepayment) ? '50' : '100']);
        $messages[] = (new ServiceChat($this->id, $order->id))->send($author_message, $order->owner_id, CChatMessage::TYPE_MESSAGE, $this->id);

        // для заказчика
        $customer_message = vsprintf($locale['CHAT_BET'], [$offer->summ + $offer->fee, $offer->terms, intval($offer->prepayment) ? '50' : '100']);
        $messages[] = (new ServiceChat($this->id, $order->id))->send($customer_message, $order->owner_id, CChatMessage::TYPE_NEW_BET_AUTHOR, $order->owner_id);

        $admin_message = vsprintf($locale['CHAT_BET_ADMIN'], []);
        $messages[] = (new ServiceChat($this->id, $order->id))->send($admin_message, $order->owner_id, CChatMessage::TYPE_SYSTEM_MESSAGE, $order->owner_id);

        (new ServiceOnline())->sendMessages($messages);

        return $offer;
    }

    /**
     *
     * Делает перерасчет активных ставок для заказа
     *
     * @param COrder $order
     */
    public function recountOffers(COrder $order) {
        $order->bets_count = COrderBet::count('order_id = :oid AND status = :status', [':oid' => $order->id, ':status' => 'ACTIVE']);
        $order->save();
    }

    /**
     * Принятие автором ставки заказчика(торг)
     * @param $order_id
     * @return \Vendor\Core\ActiveRecord
     * @throws Ex404
     */
    public function acceptOwnerBet($order_id) {

        $order = COrder::findById($order_id);

        if(is_null($order)) {
            throw new Ex404();
        }

        $offer = COrderBet::findByOrderAuthorId($order->id, $this->id);

        if(is_null($offer)) {
            throw new Ex404();
        }

        $offer_owner = COrderBetOwner::findOne('order_id = :oid AND author_id = :author_id AND status = :status', [':oid' => $order->id, 'author_id' => $this->id, ':status' => 0]);

        $discount = ($offer->customerSum() - $offer_owner->bet) / $offer->customerSum();
        $new_bet = $offer->summ - $offer->summ * $discount;

        $c = new ServiceCommission($order, $new_bet);
        $offer->fee = $c->getFee();
        $offer->summ = $new_bet;
        $offer->save();

        $offer_owner->status = 2;
        $offer_owner->save();

        $service_chat = new ServiceChat($this->id, $order->id);
        $service_chat->changeMessageType(CChatMessage::TYPE_NEW_BET_OWNER, CChatMessage::TYPE_BET_OWNER_YES);


        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');

        //для автора
        $author_message = vsprintf($locale['BARGAIN_ACCEPT'], [$offer->summ]);
        $messages[] = (new ServiceChat($this->id, $order->id))->send($author_message, $order->owner_id, CChatMessage::TYPE_MESSAGE, $this->id);

        // для заказчика
        $customer_message = vsprintf($locale['BARGAIN_ACCEPT'], [$offer->customerSum()]);
        $messages[] = (new ServiceChat($this->id, $order->id))->send($customer_message, $order->owner_id, CChatMessage::TYPE_MESSAGE, $order->owner_id);

        (new ServiceOnline())->sendMessages($messages);

        return $offer_owner;
    }


    public function declineOwnerBet($order_id) {

        $offer_owner = COrderBetOwner::findOne('order_id = :oid AND author_id = :author_id AND status = :status', [':oid' => $order_id, 'author_id' => $this->id, ':status' => 0]);

        if(is_null($offer_owner)) {
            throw new Ex404();
        }

        $offer_owner->status = 1;
        $offer_owner->save();

        $service_chat = new ServiceChat($this->id, $order_id);
        $service_chat->changeMessageType(CChatMessage::TYPE_BET_ACTION, CChatMessage::TYPE_BET_OWNER_NO);

        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');

        $author_message = vsprintf($locale['BARGAIN_DECLINE'], []);
        $message = (new ServiceChat($this->id, $order_id))->send($author_message, $offer_owner->owner_id, CChatMessage::TYPE_BET_OWNER_NO);

        (new ServiceOnline())->chat($message);

        return $offer_owner;
    }

    /**
     * Подтверждение заказа
     * @param $order_id
     * @return \Vendor\Core\ActiveRecord
     * @throws Ex403
     * @throws Ex404
     */
    public function confirmOrder($order_id) {

        $order = COrder::findById($order_id);

        if(is_null($order)) {
            throw new Ex404();
        }

        $available_status = array(COrder::STATUS_AUTHOR_SELECTED, COrder::STATUS_PREPAYMENT, COrder::STATUS_PREPAYMENT_FULL);

        if (!in_array($order->status, $available_status)) {
            throw new Ex403;
        }

        $order->status = $order->status == COrder::STATUS_AUTHOR_SELECTED ? COrder::STATUS_WAIT_MONEY : COrder::STATUS_MAKING_WORK;
        $order->save();

        return $order;

    }


    /**
     * Отправляет заказ на согласование с логгированием в чат
     * @param $order_id
     * @return \Vendor\Core\ActiveRecord
     * @throws Ex403
     * @throws Ex404
     */
    public function approveOrder($order_id) {

        $service_order_resource = new ServiceOrderResource();

        $files = $service_order_resource->saveFiles($order_id, Request::getQueryVar('files'));

        $order = COrder::findById($order_id);

        if(is_null($order)) {
            throw new Ex404();
        }

        if ($order->status != COrder::STATUS_MAKING_WORK) {
            throw new Ex403();
        }
        //ссылка на файл в чат
        $messages[] = (new ServiceChat($this->id, $order->id))->send('', $order->owner_id, 0, 0, 0, $files);


        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');

        // для заказчика
        $customer_message = vsprintf($locale['APPROVE_ORDER'], []);

        $messages[] = (new ServiceChat($this->id, $order->id))->send($customer_message, $order->owner_id, CChatMessage::TYPE_MATCHING_ORDER);

        if(is_null($order->was_complete_waitagree)) {
            $admin_message = vsprintf($locale['APPROVE_ORDER_ADMIN'], [$order->end_day, $order->end_day]);
            $messages[] = (new ServiceChat($this->id, $order->id))->send($admin_message, $order->owner_id, CChatMessage::TYPE_SYSTEM_MESSAGE, $order->owner_id);
        }

        $order->status = COrder::STATUS_COMPLETE_WAITAGREE;
        $order->save();

        (new ServiceOnline())->sendMessages($messages);

        return $order;
    }

    /**
     * Получает список ставок для заказа
     * @param $order_id
     * @return ActiveRecordList
     */
    public function offers($order_id) {

        $extra = [
            'fields' => [
                'users.name' => 'author_name',
                'users.rating_of_ten' => 'rating',
                'users.avatar' => 'avatar'
            ],

            'join' => [
                'JOIN users ON order_bet.author_id = users.id'
            ]
        ];

        return COrderBet::find("order_id = :oid AND status = :status", [':oid' => $order_id, ':status' => "ACTIVE"], $extra);
    }

    /**
     * Получает данные заказа для просмотра
     *
     * @param int $id
     * @return COrder
     * @throws Ex403
     * @throws Ex404
     */
    public function order($id) {

        $extra = [

            'fields' => [
                'listelements.name' => 'typename',
                'subject.subject_name' => 'subject_name',
                'language.name' => 'language_name',
                'order_bet.summ' => 'my_bet'
            ],

            'join' => [
                'JOIN listelements ON listelements.id = orders.type',
                'JOIN subject ON subject.id = orders.subject',
                'JOIN language ON language.id = orders.language',
                'LEFT JOIN order_bet ON order_bet.order_id = orders.id AND order_bet.author_id = :author AND order_bet.status = :bet_status'
            ]
        ];

        $order = COrder::findOne("orders.id = :id", [':id' => $id, ':author' => intval($this->id), ':bet_status' => "ACTIVE"], $extra);

        if(is_null($order)) {
            throw new Ex404();
        }

        if(in_array($order->deleted, [COrder::DELETED_CUSTOMER, COrder::DELETED_ALL]) || ($order->selected_author && intval($order->selected_author) !== intval($this->id))) {
            throw new Ex403();
        }

        return $order;
    }

    /**
     * Считает колчество заказов автора группируя по статусам
     * @return array
     */
    public function cntByStatus() {

        $params = [':user_id' => $this->id, ':deleted' => [COrder::DELETED_AUTHOR, COrder::DELETED_NOT]];

        $criteria = new DbCriteria([
            'fields' => 'COUNT(id) AS cnt, status',
            'table' => 'orders',
            'where' => "orders.selected_author = :user_id AND orders.deleted IN(:deleted)",
            'groupby' => 'status'
        ]);

        $result = DbBridge::getInstance()->query($criteria->sql(), $params);
        $cnt = [];

        while($r = $result->fetchHash()) {
            $cnt[$r['status']] = $r['cnt'];
        }

        return $cnt;
    }

}
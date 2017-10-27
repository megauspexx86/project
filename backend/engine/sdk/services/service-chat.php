<?php

namespace SDK\Services;

use SDK\Objects\CUser;
use Vendor\Core\Db\DbBridge;
use Vendor\Core\Db\DbCriteria;
use Vendor\Core\Error\Ex403;
use SDK\Objects\CChatMessage;
use SDK\Objects\COrder;
use SDK\Objects\COrderBet;
use Vendor\Core\ProjectConfig;
use Vendor\Core\Session;

/**
 * Class ServiceChat
 * Предназначен для реализации логики чата
 * @package App\Services
 */
class ServiceChat {

    protected $user_id;
    protected $order;

    public function __construct($user_id, $order_id){
        $this->user_id = intval($user_id);
        $this->order = COrder::findById($order_id);
    }

    /**
     * Проверяет может ли пользователь читать сообщения заказа
     * @return bool
     */
    public function canReadMessages() {


        if($this->user_id === intval($this->order->owner_id) || ($this->user_id === intval($this->order->selected_author) && $this->user_id > 0)) {
            return true;
        }

        $offer = COrderBet::findByOrderAuthorId($this->order->id, $this->user_id);

        if($offer && $offer->status == "ACTIVE") {

            if(!in_array($this->order->status, [COrder::STATUS_NEW, COrder::STATUS_AUTHOR_REFUSED, COrder::STATUS_AUTHOR_NOT_SELECTED, COrder::STATUS_CUSTOMER_REFUSED])) {
                return false;
            }

            return true;
        }

        return false;
    }

    /**
     * Получает чат с собеседником $recipient
     * @param int $recipient
     * @return \Vendor\Core\ActiveRecordList
     * @throws Ex403
     *
     * @todo Проверять может ли получать сообщения от отправителя в рамках заказа
     */
    public function messages($recipient) {

        if(!$this->canReadMessages()) {
            throw new Ex403();
        }

        $extra = [
            'orderby' => 'chat.id ASC'
        ];

        $criteria = [
            "chat.order_id = :oid",
            "((owner_id =:owner AND author_id = :recipient) OR (owner_id =:recipient AND author_id = :owner))",
            "chat.only IN(:only)"
        ];

        $params = [':oid' => $this->order->id, ':owner' => $this->user_id, ':recipient' => $recipient, ':only' => [0, $this->user_id]];

        $messages = CChatMessage::find(join(" AND ", $criteria), $params, $extra);

        return $this->extendUserToMessages($messages, $recipient);
    }


    /**
     * Отправляет сообщение $text получателю $recipient
     * @param string $text
     * @param int $recipient
     * @param int $type
     * @param int $only
     * @param int $admin_id
     * @return CChatMessage
     * @throws Ex403
     */
    public function send($text, $recipient, $type = 0, $only = 0, $admin_id = 0, $files = null) {

        if(!$this->canReadMessages()) {
            throw new Ex403();
        }

        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');

        /**
         * @todo Какая-то очень жесткая логика надо решить как переделать
         */
        $file_message = '';
        if(!empty($files)) {
            $first_key = key($files);
            if(count($files) > 1) {
                foreach ($files as $key => $file) {
                    $separator = $key != $first_key ? ', ' : '';
                    $file_message .= $separator . vsprintf($locale['FILE_LINK'], [$file['id'], $file['original_name']]);
                }
                $file_message = vsprintf($locale['ADD_FILES'], [$file_message, $text]);
            } else {

                $file_message = vsprintf($locale['FILE_LINK'], [$files[$first_key]['id'], $files[$first_key]['original_name']]);
                $file_message = vsprintf($locale['ADD_FILE'], [$file_message, $text]);
            }

        }

            $message = new CChatMessage();
            $message->owner_id = $this->user_id;
            $message->author_id = $recipient;
            $message->text = $file_message ? $file_message : $text;
            $message->status = $this->order->status;
            $message->order_id = $this->order->id;
            $message->type = $type;
            $message->only = $only;
            $message->admin_id = $admin_id;

        if($files) {
            $message->resource_link = json_encode($files);
        }

        $message->save();
		if(!$admin_id) {
			$chat_filter_user = CUser::findById($this->user_id);
			if ((new ServiceChatFilter($chat_filter_user))->onMessageWarnCheck($message)) {
				/* в случае, если по условиям  фильтра чата сообщение заблокировано, показываем сообщение только отправителю.*/
				$message->only = $message->owner_id;
				$message->save();
			}
		}

        return $message;
    }

    /**
     * Получает объект непрочитанных сообщений
     * @param $user_id
     * @return \Vendor\Core\ActiveRecordList
     */
    public static function newMessages($user_id) {

        $extra = [

            'join' => [
                'LEFT JOIN orders ON chat.order_id = orders.id'
            ],

            'count' => true,
            'orderby' => 'chat.id ASC'
        ];

        $criteria = [
            "author_id = :user_id",
            "orders.id IS NOT NULL",
            "is_new = 0",
            "(only = :user_id OR only = 0)"
        ];

        $params = [':user_id' => $user_id];

        return CChatMessage::find(join(" AND ", $criteria), $params, $extra);
    }

    public static function newMessagesCount($user_id) {
        // количество заказов с новыми сообщениями
        $sql = "select count(distinct chat.order_id) as cc from chat
                    join order_bet as ob on ob.order_id = chat.order_id and  ob.status = ? and chat.author_id = ? and chat.is_new = ? and (chat.only = ? or chat.only = ?)
                    join orders as o on o.id = ob.order_id and o.deleted = ? and o.owner_id != ? and (isnull(o.selected_author)  or o.selected_author = ? or o.selected_author = ?)";
        $params = array('ACTIVE', $user_id, 0, 0, $user_id, 0, $user_id, 0, $user_id);
        $res = DbBridge::getInstance()->query($sql, $params)->fetchHash();
        return $res['cc'];
    }


    public function findMessagesByOrderId() {

        $extra = [
            'orderby' => 'id DESC'
        ];

        $criteria = [
            "order_id = :oid",
        ];

        $params = [':oid' => $this->order->id];

        return CChatMessage::find(join(" AND ", $criteria), $params, $extra);
    }

    public function findMessagesByOrderAuthorId($author_id) {

        $extra = [
            'orderby' => 'id DESC'
        ];

        $criteria = [
            "order_id = :oid",
            'owner_id = :owner_id'
        ];

        $params = [':oid' => $this->order->id, ':owner_id' => $author_id];

        return CChatMessage::find(join(" AND ", $criteria), $params, $extra);
    }

    public function readMessagesByOrderId() {
        $messages_list = $this->findMessagesByOrderId();
        $this->markAsRead($messages_list);
    }

    public function readMessagesByOrderAuthorId($author_id) {
        $messages_list = $this->findMessagesByOrderAuthorId($author_id);
        $this->markAsRead($messages_list);
    }

    public function changeMessageType($from, $to = CChatMessage::TYPE_MESSAGE, $only = 0) {

        $last_message = CChatMessage::findOne("order_id = :oid AND author_id = :user_id AND type = :type AND only = :only", [':oid' => $this->order->id, ':type' =>$from, ':user_id' => $this->user_id, ':only' => $only]);

        $this->changeType($last_message, $to);

    }

    /**
     * Изменение типа сообщения по владельцу сообщения
     */
    public function changeMessageTypeByMessageOwner($from, $to = CChatMessage::TYPE_MESSAGE, $owner_id, $only) {
        $last_message = CChatMessage::findOne("order_id = :oid AND author_id = :user_id AND type = :type AND only = :only AND owner_id = :owner_id", [':oid' => $this->order->id, ':type' =>$from, ':user_id' => $this->user_id, ':only' => $only, ':owner_id' => $owner_id]);
        $this->changeType($last_message, $to);
    }

    /**
     * Изменение типа сообщения
     * @param $last_message
     */
    protected function changeType($last_message, $to) {
        if(!empty($last_message)) {
            $last_message->type = $to;
            $last_message->save();
        }
    }

    public function cntByOrder() {

        $params = [':order_id' => $this->order->id, ':user_id' => $this->user_id, ':all' => '0'];

        $criteria = new DbCriteria([
            'fields' => 'COUNT(id) AS cnt',
            'table' => 'chat',
            'where' => "chat.order_id = :order_id AND chat.owner_id <> :user_id AND is_new = 0 AND (only = :all OR only = :user_id)",
        ]);

        $result = DbBridge::getInstance()->query($criteria->sql(), $params);

        $r = $result->fetchHash();

        return $r['cnt'];
    }

    protected function markAsRead($messages_list) {

        foreach ($messages_list as $object) {
            if(!(Session::getInstance()->current_admin)) {
                $object->is_new = 1;
                $object->save();
            }
        }
    }

    /**
     * Добавление к сообщениям параметров пользователя(отправителя или получателя)
     * @param $messages
     * @param $recipient_id
     * @return mixed
     */
    private function extendUserToMessages($messages, $recipient_id) {
        $user = CUser::findById($this->user_id);
        $recipient = CUser::findById($recipient_id);
        foreach ($messages as $message) {
            if($message->owner_id == $this->user_id) {
                $this->extendUser($message, $user);
            }
            if($message->owner_id == $recipient_id) {
                $this->extendUser($message, $recipient);
            }
        }
        return $messages;
    }

    /**
     * Добавление к сообщению параметров пользователя
     * @param $message
     * @param $user
     * @return mixed
     */
    private function extendUser($message, $user) {
        $message->extend('role', $user->role);
        $message->extend('avatar', $user->avatar);
        $message->extend('user_name', $user->name);
        $message->extend('owner_id', $user->id);
        return $message;
    }

}
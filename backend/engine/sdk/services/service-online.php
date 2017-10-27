<?php

namespace SDK\Services;
use SDK\Objects\COrderArbitrage;
use SDK\Objects\COrderArbitrageComment;
use Vendor\Core\Error\Ex400;
use Vendor\Core\Error\Ex403;
use Vendor\Core\Error\Ex404;
use Vendor\Core\ProjectConfig;
use SDK\Objects\CChatMessage;
use SDK\Objects\COrder;
use SDK\Objects\COrderBet;
use SDK\Objects\CUser;
use SDK\Services\ServiceChat;

/**
 * Class ServiceOnline
 * Отпрвляет запросы на online.napishem
 * @package App\Services
 */
class ServiceOnline {

    public function __construct() {}

    /**
     * Новое сообщение в чат
     *
     *
     * @todo Нужно переделать реализацию получения only  $only = CUser::findById($message->only) - избыточное создание объекта из БД
     *
     *
     * @param CChatMessage $message
     */
    public function chat(CChatMessage $message) {

        $sender = CUser::findById($message->owner_id);
        $recipient = CUser::findById($message->author_id);
		
        if($message->only) {
            $only = CUser::findById($message->only);
        }

        $m  = array_merge($message->view(['admin_id', 'order_id', 'create_day', 'text', 'type', 'resource_link', 'only', 'status', 'owner_id', 'is_new']), ['recipient_id' => $recipient->id], ['sender_id' => $sender->id], ['user_name' => $sender->name], ['role' => $sender->role], ['avatar' => $sender->avatar]);


        $this->_run('/chat', [
            'sender_token' => $sender->chatToken(),
            'recipient_token' => $recipient->chatToken(),
            'only_token' => isset($only) ? $only->chatToken() : null,
            'message' => $m
        ]);
    }

	//тип сообщения, количество заказов с непрочитанными сообщениями при просмотре страницы(себе)
	public function countOrderMessages($user_id, $order_id) {

        $user = CUser::findById($user_id);
        $count = ServiceChat::newMessagesCount($user_id);

       return $this->_run('/recount_orders', [
            'user_token' => $user->chatToken(),
			'cnt' => $count,
            'order_id' => $order_id
        ]);
    }

    /**
     * Метод оповещает владельца сообщения о его прочтении
     * @param $sender_id - кому необходимо сообщить, что сообщение получено
     * @param $order_id
     * @param $user_id - кто сообщает о прочтении сообщения
     * @return bool
     */
    public function markMessageAsViewed($sender_id, $order_id, $user_id) {

        $recipient = CUser::findById($sender_id);
        if(!$recipient) {
            return new Ex404();
        }

        return $this->_run('/mark_viewed', [
            'recipient_token' => $recipient->chatToken(),
            'order_id' => $order_id,
            'reader_id' => $user_id,
            'user_id' => $sender_id
        ]);
    }

    /**
     * @todo Необходимо удалить этот после изменения его вызова на markMessageAsViewed()
     * @param $user_id ид пользователя кому выводим "просмотренно"
     * @param $order_id ид заказа
     */
    public function onViewedOrderMessages($user_id, $order_id) {
        $user = CUser::findById($user_id);
        if(!$user){
            return false;
        }
        return $this->_run('/mark_viewed', [
            'user_token' => $user->chatToken(),
            'user_id' => $user->id,
            'order_id' => $order_id
        ]);
    }


    public function arbitrageComment(COrderArbitrageComment $comment, $recipient_id) {
        $order = COrderArbitrage::findById($comment->appeal_id)->view(['order_id']);
        $sender = CUser::findById($comment->owner_id);
        $recipient = CUser::findById($recipient_id);

        $this->_run('/arbitrage_comment', [
            'sender_token' => $sender->chatToken(),
            'recipient_token' => $recipient->chatToken(),
            'comment' => $comment->view(['id', 'appeal_id']),
            'order' => $order

        ]);
    }

    public function sendMessages($messages) {

        if(!is_array($messages)){
            throw new Ex403;
        }

        foreach ($messages as $message) {
            $this->chat($message);
        }

    }

    public function online($user_id) {
        $user = CUser::findById($user_id);
        if(!$user){
            return false;
        }
        return $this->_run('/online', [
            'token' => $user->chatToken(),
            'user_id' => $user_id
        ]);
    }

    /**
     * Новая ставка или изменения в существующей
     * @param COrderBet $offer
     */
    public function offer(COrderBet $offer) {

        $recipient = CUser::findById(COrder::findById($offer->order_id)->owner_id);

        $this->_run('/offer', [
            'recipient_token' => $recipient->chatToken(),
            'offer' => $offer->view(['order_id', 'author_id'])
        ]);
    }


    /**
     * Обновление чата отправителя(сделано для интеграции нового чата для автора)
     * @param $sender_id
     * @param $order_id
     * @param $recipient_id
     */
    public function updateChat($sender_id, $order_id, $recipient_id) {

        $sender = CUser::findById($sender_id);

        $this->_run('/update_chat', [
            'sender_token' => $sender->chatToken(),
            'order_id' => $order_id,
            'recipient_id' => $recipient_id
        ]);
    }

    /**
     * Проводит запрос
     * @param String $command
     * @param Array $params
     * @return bool
     */
    protected function _run($command, $params) {

        $url = ProjectConfig::getInstance()->getKey('settings', 'online_url');
        $request = curl_init();

        curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($request, CURLOPT_URL, sprintf('%s%s', $url, $command));
        curl_setopt($request, CURLOPT_POST, true);
        curl_setopt($request, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($request, CURLOPT_POSTFIELDS, http_build_query($params));
        $result = json_decode(curl_exec($request));
        curl_close($request);

        return $result;
    }

}
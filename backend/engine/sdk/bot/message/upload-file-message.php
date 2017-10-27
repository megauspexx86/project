<?php

namespace SDK\Bot\Message;

use SDK\Objects\COrder;
use SDK\Objects\COrderResource;

/**
 * Class UploadFileMessage
 *
 * Информационное сообщение - Автор загрузил файл в заказ
 *
 * @package SDK\Bot\Message
 */
class UploadFileMessage extends Message {

    /**
     *
     * Заказ к которому относится файл
     *
     * @var COrder
     */
    protected $__order;


    /**
     * UploadFileMessage constructor.
     * @param int $resource_id
     * @param int $recipient_id
     */
    public function __construct($recipient_id, $resource_id) {

        $file = COrderResource::findById($resource_id);

        $this->__order = COrder::findById($file->order_id);

        parent::__construct($recipient_id);

    }

    /**
     * @see Message
     */
    public function text() {
        return 'Автор загрузил в заказ файл. ' . $this->__autologin_link;
    }

    /**
     * @see Message
     */
    protected function __autologinURL() {
        return '/order/' . $this->__order->id . '/messages';
    }

}
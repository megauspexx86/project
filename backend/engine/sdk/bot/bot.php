<?php


namespace SDK\Bot;

use SDK\Bot\Message\UploadFileMessage;

/**
 *
 * Агрегатор контроллеров-ботов
 *
 * Class Bot
 */
class Bot {

    /**
     * Контроллер бота
     */
    protected $__controller;


    /**
     * ID получателя сообщения в системе Напишем
     * @var int
     */
    protected $__recipient_id;

    /**
     * Bot constructor.
     * @param int $id - ID пользователя для отправки уведомления
     */
    public function __construct($id) {
        $this->__recipient_id = $id;
        $this->__controller = new \SDK\Bot\Telegram\Bot($this->__recipient_id);
    }

    /**
     * Уведомление заказчика в случае загрузки файла автором
     *
     * @param int $resource_id
     */
    public function uploadFile($resource_id) {

        $data = new UploadFileMessage($this->__recipient_id, $resource_id);

        $this->__controller->uploadFile($data);
    }

}
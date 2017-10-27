<?php

namespace SDK\Bot\Telegram;


use GuzzleHttp\Client;
use SDK\Bot\Message\UploadFileMessage;
use SDK\Objects\CMessengerTelegram;
use Vendor\Core\ProjectConfig;

class Bot {

    /**
     *
     * id пользователя в системе
     *
     * @var int
     */
    protected $__recipient_id;

    /**
     *
     * Флаг подписан ли пользователь на рассылку в телеграм
     *
     * @var CMessengerTelegram
     */
    protected $__subscribe = null;

    public function __construct($id) {

        $this->__recipient_id = $id;

        $this->__subscribeInit();
    }

    public function uploadFile(UploadFileMessage $message){

        $data = [
            'text' => $message->text()
        ];

        $this->__send($data);
    }

    /**
     * Отправляет сообщение
     * @param $params
     */
    protected function __send($params) {

        if(!$this->__subscribe) {
            return null;
        }

        $data = array_merge([
            'chat_id' => $this->__subscribe->messenger_id
        ], $params);

        
        $client = new Client();
        $client->request('POST', sprintf('%s/%s/sendMessage', ProjectConfig::getInstance()->getKey('settings', 'telegram_api'), MESSENGER_TELERGAM_TOKEN), [
            'form_params' => $data
        ]);

    }

    /**
     *  Проверка подписан ли пользователь на бота телеграм
     */
    protected function __subscribeInit() {

        if($subscribe = CMessengerTelegram::findOne('owner_id = :uid', [':uid' => $this->__recipient_id])) {
            if($subscribe->messenger_id) {
                $this->__subscribe = $subscribe;
            }
        }
    }
}
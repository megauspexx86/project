<?php

namespace SDK\Bot\Message;

use Autologin\Services\ServiceAutologin;
use SDK\Objects\CUser;
use Vendor\Core\ProjectConfig;

abstract class Message {

    /**
     *
     * ID пользователя в системе Напишем
     *
     * @var int
     */
    protected $__recipient_id;

    /**
     *
     * Ссылка автологина
     *
     * @var string
     */
    protected $__autologin_link;

    /**
     * Message constructor.
     * @param int $recipient_id
     */
    public function __construct($recipient_id) {

        $this->__recipient_id = $recipient_id;

        $this->__autologinLink();
    }

    /**
     *
     * Текст сообщения
     *
     * @return string
     */
    abstract public function text();

    /**
     * ссылка для автологина пользователя
     * @return string
     */
    public function autologin() {
        return $this->__autologin_link;
    }

    /**
     * Ссылка для формирования ссылки автологина
     */
    protected function __autologinLink() {

        $code = ServiceAutologin::make(CUser::findById($this->__recipient_id), $this->__ttl(), $this->__cnt(), $this->__autologinURL());

        $this->__autologin_link = sprintf('%s/login/process/%s', $this->__autologinBaseURL(), $code);

    }

    /**
     * Получает ссылку на страницу логина с учетом WL
     * @return string
     */
    protected function __autologinBaseURL() {
        return ProjectConfig::getInstance()->getKey('settings', 'new_account_url');
    }

    /**
     * Время жизни ссылки автологина в секундах
     * @return int
     */
    protected function __ttl() {
        return 1296000;
    }

    /**
     * Количество допустимых активаций ссылки автологина
     * @return int
     */
    protected function __cnt() {
        return 5;
    }

    /**
     * Старница для ссылки автологина
     * @return string
     */
    protected function __autologinURL() {
        return '/';
    }

}
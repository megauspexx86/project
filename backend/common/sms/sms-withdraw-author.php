<?php

namespace SMS;

use SDK\Objects\CUser;
use Vendor\Core\Sms;

/**
 * Класс отправки смс при выводе денег
 * Class SmsWithdrawAuthor
 * @package SMS
 */
class SmsWithdrawAuthor extends Sms {

    protected $__code;

    public function __construct(CUser $user, $code) {
        parent::__construct($user);
        $this->__code = $code;
    }

    /**
     * Генерация текста сообщения
     */
    protected function __text() {

        $text = '__NAME__, ваш код подтверждения для вывода средств: ' . $this->__code;

        $this->__setText($text);
    }

    /**
     * Проверка на подписку отправки смс
     * @return bool
     */
    protected function _isSubscribe() {
        return true;
    }

}
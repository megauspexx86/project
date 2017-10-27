<?php

namespace SMS;

use SDK\Objects\CUser;
use Vendor\Core\Sms;

/**
 * Класс отправки смс при выводе денег
 * Class SmsWithdrawAuthor
 * @package SMS
 */
class SmsRemindPassword extends Sms {

    protected $__code;

    public function __construct(CUser $user, $code) {
        parent::__construct($user);
        $this->__code = $code;
    }

    /**
     * Генерация текста сообщения
     */
    protected function __text() {

        $text = 'Код подтверждения смены пароля на napishem.com ' . $this->__code . ', данный код актуален в течении 10 минут';

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
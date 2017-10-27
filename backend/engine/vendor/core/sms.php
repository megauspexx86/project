<?php

namespace Vendor\Core;

use SDK\Objects\CUser;
use SDK\Objects\CUserBlocking;
use Vendor\Lib\SmsGate;
use Vendor\Lib\Validator\ExValidateFails;

abstract class Sms {

    protected $__user;

    private $__params = [];

    public function __construct(CUser $user) {

        $this->__user = $user;
    }

    public function addParam($name, $value) {

        if($name == 'phones' || $name == 'text') {
            throw new ExCommon(403);
        }

        $this->__params[$name] = $value;
    }

    /**
     * Отправяляет СМС
     */
    public function send() {

        if($this->__canSend()) {

            $this->__setPhone();
            $this->__text();

            if($this->_isSubscribe()) {
                $sms = new SmsGate($this->__user->id, $this->__params);
                $sms->send();
            }
        }
    }

    /**
     * Проверка телефона на длину
     * @return bool
     */
    protected function __canSend() {

        $countries_phones = ProjectConfig::getInstance()->getKey('locale', 'countries_phones');

        $func_min = function($value) {
            return $value['min'];
        };

        $func_max = function($value) {
            return $value['max'];
        };

        $min = min(array_map($func_min, $countries_phones));
        $max = max(array_map($func_max, $countries_phones));

        if (preg_match('/^([0-9]){'.$min.','.$max.'}$/', $this->__user->phone)) {
            return true;
        }

        throw new ExValidateFails(['phone' => 'length']);
    }

    /**
     * Получение текста сообщения
     * @return mixed
     */
    abstract protected function __text();

    /**
     * Устанавливает текст сообщения
     * @param $text
     */
    protected function __setText($text) {
        $this->__params['text'] = str_replace('__NAME__', $this->__user->name, $text);
    }

    /**
     * Проверка на подписку отправки смс
     * @return bool
     */
    protected function _isSubscribe() {
        return $this->__user->subs_new_sms == '1' && $this->__user->bet_ability != CUserBlocking::BLOCKED_FULL;
    }

    /**
     * Устанавливает номер телефона на который будет произведена отправка сообщения
     */
    final private function __setPhone() {

        $prefix = substr($this->__user->phone, 0, 1) != '+' ? '+' : '';

        $this->__params['phones'] = $prefix . $this->__user->phone;
    }

}
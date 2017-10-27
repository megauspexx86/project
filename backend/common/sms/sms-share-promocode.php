<?php

namespace SMS;


use Vendor\Core\ProjectConfig;
use Vendor\Lib\Sms\SmsCenter;
use Vendor\Lib\Validator\ExValidateFails;

/**
 * Класс для отправки смс-приглашения в Напишем с промокодом
 * Class SmsSharePromocode
 * @package SMS
 */
class SmsSharePromocode {

    /**
     * Провайдер отправки смс
     * @var SmsCenter
     */
    protected $provider;

    /**
     * Параметры, необходимые для отправки
     * @var
     */
    protected $__params;

    /**
     * Промокод
     * @var
     */
    protected $__code;

    /**
     * Номер телефона, на который будет отправляться смс
     * @var mixed
     */
    protected $phone;

    /**
     * SmsSharePromocode constructor.
     * @param $phone
     * @param $code
     */
    public function __construct($phone, $code) {
        $this->provider = new SmsCenter();
        $this->__code = $code;
        $this->phone = str_replace(array("_", "-", "+", " ", "(", ")"), "", $phone);
        $this->__setPhone();
        $this->__text();
    }

    /**
     * Отправка смс
     */
    public function send() {

        if($this->__canSend() && ProjectConfig::getInstance()->getKey('sms', 'enable')) {
            $this->provider->send($this->__params);
        }
        return $this->__params['phones'];
    }

    /**
     * Генерация текста сообщения
     */
    protected function __text() {

        $text = 'Ваш друг дарит Вам промокод ' . $this->__code . ' на скидку -7% для заказа учебных работ на сайте napishem.com. Укажите его при регистрации';

        $this->__params['text'] = $text;
    }

    /**
     * Проверка, можно ли отправлять
     * @return bool
     * @throws ExValidateFails
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

        if (preg_match('/^([0-9]){'.$min.','.$max.'}$/', $this->phone)) {
            return true;
        }

        throw new ExValidateFails(['phone' => 'length']);
    }

    /**
     * Установка номера телефона
     */
    private function __setPhone() {

        $prefix = substr($this->phone, 0, 1) != '+' ? '+' : '';

        $this->__params['phones'] = $prefix . $this->phone;
    }

}
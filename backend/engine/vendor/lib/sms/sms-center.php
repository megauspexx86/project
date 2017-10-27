<?php

namespace Vendor\Lib\Sms;

use Vendor\Core\ProjectConfig;

/**
 * Класс для отправки смс через API SMS-центра
 * Class SmsCenter
 * @package Vendor\Lib\Providers
 */
class SmsCenter {

    // константы для fmt
    const SERVICE_RESPONSE_FORMAT_XML = 2;
    const SERVICE_RESPONSE_FORMAT_JSON = 3;

    // константы для cost
    const SERVICE_RESPONSE_COST_NORMAL = 0;                        //обычная отправка
    const SERVICE_RESPONSE_COST_PRICE_ONLY = 1;                    //получить стоимость рассылки без реальной отправки.
    const SERVICE_RESPONSE_COST_NORMAL_WITH_PRICE = 2;             //обычная отправка, но добавить в ответ стоимость выполненной рассылки.
    const SERVICE_RESPONSE_COST_NORMAL_WITH_PRICE_AND_BALANCE = 3; //обычная отправка, но добавить в ответ стоимость и новый баланс Клиента.

    const TRANSLITE_DECODE_NONE = 0;     //не переводить.
    const TRANSLITE_DECODE_TRANSLIT = 1; //перевести в транслит в виде "translit".
    const TRANSLITE_DECODE_MPAHC = 2;    //перевести в транслит в виде "mpaHc/Ium"

    const SEND_OK = 0;      //Успешно.
    const SENDER_CURL_ERROR = 10; //Ошибка CURL

    //коды ошибок
    //1 - Ошибка в параметрах.
    //2 - Неверный логин или пароль.
    //3 - Недостаточно средств на счету Клиента.
    //4 - IP-адрес временно заблокирован из-за частых ошибок в запросах.
    //5 - Неверный формат даты.
    //6 - Сообщение запрещено (по тексту или по имени отправителя).
    //7 - Неверный формат номера телефона.
    //8 - Сообщение на указанный номер не может быть доставлено.
    //9 - Отправка более одного одинакового запроса на передачу SMS-сообщения либо более пяти одинаковых запросов на получение стоимости сообщения в течение минуты


    /**
     * Отправка запроса для отправки смс на API SMS-центра
     * @param $hash
     * @return int
     */
    public function send($hash) {

            $curl = curl_init();
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
            curl_setopt($curl, CURLOPT_TIMEOUT, 10);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($this->getParams($hash)));
            curl_setopt($curl, CURLOPT_URL, ProjectConfig::getInstance()->getKey('sms_config', 'send_url'));
            $result = json_decode(curl_exec($curl));
            curl_close($curl);

            if(!$result) {
                return self::SENDER_CURL_ERROR;
            }

            if(property_exists($result, 'error_code')) {
                return $result->error_code;
            }
            return self::SEND_OK;
    }

    /**
     * Получение параметров(POST)
     * @param $hash
     * @return array
     */
    private function getParams($hash) {

        $post = array();
        $post['login'] = ProjectConfig::getInstance()->getKey('sms_config', 'login');
        $post['psw'] = md5(ProjectConfig::getInstance()->getKey('sms_config', 'password'));
        $post['phones'] =  $hash['phones'];
        $post['mes'] = $hash['text'];
        $post['fmt'] = self::SERVICE_RESPONSE_FORMAT_JSON;
        $post['cost'] = self::SERVICE_RESPONSE_COST_NORMAL_WITH_PRICE_AND_BALANCE;
        $post['translit'] = self::TRANSLITE_DECODE_NONE;
        $post['charset'] = 'utf-8';

        return $post;
    }

}
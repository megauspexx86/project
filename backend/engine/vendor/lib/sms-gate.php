<?php

namespace Vendor\Lib;

use SDK\Objects\CSmsMessageLog;
use SDK\Objects\CUser;
use Vendor\Core\ProjectConfig;
use Vendor\Lib\Sms\SmsCenter;

/**
 * Класс для отправки смс
 * Class SmsGate
 * @package Vendor\Lib
 */
class SmsGate
{

    private $_provider;
    private $user_id;
    private $hash;

    /**
     * SmsGate constructor.
     * @param $user_id
     * @param $hash
     */
    public function __construct($user_id, $hash) {
        $this->hash = $hash;
        $this->user_id = $user_id;
        $this->_provider = new SmsCenter();
    }

    /**
     * Отправка смс
     */
    public function send() {

        $status = 0;

        if(ProjectConfig::getInstance()->getKey('sms', 'enable') && !$this->__isWLUser()) {
            $status = $this->_provider->send($this->hash);
        }

        $this->log($status);
    }


    /**
     * Проверка является ли пользователь пользователем WL
     * @return bool
     */
    protected function __isWLUser() {

        $user = CUser::findById($this->user_id);

        return intval($user->wl_id) > 0;
    }

    /**
     * Запись лога в БД
     * @param $status
     */
    private function log($status) {
        $sms_log = new CSmsMessageLog();
        $sms_log->user_id = $this->user_id;
        $sms_log->text = $this->hash['text'];
        $sms_log->phones = $this->hash['phones'];
        $sms_log->status = $status;
        $sms_log->date = (new \DateTime())->format('Y-m-d H:i:s');
        $sms_log->save();
    }
}
<?php

namespace SDK\Bot\Telegram\Command;
use SDK\Objects\CMessengerTelegram;

/**
 * Команда /start бота телеграм
 * Class Start
 * @package SDK\Bot\Telegram\Command
 */
class Start implements ICommand {

    /**
     * Token пользователя
     * @var string
     */
    protected $__token = null;

    /**
     * ID пользователя в системе телеграмм
     * @var int
     */
    protected $__messenger_id;

    public function __construct($text, $messenger_id) {

        list($command, $this->__token) = explode(' ', trim($text));

        $this->__messenger_id = $messenger_id;

    }

    /**
     * @see Command
     */
    public function exec() {

        if(!$this->__token) {
            return null;
        }

        if(!$registration = CMessengerTelegram::findOne('token = :t', [':t' => $this->__token])) {
            return null;
        }

        if(!$this->__messenger_id || $registration->messenger_id) {
            return null;
        }

        $registration->messenger_id = $this->__messenger_id;
        $registration->save();

        return true;
    }
}
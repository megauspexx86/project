<?php

namespace SDK\Bot\Telegram;

/**
 * Обработчик входящих команд телеграм-бота
 * Class Telegram
 * @package SDK\Bot\Telegram
 */
class Telegram {

    protected $__update;

    public function __construct($request) {
        $this->__update = new Update($request);
    }

    /**
     * Проводка обновления бота
     */
    public function process() {

        if($command = $this->__update->command()) {
            $command->exec();
        }
    }

}
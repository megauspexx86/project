<?php

namespace SDK\Bot\Telegram\Command;

/**
 * Команда /start бота телеграм
 * Class Start
 * @package SDK\Bot\Telegram\Command
 */
interface ICommand {

    /**
     * Выполнение команды телеграм
     * @return mixed
     */
    public function exec();

}
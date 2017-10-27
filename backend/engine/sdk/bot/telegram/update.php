<?php

namespace SDK\Bot\Telegram;

use SDK\Bot\Telegram\Command\Start;


/**
 * Входящее сообщение от бота
 * Class Update
 * @package SDK\Bot\Telegram
 */
class Update {

    /**
     * Update id
     * @var integer
     */
    protected $__id;

    /**
     * @var array
     */
    protected $__request;

    protected $__commands = [];

    /**
     * Update constructor.
     * @param $request
     */
    public function __construct($request) {

        $this->__request = $request;

        $this->__id = $this->__request['update_id'];

        $this->__initCommands();
    }

    /**
     * Получает тип обновления
     * @return string | null
     */
    public function type() {

        $types = ['message'];

        foreach ($types as $type) {
            if (isset($this->__request[$type])) {
                return $type;
            }
        }

        return null;
    }

    /**
     * Получает команду и параметры из обновления
     */
    public function command() {

        if($this->type() !== 'message') {
            return null;
        }

        foreach ($this->__commands as $command => $runner) {
            if(strpos($this->__request['message']['text'], $command) !== false) {
                return $runner($this->__request['message']['text']);
            }
        }

        return null;
    }

    /**
     * Инициализация доступных команд
     */
    protected function __initCommands() {

        $this->__commands['/start'] = function($text) {
            return new Start($text, $this->__request['message']['from']['id']);
        };
    }

}
<?php

namespace Vendor\Core;

class Session {

    protected static $instance;

    private function __construct() {
        if(!(session_status() === PHP_SESSION_ACTIVE)){
            session_start();
        }
    }

    static public function getInstance() {

        if(is_null(self::$instance)) {
            self::$instance = new Session();
        }

        return self::$instance;
    }

    /**
     * Получение значения сессии
     * @param $name
     * @return mixed
     */
    public function __get($name) {
        return isset($_SESSION[$name]) ? $_SESSION[$name] : null;
    }

    /**
     * Установка значения сессии
     * @param $name
     * @param $value
     */
    public function __set($name, $value) {
        $_SESSION[$name] = $value;
    }
}

?>
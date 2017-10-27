<?php

namespace Vendor\Core;

class Cookie {

    protected static $instance;

    protected $_settings = [
        'expire' => 2592000, //30  суток по умолчанию
        'path' => '/',
        'domain' => COOKIE_DOMAIN,
        'secure' => true,
        'httponly' => true
    ];

    private function __construct() {}

    static public function getInstance() {

        if(is_null(self::$instance)) {
            self::$instance = new Cookie();
        }

        return self::$instance;
    }

    /**
     * Устанавливает настройки откправки кук
     * @param $name
     * @param $value
     */
    public function settings($name, $value) {
        $this->_settings[$name] = $value;
    }

    /**
     * Получение значения cookies
     * @param $name
     * @return mixed
     */
    public function __get($name) {
        return isset($_COOKIE[$name]) ? $_COOKIE[$name] : null;
    }

    /**
     * Установка значения сессии
     * @param $name
     * @param $value
     */
    public function __set($name, $value) {
        setcookie($name, $value, time() + $this->_settings['expire'], $this->_settings['path'], $this->_settings['domain'], $this->_settings['secure'], $this->_settings['httponly']);
    }
}

?>
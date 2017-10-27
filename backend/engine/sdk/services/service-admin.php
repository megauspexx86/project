<?php

namespace SDK\Services;
use SDK\Objects\CAdmin;
use Vendor\Core\Error\Ex403;
use Vendor\Core\Session;

/**
 * Class ServiceAdmin
 * Управление текущей сессий администратора
 * @package SDK\Services
 */
class ServiceAdmin {

    /**
     * @var CAdmin
     */
    protected $__admin;

    public function __construct($id) {

        if(!$this->__admin = CAdmin::findById($id)) {
            throw new Ex403();
        }
    }

    /**
     * Авторизация администратора
     */
    public function login() {
        $this->__setSession($this->__admin);
    }

    /**
     * Удаление сессии админа
     */
    public function logout() {
        $this->__setSession(null);
    }

	/**
	 * Получаем текущего админа
	 * @return mixed|null
	 */
    static public function getCurrentAdmin(){
    	return Session::getInstance()->current_admin;
	}

    /**
     * Установка значения сессии
     * @param $value CAdmin|null
     */
    protected function __setSession($value) {
        Session::getInstance()->current_admin = $value;
    }

}
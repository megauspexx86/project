<?php

namespace Email\Objects;


use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use SDK\Objects\COrderProperty;
use SDK\Objects\CSubject;
use SDK\Objects\CUser;
use Vendor\Core\Email;

/**
 * Сущность для письма при регистрации партнёра
 * Class EmlPartnerRegister
 * @package Email\Objects
 */
class EmlAdminChangedPassword extends Email {

    public function __construct(CUser $user, $password) {
        parent::__construct($user);
        $this->addParam('password', $password);
        $this->addParam('email', $this->user->email);
    }

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'admin_changed_password.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return 'Смена пароля на сайте  ' . $this->site_name;
    }

}
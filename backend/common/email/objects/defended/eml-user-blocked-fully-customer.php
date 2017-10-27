<?php

namespace Email\Objects\Defended;
use SDK\Lib\DateTime;
use SDK\Objects\CUser;
use Vendor\Core\Email;


/**
 * Сущность для письма полная блокировка пользователя
 * Class EmlPartnerRegister
 * @package Email\Objects
 */
class EmlUserBlockedFullyCustomer extends Email {

    /**
     * EmlUserBlockTemporarily constructor.
     * @param CUser $user
     * @param $comment
     * @param $date
     */
    public function __construct(CUser $user, $comment) {

        parent::__construct($user);

        $this->addParam('comment', $comment);
    }

    /**
     * Отправляется всегда
     * @return bool
     */
    protected function __canSend() {
        return true;
    }

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'user_blocked_fully_customer.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return 'Ваш аккаунт заблокирован';
    }

}
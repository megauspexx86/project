<?php

namespace Email\Objects;


use SDK\Objects\CListElement;
use SDK\Objects\CUser;
use Vendor\Core\Email;
use Vendor\Core\ProjectConfig;

/**
 * Сущность для письма автору при удалении заказчиком заявки в арбитраж
 * Class EmlOrderCreate
 * @package Email\Objects
 */
class EmlArbitrageCustomerDelete extends Email {

    /**
     * EmlOrderCreate constructor.
     * @param CUser $user
     * @param $order
     */
    public function __construct(CUser $user, $order) {
        $this->order = $order;
        parent::__construct($user);
        $this->__autologin('order_link');
        $this->setParams();
    }

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'delete_arbitrage_customer.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return 'Спор по заказу №' .$this->order->id. ' урегулирован';
    }


    public function setParams() {

        $params = [
            'name' => $this->user->name,
            'order_id' => $this->order->id,
            'type_name' => CListElement::findById($this->order->type)->name,
        ];

        parent::addParams($params);
    }

    /**
     * Время жизни ссылки автологина
     * @return int
     */
    protected function __autologinTTL() {
        return 259200;
    }

    /**
     * Допустимое количество активаций автологина
     * @return int
     */
    protected function __autologinCnt() {
        return 100;
    }

    /**
     * Ссылка (полный адрес с протоколом) на которую будет вести автологин
     * @todo Как только в production будет запущена  версия нового ЛК для заказчика ссылку необходимо будет формировать с учетом Старого и Нового личного кабинета
     *
     * @return string
     */
    protected function __autologinURL() {
        return sprintf('%s/avtor/vypolnenie-zakazov/%d', ProjectConfig::getInstance()->getKey('settings', 'account_url'), $this->order->id);
    }

}
<?php

namespace Email\Objects\Defended;

use SDK\Objects\CUser;


/**
 * Сущность для письма заказчику при принятии заказа
 * Использование только через агрегатор EmlOrderAccept иное не корректно
 * Class EmlOrderCreate
 * @package Email\Objects
 */
class EmlOrderAcceptCustomer extends EmlOrderAcceptAuthor {

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'accept_order_customer.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return "Вами принят заказ {$this->params['type_name']} №{$this->order->id}";
    }

    public function setParams() {

        parent::setParams();

        $this->addParam('author', CUser::findById($this->order->selected_author)->view(['name']));
    }

    /**
     * Ссылка (полный адрес с протоколом) на которую будет вести автологин
     * @return string
     */
    protected function __autologinURL() {
        return sprintf('%s/order/%d/messages', $this->__autologinBaseURL(), $this->order->id);
    }

}
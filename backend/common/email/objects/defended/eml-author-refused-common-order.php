<?php

namespace Email\Objects\Defended;

use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\CUser;
use Vendor\Core\Email;

/**
 * Письмо об отказе автора от обычного заказа
 * Класс должен быть использован только в рамках класса Email\Objects\EmlAuthorRefused иное использование не корректно
 * Class EmlAuthorRefusedCommonOrder
 * @package Email\Objects\Defended
 */
class EmlAuthorRefusedCommonOrder extends Email {

    /**
     * EmlOrderCreate constructor.
     * @param CUser $user
     * @param COrder $order
     */
    public function __construct(CUser $user, COrder $order) {

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
        return 'author_refused.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return 'Прием ставок по заказу возобновлен';
    }


    public function setParams() {
        $params = [
            'type' => CListElement::findById($this->order->type)->name,
            'order_id' => $this->order->id,
            'author_id' => $this->order->selected_author,
            'author_name' => CUser::findById($this->order->selected_author)->name
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
        return 5;
    }

    /**
     * Ссылка (полный адрес с протоколом) на которую будет вести автологин
     * @return string
     */
    protected function __autologinURL() {
        return sprintf('%s/order/%d/choose_author', $this->__autologinBaseURL(), $this->order->id);
    }

}
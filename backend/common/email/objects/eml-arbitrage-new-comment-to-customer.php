<?php

namespace Email\Objects;


use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use SDK\Objects\COrderProperty;
use SDK\Objects\CSubject;
use SDK\Objects\CUser;
use Vendor\Core\Email;
use Vendor\Core\ProjectConfig;

/**
 * Сущность для письма заказчику при получении нового комментария по арбитражу от автора
 * Class EmlOrderCreate
 * @package Email\Objects
 */
class EmlArbitrageNewCommentToCustomer extends Email {

    /**
     * EmlOrderCreate constructor.
     * @param CUser $user
     * @param $order
     */
    public function __construct(CUser $user, $order) {
        $this->order = $order;
        parent::__construct($user);
    }

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'arbitrage_new_comment_to_customer.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return "Получен комментарий автора по спорному заказу {$this->params['type_name']} №{$this->order->id}";
    }


    public function setParams($comment, $percent) {
        $params = [
            'order_id' => $this->order->id,
            'type_name' => CListElement::findById($this->order->type)->name,
            'arbitrage_comment' => $comment,
            'arbitrage_percent' => $percent
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
        return sprintf('%s/order/%d/choose_author', $this->__autologinBaseURL(), $this->order->id);
    }

}
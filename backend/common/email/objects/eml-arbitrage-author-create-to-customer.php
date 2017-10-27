<?php

namespace Email\Objects;


use SDK\Objects\CListElement;
use SDK\Objects\COrderArbitrage;
use SDK\Objects\COrderArbitrageComment;
use SDK\Objects\CUser;
use Vendor\Core\Email;
use Vendor\Core\ProjectConfig;

/**
 * Сущность для письма автору при создании арбитража автором
 * Class EmlArbitrageAuthorCreateToAuthor
 * @package Email\Objects
 */
class EmlArbitrageAuthorCreateToCustomer extends Email {

    /**
     * @var
     */
    protected $order_arbitrage;

    /**
     * @var \Vendor\Core\ActiveRecord
     */
    protected  $author;

    /**
     * EmlOrderCreate constructor.
     * @param CUser $user
     * @param $order
     */
    public function __construct(CUser $user, $order, $order_arbitrage) {
        $this->order = $order;
        $this->order_arbitrage = $order_arbitrage;
        $this->author = CUser::findById($order_arbitrage->owner_id);
        parent::__construct($user);
        $this->__autologin('order_link');
        $this->setParams();
    }

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'create_arbitrage_by_author_to_customer.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return "Автор хочет отказаться от выполнения заказа {$this->params['type_name']} №{$this->order->id}";
    }


    public function setParams() {

        $params = [
            'order_id' => $this->order->id,
            'arbitrage_comment' => $this->__comment(),
            'arbitrage_percent' => $this->order_arbitrage->complete_percent,
            'author_name' => $this->author->name,
            'author_id' => $this->author->id,
            'type_name' => CListElement::findById($this->order->type)->name,
        ];

        parent::addParams($params);
    }

    /**
     * Получение комментария
     * @return mixed
     */
    protected function __comment() {
        $comment = COrderArbitrageComment::findOne('appeal_id = :appeal_id', [':appeal_id' => $this->order_arbitrage->id]);
        return $comment->comment_text;
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
        return 10;
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
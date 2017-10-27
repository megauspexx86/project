<?php

namespace Email\Objects;


use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use SDK\Objects\COrderArbitrage;
use SDK\Objects\COrderArbitrageComment;
use SDK\Objects\COrderProperty;
use SDK\Objects\CSubject;
use SDK\Objects\CUser;
use Vendor\Core\Email;
use Vendor\Core\ProjectConfig;

/**
 * Сущность для письма заказчику при создании им заявки в арбитраж
 * Class EmlOrderCreate
 * @package Email\Objects
 */
class EmlArbitrageCustomerCreate extends Email {

    /**
     * EmlOrderCreate constructor.
     * @param CUser $user
     * @param $order
     */
    public function __construct(CUser $user, $order) {
        $this->order = $order;
        parent::__construct($user);
        $this->__autologin('order_link');
    }

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'create_arbitrage_customer.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return 'Ваша заявка на отмену заказа №' .$this->order->id. ' принята';
    }


    public function setParams($order_arbitrage) {

        $m = ProjectConfig::getInstance()->getKey('locale', 'months');
        $finish_date = (new \DateTime($order_arbitrage->create_date))->modify('+3 days');
        $finish_date = $finish_date->format('d') . ' '. $m[(int)$finish_date->format('m')] . ' '. $finish_date->format('Y');
        $comment = COrderArbitrageComment::findOne('appeal_id = :appeal_id', [':appeal_id' => $order_arbitrage->id]);

        $params = [
            'order_id' => $this->order->id,
            'arbitrage_comment' => $comment->comment_text,
            'arbitrage_percent' => $order_arbitrage->complete_percent,
            'finish_date' => $finish_date
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
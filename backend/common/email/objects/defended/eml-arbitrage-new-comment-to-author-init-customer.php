<?php

namespace Email\Objects\Defended;


use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use SDK\Objects\COrderProperty;
use SDK\Objects\CSubject;
use SDK\Objects\CUser;
use Vendor\Core\Email;
use Vendor\Core\ProjectConfig;

/**
 * Сущность для письма заказчику при получении нового комментария по арбитражу от заказчика
 * Class EmlArbitrageNewCommentToAuthorInitCustomer
 * @package Email\Objects
 */
class EmlArbitrageNewCommentToAuthorInitCustomer extends Email {

    /**
     * EmlArbitrageNewCommentToAuthorInitCustomer constructor.
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
        return 'arbitrage_new_comment_to_author_init_customer.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return "Получен комментарий от Заказчика по спорному заказу №{$this->order->id}";
    }


    public function setParams($comment, $percent) {
        $params = [
            'order_id' => $this->order->id,
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
        return 1296000;
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
     * @todo Как только в production будет запущена  версия нового ЛК для заказчика ссылку необходимо будет формировать с учетом Старого и Нового личного кабинета
     *
     * @return string
     */
    protected function __autologinURL() {
        return sprintf('%s/avtor/zakaz/%d',$this->__autologinBaseURL(), $this->order->id);
    }

}
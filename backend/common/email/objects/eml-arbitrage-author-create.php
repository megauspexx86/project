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
 * Сущность для письма при создании заказа
 * Class EmlOrderCreate
 * @package Email\Objects
 */
class EmlArbitrageAuthorCreate extends Email {

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
        return 'create_arbitrage_author.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return 'Заказчик хочет отменить заказ №' .$this->order->id. ', где вы являетесь Автором';
    }


    public function setParams($comment, $percent) {
        $params = [
            'name' => $this->user->name,
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
        return sprintf('%s/avtor/zakaz/%d', ProjectConfig::getInstance()->getKey('settings', 'account_url'), $this->order->id);
    }

}
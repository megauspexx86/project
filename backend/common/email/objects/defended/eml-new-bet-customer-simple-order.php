<?php

namespace Email\Objects\Defended;
use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\CUser;
use Vendor\Core\Email;


/**
 * Класс для отправки письма о ставке заказчику по обыкновенному заказу
 * Class EmlNewBetCustomerSimpleOrder
 * @package Email\Objects
 */
class EmlNewBetCustomerSimpleOrder extends Email {

    protected $order;

    /**
     * EmlOrderCreate constructor.
     * @param CUser $user
     * @param $order
     */
    public function __construct(CUser $user, $order) {

        $this->order = $order;

        parent::__construct($user);

        $this->__autologin('bet_list_link');
        $this->setParams();
    }

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'new_bet_customer.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return "Ваш заказ {$this->params['type_title']} №{$this->order->id} оценен на сайте {$this->site_name}";
    }


    public function setParams() {
        $params = [
            'title' => $this->order->title,
            'type_title' => CListElement::findById($this->order->type)->name
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
     * @return string
     */
    protected function __autologinURL() {
        return sprintf('%s/order/%d/choose_author', $this->__autologinBaseURL(), $this->order->id);
    }

}
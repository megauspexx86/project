<?php

namespace Email\Objects\Defended;

use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\CUser;
use SDK\Services\ServiceOrderStatus;
use Vendor\Core\Email;

/**
 * Письмо информирующее заказчика, что работа переходит на гарантийную поддержку (при условии 100% оплаты)
 * Класс должен быть использован только в рамках класса Email\Objects\EmlOrderAutoWarranty иное использование не корректно
 * Class EmlOrderAutoWarranty100
 * @package Email\Objects\Defended
 */
class EmlOrderAutoWarranty100 extends Email {

    /**
     * EmlOrderAutoWarranty50 constructor.
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
        return 'order_auto_warranty_100.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return "Заказ {$this->params['type_name']} №{$this->order->id} переведен на гарантию";
    }


    public function setParams() {

        $params = [
            'type_name' => CListElement::findById($this->order->type)->name,
            'order' => $this->order->view(['title']),
            'expire_date' => (new \DateTime(sprintf("+%d hours", ServiceOrderStatus::ttl(COrder::STATUS_ORDER_FINISH))))->format('d.m.Y H:i')
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
        return sprintf('%s/order/%d/messages', $this->__autologinBaseURL(), $this->order->id);
    }

}
<?php

namespace Email\Objects\Defended;

use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\COrderArbitrage;
use SDK\Objects\CUser;
use Vendor\Core\Email;


/**
 * Письмо о принятии решения арбитражем
 * Письма автору и заказчику отличаются не значительно поэтому логика различий реализована в шаблоне письма
 * Class EmlOrderArbitrageResolved
 * @package Email\Objects\Defended
 */
class EmlOrderArbitrageResolved extends Email  {

    /**
     * @var COrderArbitrage
     */
    protected $__bid;

    /**
     * EmlOrderArbitrageResolved constructor.
     * @param CUser $user
     * @param COrder $order
     */
    public function __construct(CUser $user, COrder $order, COrderArbitrage $bid) {

        $this->order = $order;
        $this->__bid = $bid;

        parent::__construct($user);

        $this->setParams();
    }

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'arbitrage_resolved.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return "Решение по спорному заказу {$this->params['type_name']} №{$this->order->id} принято";
    }


    public function setParams() {

        $params = [
            'type_name' => CListElement::findById($this->order->type)->name,
            'order' => $this->order->view(['title', 'complete_percent']),
            'role' => $this->user->role,
            'bid' => $this->__bid->view(['admin_comment', 'has_penalty']),
            'payment_sum' => $this->__paymentSum(),
            'unfulfilled_percent' => 100 - $this->order->complete_percent
        ];

        parent::addParams($params);
    }

    /**
     * Расчет суммы, которая начисляется (возвращается) пользователю по итогам арбитража
     */
    protected function __paymentSum() {

        if($this->user->role == CUser::ROLE_CUSTOMER) {
            return $this->__customerPaymentSum();
        }

        return $this->__authorPaymentSum();

    }

    /**
     * Расчет суммы, которая возвращается заказчику по итогам арбитража
     */
    protected function __customerPaymentSum() {

        if($this->order->complete_percent == 100) {
            return 0;
        }

        return round(($this->order->cash) * (100 - $this->order->complete_percent) / 100);
    }

    /**
     * Расчет суммы начисления автору по итогам завершения арбитража
     * @return int
     */
    protected function __authorPaymentSum() {

        if($this->order->complete_percent == 0) {
            return 0;
        }

        return round(($this->order->cash - ($this->order->fee * ($this->order->cash / $this->order->budget))) * $this->order->complete_percent /100);
    }

    /**
     * Всегда отправляем это письмо
     * @return bool
     */
    protected function __canSend() {
        return true;
    }

}
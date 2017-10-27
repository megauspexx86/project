<?php

namespace Email\Objects;


use Email\Objects\Defended\EmlArbitrageNewCommentToAuthorInitAuthor;
use Email\Objects\Defended\EmlArbitrageNewCommentToAuthorInitCustomer;
use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use SDK\Objects\COrderArbitrage;
use SDK\Objects\COrderProperty;
use SDK\Objects\CSubject;
use SDK\Objects\CUser;
use Vendor\Core\Email;
use Vendor\Core\ProjectConfig;

/**
 * Сущность для письма заказчику при получении нового комментария по арбитражу от заказчика
 * Class EmlArbitrageNewCommentToAuthor
 * @package Email\Objects
 */
class EmlArbitrageNewCommentToAuthor extends EmlOrderAggregator {

    protected function __initProvider() {

        $order_arbitrage = COrderArbitrage::findOne('order_id = :order_id', [':order_id' => $this->__order->id]);

        if($order_arbitrage->owner_id == $this->__user->id) {
            return new EmlArbitrageNewCommentToAuthorInitAuthor($this->__user, $this->__order);
        }

        return new EmlArbitrageNewCommentToAuthorInitCustomer($this->__user, $this->__order);
    }

}
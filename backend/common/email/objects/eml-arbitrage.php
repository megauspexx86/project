<?php

namespace Email\Objects;

use Email\Objects\Defended\EmlOrderArbitrageCanceled;
use Email\Objects\Defended\EmlOrderArbitrageResolved;
use SDK\Objects\COrder;
use SDK\Objects\COrderArbitrage;
use SDK\Objects\CUser;

/**
 * Агрегатор писем от арбитража
 * Различает авторов и заказчиков заказа, а также логику завершения заказа арбитражем
 * Class EmlOrderAccept
 * @package Email\Objects
 */
class EmlArbitrage extends EmlOrderAggregator {

    /**
     * Заявка в арбитраж
     * @var COrderArbitrage
     */
    protected $__bid;

    /**
     * @param CUser $user
     * @param COrder $order
     */
    public function __construct(CUser $user, COrder $order, $bid_id) {

        $this->__bid = COrderArbitrage::findById($bid_id);

        parent::__construct($user, $order);
    }


    protected function __initProvider() {

        if($this->__order->status == COrder::STATUS_ORDER_CANCELED_ARBITRAGE) {
            return new EmlOrderArbitrageCanceled($this->__user, $this->__order, $this->__bid);
        }


        return new EmlOrderArbitrageResolved($this->__user, $this->__order, $this->__bid);
    }

}
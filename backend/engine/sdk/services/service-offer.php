<?php

namespace SDK\Services;


use SDK\Objects\COrder;
use SDK\Objects\COrderBet;
use SDK\Objects\CUser;

class ServiceOffer {

    protected $order;
    public function __construct($order_id){
        $this->order = COrder::findById($order_id);
    }

    public function process($hash, COrder $offer = null) {

        $commission = new ServiceCommission($this->order->id, $hash['summ']);

        $errors = COrderBet::validate($hash);

        if($errors !== true) {
            throw new ExBadRequest($errors);
        }

        if(is_null($offer)) {
            $offer = new COrderBet();
        }

        $offer->loadFromHash($hash);
        $offer->status = "ACTIVE";
        $offer->author_level = CUser::findById($hash['author_id'])->author_level;
        $offer->fee = $commission->getFee();
        $offer->discount_sum = $commission->getDiscountSum();
        $offer->save();

        $this->order->bets_count = COrderBet::count('order_id = :oid AND status = :status', [':oid' => $this->order->id, ':status' => 'ACTIVE']);
        $this->order->save();

        return $offer;
    }
}
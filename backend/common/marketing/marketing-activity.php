<?php

namespace Marketing;
use SDK\Objects\COrder;

/**
 * Класс-аггрегатор активностей по маркетингу
 * Class MarketingActivity
 * @package Marketing
 */
class MarketingActivity
{

    /**
     * Генерация скидки на второй или третий заказы
     * @param $order
     * @return bool
     */
    public function onNextOrderDiscount($order) {
        if($order->status == COrder::STATUS_MAKING_WORK) {
            $discount = new NextOrderDiscount($order);
            $discount->generate();
        }
        return false;
    }

}
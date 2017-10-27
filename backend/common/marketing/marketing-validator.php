<?php

namespace Marketing;

use SDK\Objects\CActionLog;
use SDK\Objects\CDiscount;
use SDK\Objects\COrder;
use SDK\Objects\CUser;
use Vendor\Core\ProjectConfig;
use Vendor\Lib\Validator\ExValidateFails;

class MarketingValidator
{
    protected $discount;

    protected $user;

    /**
     * MarketingValidator constructor.
     * @param CDiscount $discount
     * @param CUser $user
     * @param COrder $order
     */
    public function __construct(CDiscount $discount, CUser $user, COrder $order){
        $this->discount = $discount;
        $this->user = $user;
        $this->order = $order;
    }

    public function validate() {
        $this->__checkGameCodeOwner();
        $this->__checkNextDiscount();
    }

    /**
     * Проверка, доступна ли скидка пользователю при вводе игрового кода скидки
     */
    protected function __checkGameCodeOwner() {
        if(in_array($this->discount->code, ProjectConfig::getInstance()->getKey('marketing', 'game_discounts'))){
            $discount_winner = CActionLog::findOne('owner_id = :owner_id and action = :action and object_id = :object_id',[':owner_id' => $this->user->id, ':action' => 'CUSTOMER_GAME_RESULT', ':object_id' => $this->discount->id]);
            if(!$discount_winner){
                throw new ExValidateFails(['error' => 'invalid_game_discount_owner']);
            }
        }
    }


    /**
     * Проверка, может ли применить пользователь скидку на второй или третий заказ
     */
    protected function __checkNextDiscount() {
        $config = ProjectConfig::getInstance()->getKey('marketing', 'second_third_orders_discounts');

        if(in_array($this->discount->code, [$config['second_order_discount'], $config['third_order_discount']])) {

            $next_order_discount = CActionLog::findOne('owner_id = :owner_id AND object_id = :object_id',[':owner_id' => $this->user->id, ':object_id' => $this->discount->id]);

            if(!$next_order_discount) {
                throw new ExValidateFails(['error' => 'not_allowed']);
            }

            if($next_order_discount->create_date >= strtotime($this->order->create_day)) {
                throw new ExValidateFails(['error' => 'not_allowed']);
            }

            if((new \DateTime())->setTimestamp($next_order_discount->create_date)->modify('+30 days') < new \DateTime()) {
                throw new ExValidateFails(['error' => 'invalid_activate_period']);
            }

        }
    }
}
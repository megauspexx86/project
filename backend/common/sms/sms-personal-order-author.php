<?php

namespace SMS;

use SDK\Objects\COrder;
use SDK\Objects\CSettings;
use SDK\Objects\CUser;
use Vendor\Core\Sms;

class SmsPersonalOrderAuthor extends Sms {

    protected $__order;

    public function __construct(CUser $user, $order_id) {

        parent::__construct($user);

        $params = [

            'fields' => [
                't.name' => 'type_title'
            ],

            'join' => [
                'JOIN listelements AS t ON t.id = orders.type'
            ]
        ];

        $this->__order = COrder::findById($order_id, $params);
    }

    protected function __text() {

        $text = CSettings::findValueByName('author_pers_create_text');

        $text = str_replace('######', $this->__order->id, $text);
        $text = str_replace('__ORDER_TYPE_NAME__', $this->__order->type_title, $text);

        $this->__setText($text);
    }

}
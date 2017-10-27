<?php

namespace Email\Objects\Defended;
use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\CPersonalOrder;
use SDK\Objects\CUser;


/**
 * Письмо об отказе автора от группового персонального заказа без ставки исполнителю
 * Класс должен быть использован только в рамках класса Email\Objects\EmlAuthorRefused иное использование не корректно
 * Class EmlAuthorRefusedPersonalOrder

 * @package Email\Objects\Defended
 */
class EmlAuthorRefusedGroupPersonalOrderWithoutOffer extends EmlAuthorRefusedPersonalOrder {

    protected $__refuse_author_id;

    public function __construct(CUser $user, COrder $order, $refuse_author_id) {

        $this->__refuse_author_id = $refuse_author_id;

        parent::__construct($user, $order);
    }

    public function setParams() {


        $comment = CPersonalOrder::findOne('author_id = :uid AND order_id = :oid', [':uid' => $this->__refuse_author_id, ':oid' => $this->order->id]);

        $params = [
            'type' => CListElement::findById($this->order->type)->name,
            'order_id' => $this->order->id,
            'author_id' => $this->__refuse_author_id,
            'author_name' => CUser::findById($this->__refuse_author_id)->name,
            'comment' => $comment->comment
        ];


        parent::addParams($params);
    }

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'author_refused_group_personal_without_offer.tpl';
    }

}
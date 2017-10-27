<?php

namespace Email\Objects\Defended;

use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\CUser;
use Vendor\Core\Email;

/**
 * Письмо об отказе автора от персонального заказа (не группового) до момента когда автор сделал ставку
 * Класс должен быть использован только в рамках класса Email\Objects\EmlAuthorRefused иное использование не корректно
 * Class EmlAuthorRefusedPersonalOrderWithoutOffer

 * @package Email\Objects\Defended
 */
class EmlAuthorRefusedPersonalOrderWithoutOffer extends EmlAuthorRefusedPersonalOrder {


    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'author_refused_personal_without_offer.tpl';
    }

    public function setParams() {
        $params = [
            'type' => CListElement::findById($this->order->type)->name,
            'order_id' => $this->order->id,
            'author_id' => $this->order->personal_to_author,
            'author_name' => CUser::findById($this->order->personal_to_author)->name,
            'comment' => $this->order->refuse_comment
        ];

        parent::addParams($params);
    }


    /**
     * Ссылка (полный адрес с протоколом) на которую будет вести автологин
     * @return string
     */
    protected function __autologinURL() {
        return '/';
    }

}
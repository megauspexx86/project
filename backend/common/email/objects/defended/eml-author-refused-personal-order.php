<?php

namespace Email\Objects\Defended;

use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\CUser;
use Vendor\Core\Email;

/**
 * Письмо об отказе автора от персонального заказа (не группового)
 * Класс должен быть использован только в рамках класса Email\Objects\EmlAuthorRefused иное использование не корректно
 * Class EmlAuthorRefusedPersonalOrder

 * @package Email\Objects\Defended
 */
class EmlAuthorRefusedPersonalOrder extends EmlAuthorRefusedCommonOrder {


    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'author_refused_personal.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return "Автор отказался от выполнения заказа {$this->params['type']} №{$this->params['order_id']}";
    }

}
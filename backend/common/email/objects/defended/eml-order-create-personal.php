<?php

namespace Email\Objects\Defended;


use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use SDK\Objects\COrderProperty;
use SDK\Objects\CSubject;
use SDK\Objects\CUser;
use Vendor\Core\Email;

/**
 * Сущность для письма при создании персонального заказа (1 заказ - 1 автор)
 * Class EmlOrderCreatePersonal
 * @package Email\Objects
 */
class EmlOrderCreatePersonal extends EmlOrderCreateSimple {

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'create_order_personal.tpl';
    }

    public function setParams() {

        $this->addParam('author', CUser::findById($this->order->personal_to_author)->view(['name']));
        parent::setParams();
    }
}
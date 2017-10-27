<?php

namespace Email\Objects\Defended;


use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use SDK\Objects\COrderProperty;
use SDK\Objects\CSubject;
use SDK\Objects\CUser;
use Vendor\Core\Email;

/**
 * Сущность для письма при создании персонального заказа для группы авторов
 * Class EmlOrderCreatePersonal
 * @package Email\Objects
 */
class EmlOrderCreateGroupPersonal extends EmlOrderCreateSimple {

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'create_order_group_personal.tpl';
    }
}
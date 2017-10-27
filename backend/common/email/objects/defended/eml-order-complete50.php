<?php

namespace Email\Objects\Defended;

use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\CUser;
use Vendor\Core\Email;

/**
 * Письмо информирующее заказчика что работа выполнена (при условии 50% оплаты)
 * Класс должен быть использован только в рамках класса Email\Objects\EmlOrderComplete иное использование не корректно
 * Class EmlOrderComplete50
 * @package Email\Objects\Defended
 */
class EmlOrderComplete50 extends EmlOrderComplete100  {

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'order_complete_50.tpl';
    }

}
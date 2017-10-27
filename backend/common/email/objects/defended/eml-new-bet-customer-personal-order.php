<?php

namespace Email\Objects\Defended;

use SDK\Objects\CUser;


/**
 * Класс для отправки письма о ставке заказчику по обыкновенному заказу
 * Class EmlNewBetCustomerPersonalOrder
 * @package Email\Objects
 */
class EmlNewBetCustomerPersonalOrder extends EmlNewBetCustomerSimpleOrder {

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'new_bet_customer_personal_order.tpl';
    }

    /**
     * Дополнительные параметры письма
     */
    public function setParams() {

        parent::setParams();

        $this->addParam('author', CUser::findById($this->order->personal_to_author)->view(['name']));
    }

}
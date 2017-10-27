<?php

namespace Email\Objects\Defended;


/**
 * Класс для отправки письма о ставке заказчику по обыкновенному заказу
 * Class EmlNewBetCustomerPersonalGroupOrder
 * @package Email\Objects
 */
class EmlNewBetCustomerPersonalGroupOrder extends EmlNewBetCustomerSimpleOrder {

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'new_bet_customer_personal_group_order.tpl';
    }

}
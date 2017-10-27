<?php

namespace Email\Objects\Defended;

/**
 * Письмо информирующее заказчика, что работа переходит на гарантийную поддержку (при условии 50% оплаты)
 * Класс должен быть использован только в рамках класса Email\Objects\EmlOrderAutoWarranty иное использование не корректно
 * Class EmlOrderAutoWarranty50
 * @package Email\Objects\Defended
 */
class EmlOrderAutoWarranty50 extends EmlOrderAutoWarranty100 {

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'order_auto_warranty_50.tpl';
    }

}
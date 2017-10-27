<?php

namespace Email\Objects\Defended;


/**
 * Письмо об отказе автора от группового персонального заказа после того как был выбран исполнителем
 * Класс должен быть использован только в рамках класса Email\Objects\EmlAuthorRefused иное использование не корректно
 * Class EmlAuthorRefusedPersonalOrder

 * @package Email\Objects\Defended
 */
class EmlAuthorRefusedGroupPersonalOrder extends EmlAuthorRefusedPersonalOrder {

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'author_refused_group_personal.tpl';
    }

}
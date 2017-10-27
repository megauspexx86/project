<?php

namespace Email\Objects\Defended;


use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use SDK\Objects\COrderProperty;
use SDK\Objects\CSubject;
use SDK\Objects\CUser;
use Vendor\Core\Email;
use Vendor\Core\ProjectConfig;

/**
 * Сущность для письма заказчику при получении нового комментария по арбитражу от заказчика
 * Class EmlArbitrageNewCommentToAuthorInitCustomer
 * @package Email\Objects
 */
class EmlArbitrageNewCommentToAuthorInitAuthor extends EmlArbitrageNewCommentToAuthorInitCustomer {

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'arbitrage_new_comment_to_author_init_author.tpl';
    }

}
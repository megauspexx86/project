<?php

namespace Email\Objects\Defended;

use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\COrderProperty;
use SDK\Objects\CSubject;
use SDK\Objects\CUser;
use Vendor\Core\Email;
use Vendor\Core\ProjectConfig;

/**
 * Письмо заказчику о том, что автор не выбран (Были ставки)
 * Класс должен быть использован только в рамках класса Email\Objects\EmlAuthorNotSelected иное использование не корректно
 * Class EmlAuthorNotSelectedWithOffer
 * @package Email\Objects\Defended
 */
class EmlAuthorNotSelectedWithOffer extends EmlAuthorNotSelectedWithoutOffer {


    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'author_not_selected_with_offer.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return "Выберите автора для заказа {$this->params['type_name']} №{$this->order->id}";
    }

    /**
     * Ссылка (полный адрес с протоколом) на которую будет вести автологин
     * @return string
     */
    protected function __autologinURL() {
        return sprintf('%s/order/%d/choose_author?utm_source=e-mail&utm_medium=avtomaticheskie_pisma&utm_campaign=vyberite_avtora_est_stavki', $this->__autologinBaseURL(), $this->order->id);
    }

}
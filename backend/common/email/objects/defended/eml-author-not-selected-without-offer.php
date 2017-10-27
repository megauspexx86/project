<?php

namespace Email\Objects\Defended;

use SDK\Objects\CCategory;
use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\COrderCategory;
use SDK\Objects\COrderProperty;
use SDK\Objects\COrderTranslate;
use SDK\Objects\CSubject;
use SDK\Objects\CUser;
use Vendor\Core\Email;

/**
 * Письмо заказчику о том, что автор не выбран (Ставок не было)
 * Класс должен быть использован только в рамках класса Email\Objects\EmlAuthorNotSelected иное использование не корректно
 * Class EmlAuthorNotSelectedWithoutOffer
 * @package Email\Objects\Defended
 */
class EmlAuthorNotSelectedWithoutOffer extends Email {

    /**
     * EmlOrderCreate constructor.
     * @param CUser $user
     * @param COrder $order
     */
    public function __construct(CUser $user, COrder $order) {

        $this->order = $order;

        parent::__construct($user);

        $this->__autologin('order_link');
        $this->setParams();
    }

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'author_not_selected_without_offer.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return "Мы поможем найти автора для заказа {$this->params['type_name']} №{$this->order->id}";
    }


    /**
     * Получает язык перевода для типа заказа "Перевод"
     * @return mixed|null
     */
    protected function __languageTo() {
        $order_translate = COrderTranslate::findByOrderId($this->order->id);
        if($order_translate) {
            return CLanguage::findById($order_translate->language)->name;
        }
        return null;
    }

    /**
     * Получает категорию заказа для типа заказа "Работа с текстами"
     * @return mixed|null
     */
    protected function __category() {
        $order_translate = COrderCategory::findByOrderId($this->order->id);
        if($order_translate) {
            return CCategory::findById($order_translate->category_id)->name;
        }
        return null;
    }

    public function setParams() {

        $params = [
            'type_name' => CListElement::findById($this->order->type)->name,
            'order' => $this->order->view(['title', 'work_class', 'volume_to', 'volume_from', 'task']),
            'subject_name' => $this->order->subject ? CSubject::findById($this->order->subject)->subject_name : '',
            'language' => CLanguage::findById($this->order->language)->name,
            'properties' => COrderProperty::find("order_id = :order_id", [':order_id' => $this->order->id])->view(['property_code', 'property_value']),
            'language_to' => $this->__languageTo(),
            'category' => $this->__category()
        ];

        parent::addParams($params);
    }

    /**
     * Время жизни ссылки автологина
     * @return int
     */
    protected function __autologinTTL() {
        return 259200;
    }

    /**
     * Допустимое количество активаций автологина
     * @return int
     */
    protected function __autologinCnt() {
        return 5;
    }

    /**
     * Ссылка (полный адрес с протоколом) на которую будет вести автологин
     * @return string
     */
    protected function __autologinURL() {
        return '/?utm_source=e-mail&utm_medium=avtomaticheskie_pisma&utm_campaign=vyberite_avtora_net_stavok';
    }

}
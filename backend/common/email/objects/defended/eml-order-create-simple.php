<?php

namespace Email\Objects\Defended;


use Autologin\Services\ServiceAutologin;
use SDK\Objects\CCategory;
use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use SDK\Objects\COrderCategory;
use SDK\Objects\COrderProperty;
use SDK\Objects\COrderTranslate;
use SDK\Objects\CSubject;
use SDK\Objects\CUser;
use Vendor\Core\Email;
use Vendor\Core\ProjectConfig;

/**
 * Сущность для письма при создании обыкновенного заказа (не персонального)
 * Class EmlOrderCreateSimple
 * @package Email\Objects
 */
class EmlOrderCreateSimple extends Email {

    protected $properties;

    /**
     * EmlOrderCreate constructor.
     * @param CUser $user
     * @param $order
     */
    public function __construct(CUser $user, $order) {
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
        return 'create_order.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return 'Ваш заказ размещен на сайте ' . $this->site_name;
    }


    public function setParams() {

        $params = [
            'type_name' => CListElement::findById($this->order->type)->name,
            'order' => $this->order->view(['title', 'work_class', 'volume_from', 'volume_to']),
            'subject_name' => $this->__subject(),
            'language' => CLanguage::findById($this->order->language)->name,
            'language_to' => $this->__languageTo(),
            'properties' => $this->__properties(),
            'category' => $this->__category()
        ];
        
        parent::addParams($params);
    }

    /**
     * Получает предмет заказа
     * @return mixed|string
     */
    protected function __subject() {
        return $this->order->subject ? CSubject::findById($this->order->subject)->subject_name : '';
    }

    /**
     * Получает свойства заказа
     */
    protected function __properties() {
        return COrderProperty::find("order_id = :order_id", [':order_id' => $this->order->id])->view(['property_code', 'property_value']);
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
     * @todo Когда параллельно будут работать старый и новый кабинеты, необходимо организовать роутинг.
     * @todo В данный момент при заказе из нового кабинета урл формируется неправильно.
     * @return string
     */
    protected function __autologinURL() {

        if($this->is_new) {
            return sprintf('%s/order/%d/choose_author%s', $this->__autologinBaseURL(), $this->order->id, $this->utm());
        }

        return sprintf('%s/go/order/%d%s', ProjectConfig::getInstance()->getKey('settings', 'account_url'), $this->order->id, $this->utm());


    }


    /**
     * Формирование ссылки на отписку от рассылки
     * @todo Когда параллельно будут работать старый и новый кабинеты, необходимо организовать роутинг.
     * @todo В данный момент при заказе из нового кабинета урл формируется неправильно.
     */
    protected function __unsubscribe() {
        $settings_page_url = ProjectConfig::getInstance()->getKey('common', 'settings_page');

        if($this->is_new) {
            $settings_page_url = $this->__autologinBaseURL() . '/private/notifications';
        }

        $this->addParam('__UNSUBSCRIBE__', ServiceAutologin::make($this->user, 86400, 1, $settings_page_url));
    }

}
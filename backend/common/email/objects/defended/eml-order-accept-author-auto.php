<?php

namespace Email\Objects\Defended;


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
 * Сущность для письма автору при автоматическом принятии заказа
 * Использование только через агрегатор EmlOrderAccept иное не корректно
 * Class EmlOrderCreate
 * @package Email\Objects
 */
class EmlOrderAcceptAuthorAuto extends Email {

	/**
	 * EmlOrderAcceptAuthorAuto constructor.
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
		return 'accept_order_author_auto.tpl';
	}

	/**
	 * Тема письма
	 * @return string
	 */
	public function subject() {
		return 'Заказ ' . $this->params['type_name'] . ' №' . $this->order->id . ' переведен на гарантийную поддержку.';
	}


	public function setParams() {

		$params = [
			'type_name' => CListElement::findById($this->order->type)->name,
			'order' => $this->order->view(['title', 'work_class', 'volume_to', 'volume_from', 'task']),
			'subject_name' => $this->order->subject ? CSubject::findById($this->order->subject)->subject_name : '',
			'language' => CLanguage::findById($this->order->language)->name,
			'properties' => COrderProperty::find("order_id = :order_id", [':order_id' => $this->order->id])->view(['property_code', 'property_value']),
			'expire_date' => (new \DateTime($this->order->status_expire_date))->format('d.m.Y H:i'),
            'language_to' => $this->__languageTo(),
            'category' => $this->__category()
		];

		parent::addParams($params);
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
	 * @return string
	 */
	protected function __autologinURL() {
		return sprintf('%s/avtor/zakaz/%d', ProjectConfig::getInstance()->getKey('settings', 'account_url'), $this->order->id);
	}

}


?>
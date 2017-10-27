<?php

namespace Email\Objects\Defended;

use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\CUser;
use Vendor\Core\Email;

/**
 * Сущность для письма ЗАКАЗЧИКУ, информирующего о том, что оплачена вторая половина
 * Class EmlOrderPaySecondPartToCustomer
 * @package Email\Objects
 */
class EmlOrderPayFirstPartToCustomer extends Email {

	/**
	 * EmlOrderPaySecondPartToCustomer constructor.
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
		return 'order_pay_first_part_to_customer.tpl';
	}

	/**
	 * Тема письма
	 * @return string
	 */
	public function subject() {
        return "Оплата заказа {$this->params['type_name']} №{$this->order->id} прошла успешно!";
	}

    /**
     * @todo refactoring params
     */
	public function setParams() {

		$params = [
			'type_name' => CListElement::findById($this->order->type)->name,
            'order_id' => $this->order->id,
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
		return 10;
	}


    /**
     * Ссылка (полный адрес с протоколом) на которую будет вести автологин
     * @todo Как только в production будет запущена  версия нового ЛК для заказчика ссылку необходимо будет формировать с учетом Старого и Нового личного кабинета
     *
     * @return string
     */
    protected function __autologinURL() {
        return sprintf('%s/order/%d/choose_author', $this->__autologinBaseURL(), $this->order->id);
    }


}
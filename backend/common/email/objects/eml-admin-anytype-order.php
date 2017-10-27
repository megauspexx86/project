<?php

namespace Email\Objects;


use SDK\Objects\CUser;
use Vendor\Core\Email;
use Vendor\Core\ProjectConfig;

/**
 * Письмо создан заказ с главной страницы napishem.ru тип заказа - “Разное”.
 * Class EmlAdminAnytypeOrder
 * @package Email\Objects
 */
class EmlAdminAnytypeOrder extends Email {


	protected $__type_name;

	/**
	 * EmlAdminAnytypeOrder constructor.
	 * @param CUser $user
	 * @param $order
	 * @param $type_name
	 */


	public function __construct(CUser $user, $order, $type_name) {

		parent::__construct($user);

		$this->__type_name = $type_name;

		$this->__autologin('account_link');

		$this->setParams();
	}

	/**
	 * Имя темплейта
	 * @return string
	 */
	public function template() {
		return 'author_refused_block.tpl';
	}

	/**
	 * Тема письма
	 * @return string
	 */
	public function subject() {
		return "Создан заказ с главной с типом “Разное";
	}


	public function setParams() {
		$params = [
			'user_name' => $this->user->name,
			'user_id' => $this->user->id,
			'order_id' => $order->id,
			'type_name' => $this->__date
		];

		parent::addParams($params);
	}

	/**
	 * Время жизни ссылки автологина
	 * @return int
	 */
	protected function __autologinTTL() {
		return 172800;
	}

	/**
	 * Допустимое количество активаций автологина
	 * @return int
	 */
	protected function __autologinCnt() {
		return 100;
	}

	/**
	 * Ссылка (полный адрес с протоколом) на которую будет вести автологин
	 * @todo добавить ссылку на страницу заказов автора, когда она будет готова
	 * @return string
	 */
	protected function __autologinURL() {
		return false;
	}

}
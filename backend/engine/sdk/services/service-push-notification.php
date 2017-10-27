<?php

namespace SDK\Services;

use Vendor\Core\ActiveRecordList;
use Vendor\Core\ProjectConfig;

class ServicePushNotification {

	protected $_tokens;

	/**
	 * ServicePushNotification constructor.
	 * @param array $tokens
	 */

	public function __construct(array $tokens) {
		$this->_tokens = $tokens;
	}
	/**
	 * Уведомление о скидке 3%, метод вызывает класс Discount из events через nodejs express roter, где реализована логика отправки с таймаутом
	 */
	public function discount() {
		if(count($this->_tokens)){
			$this->_run('/push-discount-3', ['recepient' => $this->_tokens]);
		}
	}

	/**
	 * Уведомление о новом сообщении, метод вызывает класс NewMessage из events через nodejs express roter, где реализована логика отправки с таймаутом
	 */
	public function newMessage($user_id) {
		if(count($this->_tokens) and $user_id){
			$this->_run('/new-message', ['recepient' => $this->_tokens, 'user_id' => $user_id]);
		}
	}
	/**
	 * Уведомление Ваш заказ ожидает оплаты, метод вызывает класс PayOrder из events через nodejs express roter, где реализована логика отправки с таймаутом
	 */
	public function payOrder($order_id) {
		if(count($this->_tokens) and $order_id){
			$this->_run('/pay-order', ['recepient' => $this->_tokens, 'order_id' => $order_id]);
		}
	}
	/**
	 * Уведомление Заказ выполнен, метод вызывает класс OrderComplete из events через nodejs express roter, где реализована логика отправки с таймаутом
	 */
	public function orderComplete($order_id) {
		if(count($this->_tokens)){
			$this->_run('/order-complete', ['recepient' => $this->_tokens, 'order_id' => $order_id]);
		}
	}

	/**
	 * Уведомление Ваш заказ оценен! Выберите исполнителя!, метод вызывает класс SelectAuthor из events через nodejs express roter, где реализована логика отправки с таймаутом
	 */
	public function selectAuthor($order_id) {
		if(count($this->_tokens) and $order_id){
			$this->_run('/select-author', ['recepient' => $this->_tokens, 'order_id' => $order_id]);
		}
	}


	/**
	 * @param $command
	 * @param $params
	 * @return mixed
	 */
	protected function _run($command, $params) {

		$url = ProjectConfig::getInstance()->getKey('settings', 'events_url');
		$request = curl_init();

		curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($request, CURLOPT_URL, sprintf('%s%s', $url, $command));
		curl_setopt($request, CURLOPT_POST, true);
		curl_setopt($request, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($request, CURLOPT_POSTFIELDS, http_build_query($params));
		$result = json_decode(curl_exec($request));
		curl_close($request);
		return $result;
	}
}
<?php

namespace SDK\Services;

// сервис выбора перс менеджера алгоритм https://redmine.napdev.ru/projects/napishem/wiki/%D0%9F%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80#Распределение-заказов

use SDK\Objects\CManagerFixTypes;
use SDK\Objects\COrder;
use SDK\Objects\CPersManagers;

class ServiceManager {

	protected $manager_ids = [];

	/**
	 * @param $type_id
	 * @param $owner_id
	 * @return int
	 */
	public function manager($type_id, $owner_id) {

		if ($this->manager_ids = $this->_managers($type_id)) {
			if (!$manager_id = $this->_myManager($owner_id)) {

				$manager_id = $this->_selectManager($owner_id);

			}
			return $manager_id;
		}
		return 0;
	}

	/**
	 * Возвращает статусы для расчета количества заказов у менеджера
	 * @return array
	 */
	protected function __statuses(){
		return [COrder::STATUS_NEW, COrder::STATUS_AUTHOR_SELECTED,COrder::STATUS_CUSTOMER_REFUSED ,COrder::STATUS_AUTHOR_REFUSED, COrder::STATUS_WAIT_MONEY];
	}

	/**
	 * Возвращает допустимые статусы удаления
	 * @return array
	 */
	protected function __deleted(){
		return [COrder::DELETED_AUTHOR, COrder::DELETED_NOT];
	}

	/*
	 * Получаем всех активных менеджеров
	 * @param int type_id
	 * @return array
	 */
	protected function _managers($type_id) {
		if (CManagerFixTypes::findCountByType($type_id)) {
			return $this->__type($type_id);
		}
		return CPersManagers::find('status = :status', [':status' => 1])->id;
	}

	/**
	 * Получаем зафиксированных менеджеров для типов работ, если менеджеры заблокированы, менеджер закреплен не будет
	 * https://redmine.napdev.ru/issues/8125
	 * @param $type_id
	 * @return array
	 */
	protected function __type($type_id){
		$manager_list = CManagerFixTypes::findActiveByType($type_id);
		if ($manager_list->getCount()) {
			return $manager_list->manager_id;
		}
		return [];
	}
	/**
	 * равномерное распределение заказов между менеджерами
	 * @param int owner_id
	 * @return int manager_id
	 */
	protected function  _selectManager(){
		$available_managers =  array_diff( $this->manager_ids, $this->_lastManagers());
		if(!$available_managers){
			$available_managers = $this->manager_ids;
		}

		if(count($available_managers) == 1){
			return array_shift($available_managers);
		}
		return $this->__managerMinCountOrders($available_managers);
	}

	/**
	 * возвращает массив manager_ids по прошлым заказам
	 * @todo индексы на таблицу orders
	 * @return \Vendor\Core\ActiveRecordList
	 */
	protected function __managerMinCountOrders($managers){
		$extra = [
			'orderby' =>' COUNT(orders.id) ASC, pers_id ASC',
			'groupby' => 'pers_id'
		];
		$manager = COrder::findOne('pers_id in (:managers) AND status in(:statuses) and deleted in (:deleted)',[':managers' => $managers,  ':statuses' => $this->__statuses(), ':deleted' => $this->__deleted()], $extra);
		return !$manager ? 0 : $manager->pers_id;
	}
	/**
	 * @return array
	 */
	protected function _lastManagers() {
		$extra = ['orderby' => 'id DESC', 'limit' => abs(count($this->manager_ids) - 1)];
		$list =  COrder::find('pers_m = :pers_m AND pers_id IN (:manager_ids)', [':pers_m' => 1, ':manager_ids' => $this->manager_ids], $extra);
		return $list->pers_id;
	}

	/*
	 * возвращает менеджера который уже работал с заказами пользователя
	 * не проверяется статус блокировки менеджера, т.к. предпологается что он уже проверен и сформирован массив ids $this->manager_ids
	 * @param int owner_id
	 * @return int
	 * */
	protected function _myManager($owner_id) {
		$params = [':pers_m' => 1, ':owner_id' => $owner_id, ':pers_ids' => $this->manager_ids/*, ':statuses' => $this->__statuses()*/];
		$extra = ['orderby' => 'id DESC'];

		if ($order = COrder::findOne('owner_id = :owner_id AND pers_m = :pers_m and pers_id IN (:pers_ids)', $params, $extra)) {
			return $order->pers_id;
		}

		return 0;
	}



}
<?php

namespace SDK\Services;

use SDK\Objects\CSettings;

class ServiceSettings {

    /**
     * Получает значение настройки
     * @param $name
     * @return mixed;
     */
	public function get($name) {

        $list = CSettings::find("name = :name", [':name' => $name], ['offset' => 0, 'limit' => 1]);

        if($list->getCount() == 0) {
            return null;
        }

        return $list->get(0)->value;
	}

    /**
     * Выставление настройки
     * @param $name
     * @param $value
     * @return ServiceSettings
     */
	public function set($name, $value) {

        $list = CSettings::find("name = :name", [':name' => $name], ['offset' => 0, 'limit' => 1]);

        $item = $list->getCount() == 0 ? new CSettings() : $list->get(0);

		$item->name = $name;
		$item->value = $value;
		$item->save();

        return $this;
	}

    /**
     * Выставляет значения группе настроек
     * @param $values
     * @return $this
     */
	public function setHash($values) {

		foreach($values as $name => $value){
            $this->set($name, $value);
		}

		return $this;
	}

    /**
     * Получает группу настроек
     * @param $names
     * @return array
     */
    public function getHash($names) {

        $list = CSettings::find('name IN (:names)', [':names' => $names], ['ORDER_BY' => 'id ASC']);

        $result = [];

        foreach($list as $element) {
            $result[$element->name] = $element->value;
        }

        return $result;
    }
}

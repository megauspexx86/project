<?php

namespace Vendor\Core;

/**
 * Новая реализация ActiveRecord для объектов созданных в новой системе, делает обязательными поля create_date и update_date
 * Class ActiveRecordExtended
 * @package Vendor\Core
 */
class ActiveRecordExtended extends ActiveRecord {

    protected $create_date;
    protected $update_date;

    /**
     * Сохраняет новый объект
     */
    protected function saveInsert() {

        $time = time();
        $this->__model['create_date'] = $time;
        $this->__model['update_date'] = $time;
        $this->create_date = $time;
        $this->update_date = $time;

        parent::saveInsert();
    }

    /**
     * Сохраняет существующий объект
     */
    protected function saveUpdate() {
        if(sizeof($this->__changes) > 0) {
            $this->__changes['id'] = $this->id;
            $this->__changes['update_date'] = time();
            parent::saveUpdate();
        }
    }

    /**
     * Загружает данные объекта из массива $hash
     * Всегда вырезает ID из переданного массива
     * @param $hash
     * @return ActiveRecord
     */
    public function loadFromHash($hash) {

        if(isset($hash['create_date'])) {
            unset($hash['create_date']);
        }

        if(isset($hash['update_date'])) {
            unset($hash['update_date']);
        }

        return parent::loadFromHash($hash);
    }

    /**
     * Готовит объект к отображению
     * @param array $fields
     * @return array
     */
    public function view($fields = array()) {

        if(in_array('formatted_create_date', $fields)) {
            $this->extend('formatted_create_date', (new \DateTime())->setTimestamp($this->create_date)->format('d.m.Y'));
        }

        if(in_array('formatted_date_time', $fields)) {
            $this->extend('formatted_date_time', (new \DateTime())->setTimestamp($this->create_date)->format('d.m.y H:i'));
        }

        return parent::view($fields);
    }


    /**
     * Инициализирует объект из массива $hash
     * @param $hash
     * @return ActiveRecord
     */
    protected function initFromHash($hash) {

        $this->create_date = $hash['create_date'];
        $this->update_date = $hash['update_date'];

        return parent::initFromHash($hash);
    }

    static public function find($criteria, $values = array(), $extra = array()) {

        if(!isset($extra['fields'])) {
            $extra['fields'] = [];
        }

        $class = get_called_class();

        $extra['fields'][sprintf('%s.create_date', $class::dbTable())] = 'create_date';
        $extra['fields'][sprintf('%s.update_date', $class::dbTable())] = 'update_date';
      
        return parent::find($criteria, $values, $extra);
    }

    /**
     * Поиск одной записи по условиям
     * @param $criteria
     * @param $params
     * @param array $extra
     * @return ActiveRecordExtended
     */
    static public function findOne($criteria, $params, $extra = []) {

        $extra['limit'] = 1;
        $extra['offset'] = 0;

        $class = get_called_class();

        $list = $class::find($criteria, $params, $extra);

        if($list->getCount() == 1) {
            return $list->get(0);
        }

        return null;
    }
}

?>
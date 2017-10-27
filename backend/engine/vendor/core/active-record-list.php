<?php

namespace Vendor\Core;
use Vendor\Core\Error\Ex500;

/**
 * Class ActiveRecordList
 * Список объектов класса ActiveRecord
 * @package Core
 */
class ActiveRecordList extends ObjectList {

    protected $totalCount = 0;

    /**
     * Возвращает общее количество записей AR (SQL_CALC_FOUND_ROWS)
     * @return int
     */
    public function getTotalCount() {
        return $this->totalCount;
    }

    /**
     * устанавливает общее количество записей AR (SQL_CALC_FOUND_ROWS)
     */
    public function setTotalCount($c) {
        $this->totalCount = $c;
    }

    /**
     * Кладет объект ActiveRecord в список
     * @param $object
     * @throws Ex500
     */
    public function push($object) {

        if(!($object instanceof ActiveRecord)) {
            throw new Ex500('Object must be ActiveRecord instance');
        }

        parent::push($object);
    }

    /**
     * Перекрывает базовый toJSON
     * всегда выбрасывает исключение,
     * т.к. объекты ActiveRecord должны быть помещены во templates c явным указанием полей к выводу
     * @throws Ex500
     */
    public function toJSON() {
        throw new Ex500('To put Active record list into templates using render method');
    }


    /**
     * Возвращает объект из списка по его ID
     * @param $id
     * @return ActiveRecord
     */
    public function id($id) {

        foreach($this->list as $obj) {
            if($obj->id == $id) {
                return $obj;
            }
        }

        return null;
    }

    /**
     * Поиск элемента по значению свойства
     * @param $property
     * @param $value
     * @return int
     */
    public function find($property, $value) {

        foreach($this->list as $i => $object) {
            if($object->$property == $value) {
                return $i;
            }
        }

        return -1;
    }

    /**
     * Поиск элементов по значению свойства
     * @param $property
     * @param $value
     * @return ActiveRecordList
     * @throws Ex500
     */
    public function findByProperty($property, $value) {

        $list = new ActiveRecordList();

        foreach($this->list as $i => $object) {
            if($object->$property == $value) {
                $list->push($object);
            }
        }

        return $list;
    }

    /**
     * @param $property
     * @return array
     */
    public function __get($property) {

        $result = [];

        foreach($this->list as $element) {
            $result[] = $element->$property;
        }

        return $result;
    }

    /**
     * Присвоение всем объектам листа свойства
     * @param $name
     * @param $value
     */
    public function __set($name, $value) {
        foreach($this->list as $element) {
           $element->$name = $value;
        }
    }

    /**
     * Групповой вызов методов
     * @param $func
     * @param $args
     */
    public function __call($func, $args) {
        foreach($this->list as $element) {
            call_user_func_array([$element, $func], $args);
        }
    }

    /**
     * Общий для всех объектов метод отрисовки
     * для объектов ActiveRecord выбрасывает Exception
     * Объект AR предвартительно должен быть преобразован в массив
     * с указанием полей, которые должны быть переданы в обеъкт отображения
     */
    final public function render() {
        throw new Ex500("ActiveRecordList can't be put in View. Call templates method");
    }

    /**
     * Готовит объекты к отображению
     * @param array $fields
     * @return array
     */
    public function view($fields = array()) {
        $result = [];
        foreach($this->list as $object) {
            $result[] = $object->view($fields);
        }

        return $result;
    }
}
<?php

namespace Vendor\Core;


use Vendor\Core\Db\DbBridge;
use Vendor\Core\Db\DbCriteria;
use Vendor\Lib\Validator\ExValidateFails;
use Vendor\Lib\Validator\FormValidator;

abstract class ActiveRecord {

    /**
     * ID записи в системе
     * @var int
     */
    protected $id;

    /**
     * Поля модели
     * @var array
     */
    protected $__model = [];

    /**
     * Дополнительные поля, полученные в результате например JOIN
     * @var array
     */
    protected $__extension = [];

    /**
     * Измененные значения
     * @var array
     */
    protected $__changes;


    public function __construct() {

        $class = get_called_class();

        $this->__changes = array();
        $this->__model = $class::model();
    }

    public function extend($name, $value) {
        $this->__extension[$name] = $value;
    }

    /**
     * Считает количество записей соответсвующих условям
     * @param $criteria
     * @param array $values
     * @param array $extra
     * @return int
     */
    static public function count($criteria, $values = [], $extra = []) {

        $class = get_called_class();
        $table = $class::dbTable();

        $params = array(
            'table' => $table,
            'where' => $criteria,
            'join' => isset($extra['join']) ? $extra['join'] : array(),
            'groupby' => isset($extra['groupby']) ? $extra['groupby'] : null
        );

        $db_criteria = new DbCriteria($params);

        $result = DbBridge::getInstance()->query($db_criteria->countSql(), $values)->fetchHash();

        return intval($result['cnt']);
    }

    /**
     * Поиск записей по заданным условиям
     * @param $criteria
     * @param array $params
     * @return ActiveRecordList
     */
    static public function find($criteria, $values = array(), $extra = array()) {

        $class = get_called_class();
        $table = $class::dbTable();


        $fields = array_map(function($field) use ($table){
            return $table . "." . $field;
        }, array_keys($class::model()));

        if(isset($extra['fields'])) {
            foreach($extra['fields'] as $fieldname => $alias) {
                $fields[] = $fieldname . " AS " . $alias;
            }
        }

        $params = array(
            'table' => $table,
            'where' => $criteria,
            'fields' => "$table.id, " . join(", ", $fields),
            'join' => isset($extra['join']) ? $extra['join'] : array(),
            'limit' => isset($extra['limit']) ? $extra['limit'] : null,
            'orderby' => isset($extra['orderby']) ? $extra['orderby'] : null,
            'groupby' => isset($extra['groupby']) ? $extra['groupby'] : null,
            'offset' => isset($extra['offset']) ? $extra['offset'] : null,
            'count' => isset($extra['count']) ? $extra['count'] : null
        );


        $db_criteria = new DbCriteria($params);
        
        $query = DbBridge::getInstance()->query($db_criteria->sql(), $values);

        $list = $class::getList();

        if(isset($extra['count'])) {
            $list->setTotalCount(self::countRows());
        }

        if(isset($extra['cnt'])) {
            $list->setTotalCount(self::count($criteria, $values, $extra));
        }

        while($r = $query->fetchHash()) {

            $object = new $class();

            if(isset($extra['fields'])){
                foreach($extra['fields'] as $fieldname => $alias) {
                    $object->__extension[$alias] = $r[$alias]; //Добавляем расширение модели
                }
            }

            $object->initFromHash($r);

            $list->push($object);
        }

        return $list;
    }

    /**
     * Получает объект листа
     * @return ActiveRecordList
     */
    static protected function getList() {
        return new ActiveRecordList();
    }

    /**
     * Поиск записей по его PK - id
     * @param $id
     * @param array $extra
     * @return ActiveRecord
     */
    static public function findById($id, $extra = []) {

        $class = get_called_class();

        $extra['limit'] = 1;
        $extra['offset'] = 0;

        $table = $class::dbTable();

        $list = $class::find($table . ".id = :id", array(':id' => $id), $extra);

        if($list->getCount() == 0) {
            return null;
        }

        return $list->get(0);
    }

    /**
     * Поиск одной записи по условиям
     * @param $criteria
     * @param $params
     * @param array $extra
     * @return ActiveRecord
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

    static public function countRows() {
        $result = DbBridge::getInstance()->query("SELECT FOUND_ROWS() as total_rows;")->fetchHash();
        return intval($result['total_rows']);
    }

    /**
     * Проверяет данные из hash на корректность
     * @param $hash
     * @throws ExValidateFails
     * @return ActiveRecord
     */
    static public function validate($hash) {

        $class_name = get_called_class();

        $rules = $class_name::rules();

        $validator = new FormValidator();

        foreach($rules as $fields => $f_rules) {
            foreach($f_rules as $rule) {
                $validator->addRule($rule);
            }
        }

        $errors = $validator->validate($hash);

        if($errors) {
            throw new  ExValidateFails(__CLASS__, $errors);
        }
    }

    /**
     * Возвращает набор правил для валидации  объекта
     * по умолчанию пустой, при необходимости реализация в потомке
     * @return array
     */
    static protected function rules() {
        return [];
    }

    /**
     * Получение значения поля модели
     * @param $name
     * @return mixed
     * @throws ExCommon
     */
    public function __get($name) {

        if(in_array($name, ['id'])) {
            return $this->$name;
        }

        if(!$this->_hasAttribute($name)) {
            throw new ExCommon(500, sprintf("Class: %s. Can't get %s attribute", get_called_class(), $name));
        }

        return array_key_exists($name, $this->__model) ? $this->__model[$name] : $this->__extension[$name];
    }

    /**
     * Установка значения поля модели
     * @param $name
     * @param $value
     * @throws ExCommon
     */
    public function __set($name, $value) {

        if(!$this->_hasAttribute($name)) {
            throw new ExCommon(500, sprintf("Class: %s. Can't set %s attribute", get_called_class(), $name));
        }

        if(isset($this->__extension[$name])) {
            return $this->__extension[$name] = $value;
        }

        $this->__changes[$name] = $value;
        $this->__model[$name] = $value;
    }

    /**
     * Сохраняет объект
     * @return $this
     */
    public function save() {
        $this->id == null ? $this->saveInsert() : $this->saveUpdate();
        $this->__changes = array();
        return $this;
    }

    /**
     * Удаляет объект из БД
     */
    public function delete() {
        $class = get_class($this);
        DbBridge::getInstance()->query('DELETE FROM ' . $class::dbTable() . ' WHERE id = :id', [':id' => $this->id]);
    }

    /**
     * Сохраняет новый объект
     */
    protected function saveInsert() {
        
        $this->__clearModel();
        
        $class = get_class($this);
        $this->id = DbBridge::getInstance()->insert($class::dbTable(), $this->__model);
    }

    /**
     * Сохраняет существующий объект
     */
    protected function saveUpdate() {

        foreach ($this->__changes as $key => $value) {
            $this->__changes[$key] = $this->__clearValue($value);
        }

        $class = get_class($this);

        if(sizeof($this->__changes) > 0) {
            $this->__changes['id'] = $this->id;

            DbBridge::getInstance()->update($class::dbTable(), $this->__changes, "id=:id", array('id'));
        }
    }

    /**
     * Загружает данные объекта из массива $hash
     * Всегда вырезает ID из переданного массива
     * @param $hash
     * @return ActiveRecord
     */
    public function loadFromHash($hash) {

        if(isset($hash['id'])) {
            unset($hash['id']);
        }

        foreach ($hash as $property => $value) {
            $this->$property = $value;
        }

        return $this;
    }

    /**
     * Готовит объект к отображению
     * @param array $fields
     * @return array
     */
    public function view($fields = array()) {

        $result = array('id' => $this->id);

        if(empty($fields)) {
            return array_merge($result, $this->__model);
        }

        foreach($fields as $key) {
            if($key != 'id'){
                $result[$key] = isset($this->__model[$key]) ? $this->__model[$key] : (isset($this->__extension[$key]) ? $this->__extension[$key] : null);
            }
        }

        return $result;
    }

    /**
     * Общий для всех объектов метод отрисовки
     * для объектов ActiveRecord выбрасывает Exception
     * Объект AR предвартительно должен быть преобразован в массив
     * с указанием полей, которые должны быть переданы в обеъкт отображения
     */
    final public function render() {
        throw new ExCommon(__CLASS__, "ActiveRecord can't be put in View. Call templates method");
    }


    /**
     * Инициализирует объект из массива $hash
     * @param $hash
     * @return ActiveRecord
     */
    protected function initFromHash($hash) {

        $this->id = $hash['id'];

        $this->loadFromHash($hash);
        $this->__changes = array();
        return $this;
    }

    protected function _hasAttribute($name) {
        return array_key_exists($name, $this->__model) || array_key_exists($name, $this->__extension);
    }

    /**
     * Очистка значений моделей от html тегов
     */
    protected function __clearModel() {
        foreach ($this->__model as $key => $value) {
            $this->__model[$key] = $this->__clearValue($value);
        }

    }
    
    /**
     * Защита от XSS (обрезание опасного html)
     * @param $value
     * @return string
     */
    protected function __clearValue($value) {
        if(is_string($value) && !empty($value) && !is_numeric($value)) {
            $qevix = new \Qevix();
            $qevix->cfgSetTagCutWithContent(array('script', 'object', 'iframe', 'style'));
            return $qevix->parse($value, $errors);
        }
        return $value;
    }
}

?>
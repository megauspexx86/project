<?php

namespace SDK\Lib\Geo;

/**
 *
 * Базовый провайдер определения локации
 *
 * @package SDK\Lib\Geo
 */
abstract class GeoProvider {

    /**
     * IP адрес, по которому надо получить информацию
     * @var string
     */
    protected $__ip;

    /**
     * Информация о геолокации полученная от провайдера
     * @var \stdClass
     */
    protected $__data;

    public function __construct($ip) {
        $this->__ip = $ip;
    }

    /**
     * Возвращает информацию о IP адресе
     */
    public function data() {
        $this->__parse();
        return $this->__data;
    }

    /**
     * разбор информации о локации
     * @return mixed
     */
    abstract protected function __parse();

    /**
     * Загрузка информации
     * @return mixed
     */
    abstract protected function __load();

}
<?php

namespace Vendor\Core;

/**
 * Class Locale
 * @package Vendor\Core
 *
 * Загружает локализацию пользователя в конфигурацию проекта
 *
 * @todo Пока работает только одна локализация ru_RU поэтому логика не реализована, класс-рыба реализован для начальной входной точки инициализации локлизации
 * @todo Необходимо иметь возможность получения локализации по пользователю, это нужно для рассылки писем
 *
 */
class Locale {

    /**
     * Массив локализации
     * @var array|mixed
     */
    protected $__locale = [];

    /**
     * Значение локализации
     * @var string
     */
    protected $__locale_value;

    /**
     * Locale constructor.
     */
    public function __construct() {
        $this->__locale = require_once (sprintf('%s/%s.php', LOCALE_DIR, $this->locale()));
    }

    /**
     * Получает значение локализации
     * @return string
     */
    public function locale() {

        if(!$this->__locale_value) {
            $this->__initLocale();
        }

        return $this->__locale_value;
    }

    /**
     * Добавляет локализацию к конфигу проекта
     */
    public function set() {
       ProjectConfig::getInstance()->merge(['locale' => $this->__locale]);
    }

    /**
     * Определяет локализацию локализацию, которую необходимо загрузить, тк локаль сейчас одна возвращаем hardcode
     */
    protected function __initLocale() {
        $this->__locale_value = 'ru_RU';
    }

}
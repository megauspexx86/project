<?php

namespace Vendor\Core;

abstract class Component {


    protected $__app;

    /**
     * Component constructor.
     * @param Application $app
     */
    public function __construct(Application $app) {
        $this->__app = $app;
        $this->_setupRouter();
    }

    /**
     * Инициализация URL компонента
     */
    protected function _setupRouter() {

        $routes = $this->_router();

        foreach ($routes as $route) {
            $this->__app->addRoute($route['pattern'], $route['module'], $route['handler']);
        }

    }

    /**
     * Применяет актуальную конфигурацию проекта. Приоритетной являются значения из конфигов среды
     */
    public function config() {

        if(!$component_config = $this->_config()) {
            return [];
        }

        $env = ProjectConfig::getInstance()->getKeys();

        $result = [];

        foreach ($component_config as $section => $value) {

            $result[$section] = isset($env[$section]) ? (is_array($value) ? array_replace_recursive($value, $env[$section]) : $env[$section]) : $value;

        }

        return $result;

    }

    /**
     * Конфигурация компонента по умолчанию
     * @return array
     */
    protected function _config() {
        return [];
    }

    /**
     * URL для компонента
     * @return array
     */
    abstract protected function _router();
}

?>
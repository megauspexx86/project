<?php

namespace Vendor\Core;

class ProjectConfig {

    private $config = [];
    static private $instance = null;

    final protected function __construct($files) {
       foreach($files as $filename) {
           $this->config = array_replace_recursive($this->config,$filename);
       }
    }

    /**
     * @return ProjectConfig
     */
    static public function getInstance() {

        if(is_null(self::$instance)) {
            self::$instance = new ProjectConfig(func_get_args());
        }

        return self::$instance;
    }

    public function getKey($key, $sub_key = null) {

        if(!isset($this->config[$key])) {
            return null;
        }

        $value = $this->config[$key];

        if(!is_null($sub_key) && is_array($value)) {
            return $value[$sub_key];
        }

        return $value;
    }

    public function getKeys() {
        return $this->config;
    }

    public function merge($config) {
        $this->config = array_replace_recursive($this->config, $config);
        return $this;
    }
}
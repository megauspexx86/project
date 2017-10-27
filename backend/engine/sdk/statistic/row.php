<?php

namespace SDK\Statistic;

/**
 * Class Row
 * Универсальный класс, для того, чтобы писать значения статистики
 * @package SDK\Statistic
 */
class Row {
    
    private $__props = [];
    
    public function __construct(array $init = []) {
        $this->__props = $init;
    }
    
    public function __set($name, $value) {
        $this->__props[$name] = $value;
    }
    
    public function __get($name) {
        
        if(!isset($this->__props[$name])) {
            return null;
        }
        
        return $this->__props[$name];
    }

    public function render() {
        return $this->__props;
    }

}
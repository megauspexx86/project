<?php

namespace SDK\Lib;

class DateTime {

    protected static $instance;

    private function __construct() {}

    static public function getInstance() {

        if(is_null(self::$instance)) {
            self::$instance = new DateTime();
        }

        return self::$instance;
    }

    /**
     * Возращает теущее значение Unixtimestamp
     * @return int
     */
    public function time() {
        return time();
    }

}
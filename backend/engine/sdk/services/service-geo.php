<?php

namespace SDK\Services;

use SDK\Lib\Geo\SypexProvider;


/**
 * Class ServiceGeo
 * Определение географии
 */

class ServiceGeo {


    protected $__provider;

    function __construct() {
        $this->__provider = new SypexProvider($_SERVER['REMOTE_ADDR']);
    }

    /**
     * Получение информации о локации от провайдера
     * @return \stdClass
     */
    public function info() {
        return $this->__provider->data();
    }

}

?>
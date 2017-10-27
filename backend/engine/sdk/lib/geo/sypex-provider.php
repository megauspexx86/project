<?php

namespace SDK\Lib\Geo;

use Vendor\Core\ProjectConfig;

/**
 * Class SypexProvider
 *
 * Провайдер определения геолокации на основе сервиса http://sypexgeo.net/
 *
 * @package SDK\Lib\Geo
 */
class SypexProvider extends GeoProvider {

    /**
     * timeout на обращение к сервису
     */
    const __TIMEOUT__ = 15;

    /**
     * @see GeoProvider
     */
    protected function __parse() {

        if($data = $this->__load()) {
            $this->__data = json_decode($data);
        }
    }

    /**
     * @see GeoProvider
     */
    protected function __load() {

        $c = curl_init(sprintf('%s/%s', ProjectConfig::getInstance()->getKey('geo', 'url'), $this->__ip));

        curl_setopt($c,CURLOPT_TIMEOUT,self::__TIMEOUT__);
        curl_setopt($c,CURLOPT_RETURNTRANSFER,true);

        if(!$result = curl_exec($c)) {
            return null;
        }

        return $result;

    }

}
<?php

namespace Vendor\Core;


use SDK\Lib\DateTime;

abstract class Module {

    private $params;

	public function __construct($params = []) {
        $this->params = $params;
        $this->__setReferer();
    }

    /**
     * Запись меток в куку
     * @param $value
     * @return bool
     */
    protected function __setReferer() {

        Cookie::getInstance()->settings('expire', $this->__expire());
        Cookie::getInstance()->settings('secure', false);

        $referrer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null;
        $utm_params = Request::getQueryVars(array('utm_source', 'utm_medium', 'utm_content', 'utm_campaign'));

        if($utm_params['utm_source'] && $utm_params['utm_campaign']) {
            $data = sprintf('%s::%s::%s::%s::%s', $referrer, $utm_params['utm_source'], $utm_params['utm_medium'], $utm_params['utm_content'], $utm_params['utm_campaign']);
            $cookie = Cookie::getInstance()->__REFERRER_DATA__ = $data;
        }
    }

    /**
     * Получает срок жизни куки по устанавливаемому значению
     * @param $value
     * @return int
     */
    protected function __expire() {
        return DateTime::getInstance()->time()+ (86400 * 30);
    }

    /**
     * Get request param by name
     * @param $name
     * @return null
     */
    final protected function param($name) {
        return isset($this->params[$name]) ? $this->params[$name] : null;
    }
}


?>
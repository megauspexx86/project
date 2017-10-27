<?php

namespace Vendor\Core;

class Application {

	/**
	 * @var UrlMapper
	 */
	protected $url_mapper;

	/**
	 * @var Response
	 */
	protected $response;


	public function __construct() {

        Factory::setInstance($this, 'Application');

		$this->setupUrlMapper();
		$this->setupResponse();
		$this->setupComponents();
	}

	/**
	 * @return Application
	 */
	public static function getInstance() {
		return Factory::getInstance('Application');
	}

	public function addRoute($pattern, $module, $handler) {
		$this->url_mapper->addRule($pattern, $module, $handler);
	}

	/**
	 * @return UrlMapper
	 */
	protected function setupUrlMapper() {
		return $this->url_mapper = new UrlMapper();
	}

	protected function setupResponse() {
		$this->response = Response::getInstance();
	}

	/**
	 * Инициализируемые комопоненты
	 * @return array
	 */
	protected function _components() {
		return [];
	}

	/**
	 * Инициализация компонентов
	 */
	protected function setupComponents() {

		$c = $this->_components();

		foreach ($c as $component) {
			$cc = new $component($this);
			ProjectConfig::getInstance()->merge($cc->config());
		}
	}

	/**
	 * @return UrlMapper
	 */
	public function getUrlMapper() {
		return $this->url_mapper;
	}

	public function run($request_uri) {

        try {

            $result = $this->url_mapper->parseUrl($request_uri)->run();

        } catch(\Exception $e) {

            if($e->getCode() == 403) {
                (new HttpLocation('/'))->go();
			}

            print sprintf("%d %s", $e->getCode(), $e->getMessage());
            exit;
        }

        $this->response->setContentType($result->getContentType(), 'utf-8');
        $this->response->setContent($result);
        $this->response->flush();
	}

}

?>

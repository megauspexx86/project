<?php

namespace Vendor\Core;

class Command {

	public $handler;
	public $params;


	function __construct($handler, $params) {
		$this->handler = $handler;
		$this->params = $params;
	}
	
	public function run() {

        $action = $this->handler['command'];

        $module = new $this->handler['module']($this->params);
        return $module->$action();
	}
}


?>
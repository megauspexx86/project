<?php

namespace Vendor\Core;

use Vendor\Core\Error\Ex500;

class Factory {
	
	static private $instances;
	
	protected function __construct() {
		throw new Ex500();
	}
	
	static public function getInstance($class_name, $key = null) {

		$key = $key == null ? $class_name : $key;

		if(self::hasInstance($key) == false) {
			self::$instances[$key] = new $class_name();
		}
		return self::$instances[$key];
	}
	
	static public function hasInstance($key) {
		return isset(self::$instances[$key]) && self::$instances[$key] != null;
	}
	
	static public function setInstance($instance, $key = null) {
		if($key == null) {
			$key = get_class($instance);
		}
		self::$instances[$key] = $instance;
	}
	
	static public function resetInstances() {
		self::$instances = array();
	}
	
	static public function unsetInstance($key) {
		if(self::hasInstance($key)) self::$instances[$key] = null;
	}
}


?>
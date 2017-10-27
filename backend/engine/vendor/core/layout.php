<?php

namespace Vendor\Core;

class Layout {
	
	protected $name;
	protected $objects;
	
	public function __construct($name) {
		$this->name = $name;
		$this->objects = array();
	}
	
	public function addObject($name, $object) {
		$this->objects[$name] = $object;
	}
	
	public function getObject($name) {
		return isset($this->objects[$name]) ? $this->objects[$name] : null;
	}
	
	public function toDomDocument(\DomElement $root) {
		
		$root->setAttribute("name", $this->name);
		
		foreach($this->objects as $key => $object) {
			$dom_root = $root->appendChild(new \DomElement($key));
			Utils::value2dom($object, $dom_root);
		}
		
		return $root;
	}
}

?>
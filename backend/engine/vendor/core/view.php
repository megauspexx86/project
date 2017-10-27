<?php

namespace Vendor\Core;

abstract class View {

	protected $objects = [];
    protected $encoding = 'utf-8';

    public function __construct() {}

    abstract public function getContentType();

	public function addObject($key, $object) {
		$this->objects[$key] = $object;
	}

    public function getObject($name) {
        return isset($this->objects[$name]) ? $this->objects[$name] : null;
    }

    public function setEncoding($encoding) {
        $this->encoding = $encoding;
    }

    public function getEncoding() {
        return $this->encoding;
    }
}
?>
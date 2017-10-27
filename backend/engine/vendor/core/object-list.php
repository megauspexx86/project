<?php

namespace Vendor\Core;

class ObjectList implements \IteratorAggregate  {

    protected $list;

  	public function __construct($list = null) {
  		$this->list = array();
  		if($list !== null) {
  			$this->list = is_array($list) ? $list : $list->list;
  		}
  	}

	/**
	 * Итерируется по объекту по заданным условиям
	 * @param $function
	 * @return ObjectList
	 */
	public function map($function) {

		$result = array_map($function, $this->list);

		$class = get_called_class();

		return new $class($result);
	}

    public function getIterator() {
        return new ObjectListIterator($this);
    }
  	
  	public function getList() {
  		return $this->list;
  	}
  	
  	public function push($obj) {
  		array_push($this->list, $obj);
  	}
  	
  	public function appendAfter($index, $obj) {
  		if($index == -1) {
  			$this->unshift($obj);
  		}
  		elseif($index == sizeof($this->list)) {
  			$this->push($obj);
  		} else {
	  		$left = array_slice($this->list, 0, $index+1);
	  		$right = array_slice($this->list, $index+1);
	  		array_push($left, $obj);
	  		$this->list = array_merge($left, $right);
  		}
  	}
  	
  	public function remove($index) {
  		$v = $this->get($index);
  		unset($this->list[$index]);
  		$this->list = array_values($this->list);
  		return $v;
  	}
  	
  	public function unshift($obj) {
  		array_unshift($this->list, $obj);
  	}

  	public function get($index) {

        if($index < 0 || $index >= sizeof($this->list)){
            throw new ExCommon(500, "Undefined index " . $index);
        }

        return $this->list[$index];
  	}
  	
  	public function set($index, $object) {
  		$this->list[$index] = $object;
  	}
  	
  	public function getCount() {
  		return count($this->list);
    }

	public function render() {

        $list = [];

        foreach($this->list as $object) {
            $list[] = $object->render();
        }

        return $list;
	}
}


?>
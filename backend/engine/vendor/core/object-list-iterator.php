<?php

namespace Vendor\Core;

class ObjectListIterator implements \Iterator {

    private $list = null;
    private $c_index = 0;

    public function __construct(ObjectList $list) {
        $this->list = $list;
        $this->rewind();
    }

    public function rewind() {
        $this->c_index = 0;
    }

    public function valid() {
        return $this->c_index < $this->list->getCount();
    }

    public function key() {
        return $this->c_index;
    }

    public function current() {
        return $this->list->get($this->c_index);
    }

    public function next() {
        $this->c_index++;
    }
}

?>
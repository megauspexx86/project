<?php

namespace Vendor\Lib;

class CMenuItem {

    protected $parent;
    protected $title;
    protected $url;
    protected $visibility;
    protected $submenu = [];
    protected $active = false;

    public function __construct($title, $url, $parent = 0, $visibility = true) {
        $this->parent = $parent;
        $this->url = $url;
        $this->title = $title;
        $this->visibility = $visibility;
    }

    public function render() {
        return get_object_vars($this);
    }

    public function push(CMenuItem $element) {
        $this->submenu[] = $element->render();
    }

    public function getUrl() {
        return $this->url;
    }

    public function setActive($value) {
        $this->active = $value;
    }

    public function getParent() {
        return $this->parent;
    }
}

?>
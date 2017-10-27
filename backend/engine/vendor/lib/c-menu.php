<?php

namespace Vendor\Lib;

use Vendor\Core\Application;
use Vendor\Core\Error\Ex500;
use Vendor\Core\ObjectList;
use Vendor\Core\Utils;

class CMenu {

    protected $app;
    protected $name;
    protected $menu = [];

    public function __construct($name, $app) {
        $this->app = $app;
        $this->name = $name;
    }

    public function addItem(CMenuItem $item) {

        if($item->getParent() == "0") {
            return $this->menu[$item->getUrl()] = $item->render();
        }

        if(!isset($this->menu[$item->getParent()])) {
            throw new Ex500('Menu item not found');
        }

        //$item_handler = $this->app->getUrlMapper()->parseUrl($item->getUrl())->handler;
        //$current_handler = $this->app->getUrlMapper()->parseUrl($_SERVER['REQUEST_URI'])->handler;

        if($this->_isActive($item->getUrl())) {
            $item->setActive(true);
            $this->menu[$item->getParent()]['active'] = true;
        }

        $this->menu[$item->getParent()]['submenu'][] = $item->render();
    }

    public function render() {
        return $this->menu;
    }

    protected function _isActive($code) {

        if(preg_match("|$code|", $_SERVER['REQUEST_URI'], $matches)) {
            return $matches[0] == $_SERVER['REQUEST_URI'];
        }

        return false;
    }
}

?>
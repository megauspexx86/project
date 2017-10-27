<?php

namespace Vendor\Core;

class ProjectLocation extends HttpLocation {

    public function __construct($handler, $params = []) {
        $this->uri = Factory::getInstance('Application')->getUrlMapper()->getLink($handler, $params);
    }
}

?>
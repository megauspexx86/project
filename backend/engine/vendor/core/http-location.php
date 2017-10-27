<?php

namespace Vendor\Core;

class HttpLocation {

    protected $uri;

    public function __construct($uri) {
        $this->uri = $uri;
    }

    public function go() {
        header(sprintf("%s 301 Moved Permanently", $_SERVER['SERVER_PROTOCOL']));
        header("Location: " . $this->uri, 301);
        return $this;
    }

}

?>
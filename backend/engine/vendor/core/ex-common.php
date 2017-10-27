<?php

namespace Vendor\Core;

class ExCommon extends \Exception {

    public function __construct($code, $message = '') {
        parent::__construct($message, $code);
    }

}
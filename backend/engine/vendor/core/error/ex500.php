<?php

namespace Vendor\Core\Error;

use Vendor\Core\ExCommon;

class Ex500 extends ExCommon {

    public function __construct($message = 'Internal server error') {
        parent::__construct(500, $message);
    }
}
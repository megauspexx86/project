<?php

namespace Vendor\Core\Error;

use Vendor\Core\ExCommon;

class Ex404 extends ExCommon {

    public function __construct($message = 'Not found') {
        parent::__construct(404, $message);
    }
}
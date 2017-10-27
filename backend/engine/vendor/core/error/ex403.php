<?php

namespace Vendor\Core\Error;

use Vendor\Core\ExCommon;

class Ex403 extends ExCommon {

    public function __construct($message = 'Forbidden') {
        parent::__construct(403, $message);
    }
}
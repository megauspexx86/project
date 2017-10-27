<?php

namespace Vendor\Core\Error;

use Vendor\Core\ExCommon;

class Ex401 extends ExCommon {

    public function __construct($message = 'Unauthorized') {
        parent::__construct(401, $message);
    }
}
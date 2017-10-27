<?php

namespace Vendor\Core\Error;

use Vendor\Core\ExCommon;

class Ex400 extends ExCommon {

    protected $errors;

    public function __construct($errors) {
        $this->errors = $errors;
        parent::__construct(400, 'Bad request');
    }

    public function getErrors() {
        return $this->errors;
    }
}
<?php

namespace Vendor\Lib\Validator;

use Vendor\Core\ExCommon;

class ExValidateFails extends ExCommon {

    protected $errors;

    function __construct(array $errors) {
        $this->errors = $errors;
        parent::__construct(400, 'Bad request');
    }

    function hasErrors($field_name) {
        return isset($this->errors[$field_name]);
    }

    public function getErrors() {
        return $this->errors;
    }
}
<?php

namespace Vendor\Lib\Validator;

class CRuleValueIsSet implements IValidationRule {

    protected $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function validate(array $values) {
        if(!isset($values[$this->name])) {
            throw new ExValidateFails([$this->name => 'required']);
        }
    }

}
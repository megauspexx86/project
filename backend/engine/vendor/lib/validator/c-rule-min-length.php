<?php

namespace Vendor\Lib\Validator;

class CRuleMinLength extends CRuleValueIsSet implements IValidationRule {

    protected $min;

    function __construct($name, $min) {
        parent::__construct($name);
        $this->min = $min;
    }

    function validate(array $values) {
        parent::validate($values);
        $value = $values[$this->name];

        if(strlen($value) >= $this->min) {
            return;
        }

        throw new ExValidateFails(array($this->name => 'incorrect_length'), $this);
    }
}

?>
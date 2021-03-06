<?php

namespace Vendor\Lib\Validator;

class CRuleMaxLength extends CRuleValueIsSet implements IValidationRule {

    protected $max;

    function __construct($name, $max) {
        parent::__construct($name);
        $this->max = $max;
    }

    function validate(array $values) {
        parent::validate($values);
        $value = $values[$this->name];

        if(strlen($value) <= $this->max) {
            return;
        }

        throw new ExValidateFails(array($this->name => 'incorrect_length'), $this);
    }
}

?>
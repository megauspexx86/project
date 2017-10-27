<?php

namespace Vendor\Lib\Validator;

class CRuleNumberFormat implements IValidationRule {

    protected $name;
    protected $break_negative;

    function __construct($name, $break_negative = false) {
        $this->name = $name;
        $this->break_negative = $break_negative;
    }

    function validate(array $values) {
        $value = $values[$this->name];

        if(mb_strlen($value) == 0) {
            return true;
        }

        if(!is_numeric($value) || ($this->break_negative == true && $value < 0)) {
            throw new ExValidateFails(array($this->name => 'number'), $this);
        }
    }
}

?>
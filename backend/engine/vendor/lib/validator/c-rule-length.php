<?php

namespace Vendor\Lib\Validator;

class CRuleLength extends CRuleValueIsSet implements IValidationRule {

    protected $length;

    function __construct($name, $length) {
        parent::__construct($name);
        $this->length = $length;
    }

    function validate(array $values) {
        parent::validate($values);
        $value = $values[$this->name];

        if(strlen($value) == $this->length) {
            return;
        }

        throw new ExValidateFails(array($this->name => 'incorrect_length'), $this);
    }
}

?>
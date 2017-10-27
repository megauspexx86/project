<?php

namespace Vendor\Lib\Validator;

class CRuleEmail extends CRuleValueIsSet implements IValidationRule {

    protected $required;

    public function __construct($name, $required = true) {
        $this->required = $required;
        parent::__construct($name);
    }

    function validate(array $values) {

        parent::validate($values);

        $value = $values[$this->name];

        if(empty($value) && !$this->required) {
            return true;
        }

        if(!preg_match("/^[a-z_0-9\-\.]+@[a-z_0-9\-\.]+\.[a-z]{2,6}$/i", $value)) {
            throw new ExValidateFails([$this->name => 'email']);
        }
    }
}
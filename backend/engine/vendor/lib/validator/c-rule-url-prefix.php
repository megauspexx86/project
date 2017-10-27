<?php

namespace Vendor\Lib\Validator;

class CRuleUrlPrefix extends CRuleValueIsSet implements IValidationRule {

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
        if(preg_match("/(?:https?:\/\/)(?:[a-zA-Z0-9.-]+?\.(?:[a-zA-Z])|\d+\.\d+\.\d+\.\d+)/", $value)) {
            throw new ExValidateFails([$this->name => 'url']);
        }
    }
}
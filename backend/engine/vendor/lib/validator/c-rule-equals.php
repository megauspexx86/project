<?php

namespace Vendor\Lib\Validator;


class CRuleEquals extends CRuleValueIsSet implements IValidationRule {

    protected $name2;

    function __construct($name, $name2) {
        parent::__construct($name);
        $this->name2 = $name2;
    }

    function validate(array $values) {

        parent::validate($values);

        $value = $values[$this->name];

        if(!isset($values[$this->name2])) {
            throw new ExValidateFails(array($this->name2 => 'required'));
        }

        $value2 = $values[$this->name2];

        if(empty($value) || empty($value2)){
            return true;
        }

        if($value !== $value2) {
            throw new ExValidateFails(
                array(
                    $this->name => 'equals',
                    $this->name2 => 'equals'
                ));
        }
    }
}
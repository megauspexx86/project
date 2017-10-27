<?php

namespace Vendor\Lib\Validator;

class CRuleValueInRange extends CRuleValueIsSet implements IValidationRule {
    protected $min;
    protected $max;

    function __construct($name, $min = null, $max = null) {
        parent::__construct($name);
        $this->min = $min;
        $this->max = $max;
    }

    function validate(array $values) {
        parent::validate($values);
        $value = $values[$this->name];

        $validated_min = $this->min !== null ? $value >= $this->min : true;
        $validated_max = $this->max !== null ? $value <= $this->max : true;

        if($validated_min && $validated_max) {
            return;
        }

        throw new ExValidateFails(array($this->name => 'range'), $this);
    }
}
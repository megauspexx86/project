<?php

namespace Vendor\Lib\Validator;


class CRuleDate extends CRuleValueIsSet implements IValidationRule {

    protected $name2;
    protected $min_date;
    protected $max_date;

    function __construct($name, $min_date = null, $max_date = null) {

        parent::__construct($name);

        $this->min_date = $min_date;
        $this->max_date = $max_date;
    }

    function validate(array $values) {

        parent::validate($values);

        $value = new \DateTime($values[$this->name]);

        $min = (new \DateTime())->setTimestamp($this->min_date)->setTime(0, 0)->getTimestamp();
        $max = (new \DateTime())->setTimestamp($this->max_date)->setTime(23, 59, 59)->getTimestamp();

        if($value->getTimestamp() >= $min && $value->getTimestamp() <= $max) {
            return true;
        }

        throw new ExValidateFails([$this->name => 'incorrect_date']);
    }
}
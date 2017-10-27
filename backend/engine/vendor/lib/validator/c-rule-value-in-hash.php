<?php

namespace Vendor\Lib\Validator;

class CRuleValueInHash extends CRuleValueIsSet implements IValidationRule {

    protected $hash;
    protected $lookup_by_value;

    function __construct($name, $hash, $lookup_by_value = true) {
        parent::__construct($name);
        $this->hash = $hash;
        $this->lookup_by_value = $lookup_by_value;
    }

    function validate(array $values) {

        parent::validate($values);

        $value = $values[$this->name];
        if(is_array($value)) {
            foreach($value as $vv) {
                foreach($this->hash as $k => $v) {
                    if($this->lookup_by_value) {
                        if($v == $vv) {
                            return;
                        }
                    }
                    else {
                        if($k == $vv) {
                            return;
                        }
                    }
                }
                throw new ExValidateFails(array($this->name => 'illegal'), $this);
            }
        } else {
            foreach($this->hash as $k => $v) {
                if($this->lookup_by_value) {
                    if($v == $value) {
                        return;
                    }
                }
                else {
                    if($k == $value) {
                        return;
                    }
                }
            }
        }

        throw new ExValidateFails(array($this->name => 'illegal'), $this);
    }
}

?>
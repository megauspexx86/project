<?php

namespace Vendor\Lib\Validator;

class CRuleNotEmptyValueByKey extends CRuleValueIsSet implements IValidationRule {

    protected $key;
    protected $hash;

    function __construct($key, $hash) {
        parent::__construct($key);
        
        $this->key = $key;
        $this->hash = $hash;

    }

    function validate(array $values) {

        if(!is_array($this->hash) || !array_key_exists($this->key, $this->hash) || empty($this->hash[$this->key])) {
            throw new ExValidateFails([$this->key => 'empty']);
        }
        
    }
}

?>
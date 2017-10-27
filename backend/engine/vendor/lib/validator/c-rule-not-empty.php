<?php

namespace Vendor\Lib\Validator;

class CRuleNotEmpty extends CRuleValueIsSet implements IValidationRule {

    protected $min;
    protected $max;

    function __construct($name, $min = 0, $max = 0) {
        parent::__construct($name);
        $this->min = $min;
        $this->max = $max;
    }

    function validate(array $values) {

        parent::validate($values);

        $value = $values[$this->name];

        if(is_array($value)) {
            return $this->__arrayValidate($value);
        }

        if(!$this->__stringValidate($value)) {
            throw new ExValidateFails([$this->name => 'required']);
        }

    }

    /**
     * Проверка чтобы был заполнен каждый элемент массива
     * @param $values
     * @return bool
     * @throws ExValidateFails
     */
    protected function __arrayValidate($values) {

        $indexes = [];

        foreach ($values as $key => $value) {
            if(!$this->__stringValidate($value)) {
                $indexes[] = $key;
            }
        }

        if(!empty($indexes)) {
            throw new ExValidateFails([$this->name => $indexes]);
        }

        return true;
    }

    /**
     * Проверка строкового значения
     * @param $value
     * @throws ExValidateFails
     * @return bool
     */
    protected function __stringValidate($value) {

        $value = trim($value);

        if(empty($value) && $value !== '0') {
            return false;
        }

        if(($this->min > 0 && mb_strlen($value, 'utf-8') < $this->min) || ($this->max > 0 && mb_strlen($value, 'utf-8') > $this->max)) {
            return false;
        }

        return true;
    }
}

?>
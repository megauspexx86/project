<?php

namespace Vendor\Lib\Validator;

class CRuleObjectExists implements IValidationRule {

    protected $name;
    protected $model;
    protected $criteria;

    function __construct($name, $model, $criteria, $key = ':id') {
        $this->name = $name;
        $this->model = $model;
        $this->criteria = $criteria;
        $this->placeholder = $key;
    }

    public function validate(array $values) {

        $params = [$this->placeholder => $values[$this->name]];

        eval("\$list = $this->model::find(\$this->criteria, \$params);");

        if($list->getCount() == 0) {
            throw new ExValidateFails(array($this->name => 'nodata'), $this);
        }
    }
}

?>
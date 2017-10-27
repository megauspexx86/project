<?php

namespace Vendor\Lib\Validator;

use Vendor\Core\Db\DbBridge;

class CRuleNotUnique implements IValidationRule {
    protected $name;
    protected $table_name;

    function __construct($name, $table_name) {
        $this->name = $name;
        $this->table_name = $table_name;
    }

    function validate(array $values) {
        $value = $values[$this->name];

        $db = DbBridge::getInstance();
        $res = $db->query("SELECT $this->name FROM $this->table_name WHERE $this->name IS NOT NULL AND $this->name=? LIMIT 1", array($value))->fetchRow();
        if( !empty($res) ){
            throw new ExValidateFails(array($this->name => 'unique'), $this);
        }
    }
}

?>
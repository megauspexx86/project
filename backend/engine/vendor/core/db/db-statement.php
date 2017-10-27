<?php

namespace Vendor\Core\Db;

use Vendor\Core\Db\Drivers;

class DbStatement {
	protected $db;
	protected $sql;
	protected $params;
	
	public function __construct(DbBridge $db, $sql, $params = array()) {
		$this->db = $db;
		$this->sql = $sql;
		$this->params = $params === null ? array() : $params;
		$this->fixArrayParams();
	}

    protected function fixArrayParams() {

        foreach($this->params as $key => $value) {
            if(is_array($value)) {

                $criteria = array();

                foreach($value as $index => $final_value) {
                    $kk = $key . $index;
                    $criteria[] = $kk;
                    $this->params[$kk] = $final_value;
                }

                $this->sql = str_replace($key, join(", ", $criteria), $this->sql);
                unset($this->params[$key]);
            }
        }
    }
	
	public function sql() {
		return $this->sql;
	}
	
	public function params() {
		return $this->params;
	}
	
	protected function escape($value) {
		return $this->db->escape($value);
	}
}


?>
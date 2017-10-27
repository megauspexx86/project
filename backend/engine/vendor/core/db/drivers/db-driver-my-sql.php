<?php

namespace Vendor\Core\Db\Drivers;

use Vendor\Core\Db\DbBridge;

class DbDriverMySql extends DbDriverPdo {

	public function __construct(DbBridge $bridge) {
		parent::__construct($bridge);
		$this->query("SET NAMES utf8");
		$this->query("SET CHARACTER SET utf8");
	}
	
	protected function setupPdo() {
		$host = $this->bridge->getHostname();
		$dbname = $this->bridge->getDatabaseName();
		$user = $this->bridge->getUsername();
		$password = $this->bridge->getPassword();
		return new \PDO("mysql:host=$host;dbname=$dbname", $user, $password, [\PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true]);
	}
	
	public function lastInsertId() {
		return $this->pdo->lastInsertId();
	}
	
	protected function analyseErrorCode($error_code) {
		if($error_code == 23000) {
			return 'ExDb';
		}
		return parent::analyseErrorCode($error_code);
	}
	
	public function loadListTables() {
		$rs = $this->query("SHOW TABLES");
		$tables = array();
		while($table_name = $rs->fetchColumn()) {
			$tables[$table_name] = $table_name;
		}
		return $tables;
	}
	
	public function dropTable($table_name) {
		$this->query("DROP TABLE $table_name");
	}
	
	public function replace($table_name, $hash) {
		$columns = array_keys($hash);
		$values = array_fill(0, sizeof($hash), '?');
		
		$sql = "REPLACE INTO $table_name (".join(', ', $columns).") VALUES (".join(', ', $values).")";
		$result = $this->query($sql, array_values($hash));
		return $this->lastInsertId();
	}
}


?>
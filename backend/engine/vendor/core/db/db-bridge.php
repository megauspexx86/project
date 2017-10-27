<?php

namespace Vendor\Core\Db;

use Vendor\Core\Db\Drivers\DbDriverMySql;
use Vendor\Core\Log;

class DbBridge {
	
	protected $database;
	protected $username;
	protected $hostname;
	protected $password;
	
	protected $sql = "";
	protected $sql_params = array();

    static protected $instance;
	
	/**
	 * @var DbDriver
	 */
	protected $driver;
	
	protected function __construct() {

        $this->database = DB_NAME;
        $this->username = DB_USER;
        $this->hostname = DB_HOST;
        $this->password = DB_PASSWORD;

        $this->driver = new DbDriverMySql($this);
	}

    final private function __clone() {}
	
	/**
	 * @param string $section
	 * @return DbBridge
	 */
	public static function getInstance() {

        if(is_null(self::$instance)) {
            self::$instance = new DbBridge();
        }

        return self::$instance;
	}
	
	public function getDatabaseName() {
		return $this->database;
	}
	
	public function getUsername() {
		return $this->username;
	}
	
	public function getHostname() {
		return $this->hostname;
	}
	
	public function getPassword() {
		return $this->password;
	}
	
	/**
	 * @param string $sql
	 * @param array $params
	 * @return DbResultSet
	 */
	public function query($sql, $params = array()) {

        $q = new DbStatement($this, $sql, $params);

		$this->sql = $q->sql();
		$this->sql_params = $q->params();

		return $this->driver->query($q->sql(), $q->params());
	}
	
	public function insert($table_name, $hash) {
		$columns = array_keys($hash);
		$values = array_fill(0, sizeof($hash), '?');
		
		$sql = "INSERT INTO $table_name (".join(', ', $columns).") VALUES (".join(', ', $values).")";

		$this->sql = $sql;
		$this->sql_params = array_values($hash);
		
		$result = $this->driver->query($sql, array_values($hash));
		return $this->driver->lastInsertId();
	}
	
	public function replace($table_name, $hash) {
		$this->driver->replace($table_name, $hash);
	}
	
	public function getSql() {
		return $this->sql;
	}
	
	public function getSqlParams() {
		return $this->sql_params;
	}
	
	public function startTransaction() {
		$this->driver->query("START TRANSACTION;");
	}
	
	public function commit() {
		$this->driver->query("COMMIT;");
	}
	
	public function rollback() {

		$this->driver->query("ROLLBACK;");

        $log = new Log('rollback.log');
        $log->log(['server' => [
            'HTTP_REFERER' => $_SERVER['HTTP_REFERER'],
            'HTTP_HOST' => $_SERVER['HTTP_HOST'],
            'REMOTE_ADDR' => $_SERVER['REMOTE_ADDR'],
            'REQUEST_URI' => $_SERVER['REQUEST_URI']
        ], 'request' => $_REQUEST]);

    }

	/**
	 * Builds and executes UPDATE query
	 *
	 * @param string $table_name
	 * @param array $hash
	 * @param string $where
	 * @param array $ignore_keys_list
	 * @return void
	 */
	public function update($table_name, $hash, $where, $ignore_keys_list = array()) {
		
		$columns = array();
		
		foreach($hash as $column => $value) {
			if(!in_array($column, $ignore_keys_list)) {
				$columns[] = "$column = :$column";
			}
			unset($hash[$column]);
			$hash[":$column"] = $value;
		}
		
		$sql = "UPDATE $table_name SET ".join(", ", $columns)." WHERE $where";
		
		$this->sql = $sql;
		$this->sql_params = $hash;
		
		$result = $this->driver->query($sql, $hash);
	}
	
	public function isTableExists($table_name) {
		$tables = $this->driver->loadListTables();
		return isset($tables[$table_name]);
	}
	
	public function dropTable($table_name) {
		$this->driver->dropTable($table_name);
	}

	public function escape($string) {
		if($string === null) {
			return "NULL";
		}
		if(is_array($string)) {
			$result = array();
			foreach($string as $k => $value) {
				if(!is_numeric($string)) $result[$k] = $this->escape($value);
			}
			return $result;
		} else {
			if(!is_numeric($string)){
				$string = stripslashes($string);
				$string = $this->driver->escape($string);
			}
			return $string;
		}
	}
}
?>
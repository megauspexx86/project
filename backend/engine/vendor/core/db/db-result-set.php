<?php

namespace Vendor\Core\Db;

class DbResultSet {

	/**
	 * @var \PDOStatement
	 */
	protected $statement;
	
	public function __construct(\PDOStatement $statement) {
		$this->statement = $statement;
	}
		
	public function fetchRow() {
		return $this->statement->fetch();
	}
	
	public function fetchHash() {
		return $this->statement->fetch(\PDO::FETCH_ASSOC);
	}
	
	public function rowCount() {
		return $this->statement->rowCount();
	}
	
	public function fetchColumn($index = 0) {
		return $this->statement->fetchColumn($index);
	}

	public function fetchAll() {
		return $this->statement->fetchAll(\PDO::FETCH_ASSOC);
	}
}

?>
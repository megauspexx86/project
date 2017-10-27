<?php


namespace Vendor\Core\Db;

/**
 * Abstract DB driver class, descendant classes must override query() method.
 * 
 * @abstract
 */

abstract class DbDriver {
	/**
	 * Reference to DbBridge class instance
	 * @var DbBridge
	 */
	protected $bridge;
	
	public function __construct(DbBridge $bridge) {
		$this->bridge = &$bridge;
	}
	
	/**
	 * Abstract method for running SQL query. Must be overriden in 
	 * descendant classes.
	 * 
	 * @abstract
	 * @param string $sql
	 * @param array $params
	 * @return DbResultSet
	 */
	abstract public function query($sql, $params = null);
}


?>
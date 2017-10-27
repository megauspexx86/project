<?php

namespace Vendor\Core\Db\Drivers;

use Vendor\Core\Db\DbBridge;
use Vendor\Core\Db\DbDriver;
use Vendor\Core\Db\DbResultSet;
use Vendor\Core\ExCommon;

abstract class DbDriverPdo extends DbDriver {
	/**
	 * @var \PDO
	 */
	protected $pdo;

	public function __construct(DbBridge $bridge) {
		parent::__construct($bridge);
		$this->pdo = $this->setupPdo();
	}
	
	/**
	 * @param string $sql
	 * @param array $params
	 * @return DbResultSet
	 */
	public function query($sql, $params = array()) {

		$sth = $this->pdo->prepare($sql, array(\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY));

		if($sth == false) {
			throw new ExCommon(500, $this->pdo->errorInfo()[2]);
		}

        foreach ($params as $field => $value) {

            $key = is_integer($field) ? intval($field + 1) : $field;

            if(in_array($key, [':offset', ':limit'])) {
                $sth->bindValue($field, intval($value), \PDO::PARAM_INT);
            } else {
                $sth->bindValue($key, $value, \PDO::PARAM_STR);
            }
        }

        if($sth->execute() == false) {
            throw new ExCommon(500, $sth->errorInfo()[2]);
		}

		return new DbResultSet($sth);
	}
	
	protected function analyseErrorCode($error_code) {
		return 'ExDb';
	}
	
	abstract protected function setupPdo();
	
	public function escape($string) {
		return $this->pdo->quote($string);
	}
}


?>
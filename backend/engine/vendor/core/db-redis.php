<?php

namespace Vendor\Core;

/**
 * Class DbRedis
 * @package Vendor\Core
 */
class DbRedis {

    /**
     * @var Redis
     */
    protected $connection;

    /**
     * DbRedis constructor.
     * @param string $section
     * @throws ExCommon
     */
    protected function __construct($section = 'database') {

        $this->connection = new \Redis();

        $config = ProjectConfig::getInstance()->getKey('redis');

        if(!$this->connection->connect($config['host'], $config['port'])) {
            throw new ExCommon(__CLASS__, $this->connection->getLastError());
        }

        if(!$this->connection->auth($config['password'])) {
            throw new ExCommon(__CLASS__, "Invalid redis password");
        }
    }

    /**
     * Получает значение
     * @param $key
     */
    public function get($key) {
        return $this->connection->get($key);
    }

    /**
     *
     * Устанавливает значение
     *
     * @param $key
     * @param $value
     * @return bool
     */
    public function set($key, $value) {
        return $this->connection->set($key, $value);
    }

    public function push($key, $value) {
        if(!$this->connection->rPush($key, $value)) {
            throw new ExCommon(__CLASS__, $this->connection->getLastError());
        }
    }

    public function range($key, $offset = 0, $limit = -1) {
        return $this->connection->lRange($key, $offset, $limit);
    }

    public function flushall() {
        return $this->connection->flushAll();
    }

    public function delete($key) {
        $this->connection->delete($key);
    }

    /**
     * Удаляет значение $value из множества $key
     * @param $key
     * @param $value
     */
    public function removeFromRange($key, $value) {
        $this->connection->lRem($key, $value, 1);
    }

    /**
     * @param string $section
     * @return DbRedis
     */
    static public function getInstance($section = 'database') {

        $key = self::getFactoryKey($section);

        if(Factory::hasInstance($key) == false) {
            Factory::setInstance(new DbRedis($section), $key);
        }

        return Factory::getInstance(__CLASS__, $key);
    }

    protected static function getFactoryKey($section) {
        return __CLASS__ . '.' . $section;
    }
}

?>
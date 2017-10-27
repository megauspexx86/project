<?php
namespace Vendor\Core\Db;

class DbCriteria {

    public $table;
    public $join = [];
    public $fields = "*";
    public $where;
    public $offset;
    public $groupby;
    public $orderby;
    public $limit;
    public $count;

    public function __construct($params = array()) {

        foreach($params as $statement => $value) {
            if(property_exists($this, $statement)){
                $this->$statement = $value;
            }
        }
    }

    /**
     * Запрос на выборку
     * @return string
     */
    public function sql() {

        $j = implode(" ", $this->join);
        $c = $this->count ? 'SQL_CALC_FOUND_ROWS' : '';
        $w = $this->where ? "WHERE " . $this->where : '';
        $o = $this->orderby ? "ORDER BY " . $this->orderby : '';
        $l = $this->limit ? "LIMIT " . ($this->offset ? $this->offset . ", " . $this->limit : $this->limit) : '';
        $g = $this->groupby ? "GROUP BY " . $this->groupby : '';

      return sprintf("SELECT %s %s FROM %s %s %s %s %s %s", $c, $this->fields, $this->table, $j, $w, $g, $o, $l);
    }

    /**
     * Запрос на количество
     * @return string
     */
    public function countSql() {

        $j = implode(" ", $this->join);
        $w = $this->where ? "WHERE " . $this->where : '';
        $l = $this->limit ? "LIMIT " . ($this->offset ? $this->offset . ", " . $this->limit : $this->limit) : '';
        $g = $this->groupby ? "GROUP BY " . $this->groupby : '';

      return sprintf("SELECT COUNT(%s.id) AS cnt FROM %s %s %s %s %s", $this->table, $this->table, $j, $w, $g, $l);
    }
}
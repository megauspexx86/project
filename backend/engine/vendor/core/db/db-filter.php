<?php

namespace Vendor\Core\Db;

class DbFilter {

    protected $criteria = array();
    protected $params = array();


    public function addEqualCondition($fieldname, $value) {
        $this->criteria[] = !empty($fieldname) ? "$fieldname = :$fieldname" : "1";
        $this->params[':' . $fieldname] = $value;
    }

    public function addEqualsByHash($hash) {

        foreach ($hash as $field => $value) {
            if(!empty($value)) {
                $this->addEqualCondition($field, $value);
            }
        }
    }

    public function addLikeCondition($fieldname, $value) {
        $this->criteria[] = "$fieldname LIKE :$fieldname";
        $this->params[':' . $fieldname] = $value;
    }

    public function addNotNULL($field) {
        $this->criteria[] = "!ISNULL($field)";
    }

    public function addNotEqualCondition($fieldname, $value) {
        $this->criteria[] = !empty($fieldname) ? "$fieldname <> :$fieldname" : "1";
        $this->params[':' . $fieldname] = $value;
    }

    public function addInCondition($fieldname, array $values) {
        $this->criteria[] = "$fieldname IN (:$fieldname)";
        $this->params[':' . $fieldname] = $values;
    }

    public function addMoreCondition($fieldname, $value) {
        $this->criteria[] = "$fieldname >= :$fieldname";
        $this->params[':' . $fieldname] = $value;
    }

    public function addLessCondition($fieldname, $value) {
        $this->criteria[] = "$fieldname <= :$fieldname";
        $this->params[':' . $fieldname] = $value;
    }

    public function addFulltextCondition($fieldname, $value) {

        if(is_array($fieldname)) {
            $fieldname = join(', ', $fieldname);
        }

        $this->criteria[] = "MATCH($fieldname) AGAINST(:$fieldname)";
        $this->params[':' . $fieldname] = $value;
    }

    public function addCriteria($criteria, $values = null) {

        $this->criteria[] = $criteria;

        foreach ($values as $field => $value) {
            $this->params[$field] = $value;
        }

    }

    public function addNullCriteria($field) {
        $this->criteria[] = "ISNULL($field)";
    }

    public function addParams($params) {
        $this->params[] = $params;
    }

    public function addNotNullCriteria($field) {
        $this->criteria[] = "!ISNULL($field)";
    }

    public function getCriteria() {
        return join(" AND ", $this->criteria);
    }

    public function getParams() {
        return $this->params;
    }

}
<?php

namespace Vendor\Lib;

use Vendor\Core\Error\Ex500;
use Vendor\Core\Request;

class RecordPaging {

    protected $limit;
    protected $offset;
    protected $cnt;
    protected $page;

    public function __construct($limit = null, $request = 'page') {

        if(!$limit) {
            $limit = 10;
        }

        $this->page = intval(Request::getQueryVar($request, 1));

        $this->limit = abs($limit);
        $this->offset = abs(($this->page - 1) * $this->limit);
    }

    public function cnt($value) {

        $this->cnt = $value;

        return [
            'page' => $this->page,
            'pages' => $this->cnt ? ceil($this->cnt / $this->limit) : 0
        ];
    }

    public function render() {

    }

    /**
     * Определяется для того, чтобы можно было получить $limit и $offset извне
     * @param $name
     * @return mixed
     * @throws Ex500
     */
    public function __get($name) {

        if(!property_exists($this, $name)) {
            throw new Ex500(sprintf("%s. Can't get %s property.", __CLASS__, $name));
        }

        return $this->$name;
    }

}
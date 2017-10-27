<?php

namespace SDK\Statistic;

use Vendor\Core\ObjectList;

class StatisticList extends ObjectList {

    public function in($id) {

        foreach ($this->list as $object) {
            if($object->id == $id) {
                return $object;
            }
        }

        return null;
    }

    /**
     * @param $name
     * @return array
     */
    public function __get($name) {

        $result = [];

        foreach ($this->list as $object) {
            $result[] = $object->$name;
        }

        return $result;

    }

}
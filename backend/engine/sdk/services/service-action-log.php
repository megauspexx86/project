<?php

namespace SDK\Services;

use SDK\Objects\CActionLog;

class ServiceActionLog {

    /**
     * Логируемое действие
     * @var String
     */
    protected $__action;

    public function __construct($action) {
        $this->__action = $action;
    }

    /**
     * Логирование
     * @param $owner_id
     * @param $object_id
     */
    public function log($owner_id, $object_id) {

        $log = new CActionLog();
        $log->action = $this->__action;
        $log->owner_id = $owner_id;
        $log->object_id = $object_id;
        $log->save();
    }

}
<?php

namespace Vendor\Core;

class JsonView extends View {

    public function __construct() {
        $this->addObject('status', 'OK');
    }

    public function setError(\Exception $e) {
        $this->addObject('status', "ERROR");
        $this->addObject('code', $e->getCode());
        $this->addObject('message', $e->getMessage());
    }

    public function getContentType() {
        return 'application/json';
    }

    public function __toString() {
       return json_encode($this->objects);
    }

}
?>
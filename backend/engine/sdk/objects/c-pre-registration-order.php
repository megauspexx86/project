<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecordExtended;

class CPreRegistrationOrder extends ActiveRecordExtended {

    public function __set($name, $value) {

        if($name == "data") {
            $value = json_encode($value);
        }

        parent::__set($name, $value);
    }

    public function __get($name) {

        if($name == "data") {
            return json_decode(parent::__get($name));
        }

        return parent::__get($name);
    }

    static public function model() {
        return [
            'owner_id' => null, 'data' => null
        ];
    }

	static protected function dbTable() {
		return 'pre_registration_order';
	}
}

?>
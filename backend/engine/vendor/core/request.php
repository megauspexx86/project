<?php

namespace Vendor\Core;

class Request {
	
	static public function getQueryVars($variables = null) {

        if($variables == null) {
			return $_REQUEST;
		}
		
		$list = array();

        foreach($variables as $k => $name) {
			$source_name =  is_numeric($k) ? $name : $k;
			$list[$name] = isset($_REQUEST[$source_name]) ? $_REQUEST[$source_name] : null;
		}

		return $list;
	}

    static public function hasKey($key) {
        return isset($_REQUEST[$key]);
    }

	static public function getQueryVar($variable, $default = null) {
		return isset($_REQUEST[$variable]) ? $_REQUEST[$variable] : $default;
	}

	static public function getAll($skip = []) {

        $list = [];
		foreach($_REQUEST as $key => $value) {
			if(!in_array($key, $skip)) {
                $list[$key] = $value;
            }
		}

        return $list;
	}
}

?>
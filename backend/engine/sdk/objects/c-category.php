<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CCategory extends ActiveRecord {


	static protected function model() {

		return [
			'name' => null
		];

	}


	static protected function dbTable() {
		return 'category';
	}



}

?>
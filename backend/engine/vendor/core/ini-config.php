<?php

namespace Vendor\Core;

use Vendor\Core\Error\Ex500;

class IniConfig {
	
	/**
	 * Constructor checks filename for existing and tries to read ini-config to object instance.
	 * Throws ExIo if specified file not exists or cannot be read.
	 * 
	 * @param string $ini_file
	 * @throws ExCommon
	 */
	function __construct($ini_file) {
		if($ini_file) {
			if(file_exists($ini_file) == false) {
				throw new Ex500(sprintf('File %s not found', $ini_file));
			}
			$this->keys = parse_ini_file($ini_file, true);
		}
	}
	
	public function getKeys() {
		return $this->keys;
	}

	/**
	 * Seeks parameter value specified by $index and optional $section.
	 * Throws ExObjectNotFound in case when parameter is not found.
	 *
	 * @param string $index
	 * @param string $section
	 * @return string
	 * @throws ExCommon
	 */
	public function getKey($index, $section = null) {

        if($section !== null) {

            if(!isset($this->keys[$section]) || !isset($this->keys[$section][$index])) {
                throw new ExCommon(500, sprintf('Config error: %s.%s not found', $section, $index));
			}

			return $this->keys[$section][$index];
		}

		if(!isset($this->keys[$index])) {
            throw new ExCommon(500, sprintf('Config error: %s not found', $index));
		}

		return $this->keys[$index];
	}
}


?>
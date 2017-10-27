<?php

namespace Vendor\Lib;

class RandomGenerator {

	/**
	 * Generates password string with specified string length (number of chars)
	 *
	 * @param integer $length
	 * @return string
	 */
	static public function makePassword($length) {
		$chars = array_merge(range('a', 'z'), range('0', '9'), range('A', 'Z'));
		$charsLastIndex = sizeof($chars)-1;
		$password = "";
		for($i = 0; $i < $length; $i++) {
			$password .= $chars[rand(0, $charsLastIndex)];
		}
		return $password;
	}
	
	/**
	 * Generates random integer value in range from $low to $high
	 *
	 * @param integer $low
	 * @param integer $high
	 * @return integer
	 */
	static public function makeRandom($low, $high) {
		return rand($low, $high);
	}

    /**
     * Получает случайный элемент массива
     * @param array $data
     * @return mixed
     */
	static public function randomElement(array $data) {
        return $data[self::makeRandom(0, sizeof($data) - 1)];
    }
	
	/**
	 * Generate and create temporary folder with unique 32-chars name.
	 * 
	 * @param string $basepath
	 * @param string $prefix
	 * @return string
	 */
	static public function makeTmpFolder($basepath, $prefix = '') {
		while(1) {
			$folder_name = self::makePassword(32 - strlen($prefix));
			if(file_exists($basepath.'/'.$prefix.$folder_name)) {
				continue;
			}
			mkdir($basepath.'/'.$prefix.$folder_name);
			chmod($basepath.'/'.$prefix.$folder_name, 0777);
			return $prefix.$folder_name;
		}
	}
}

?>
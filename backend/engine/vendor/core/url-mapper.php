<?php

namespace Vendor\Core;

class UrlMapper {

	protected $rules = [];

	public function addRule($code, $module, $command) {
		$this->rules[$code] = ['module' => $module, 'command' => $command];
	}

	/**
	 * @param string $url
	 * @return Command
	 */
	public function parseUrl($url) {

		if((($pos = strpos($url, "?")) !== false) || (($pos = strpos($url, "#")) !== false)) {
			$url = substr($url, 0, $pos);
		}

		foreach($this->rules as $code => $event) {

			if(preg_match("|$code|", $url, $matches)) {
				return new Command($event, $matches);
			}
		}

		throw new ExCommon(404, 'Not found');
	}

	public function getLink($handler, $params = []) {

		$url_pattern = $this->_url($handler);


		if(!$url_pattern) {
			throw new ExCommon(0, 'Undefined url');
		}

		$unused_params = $params;

		if($params) {
			if(preg_match_all("/\(\?P?<(.+?)>.*?\)/", $url_pattern, $matches)) {

				foreach($matches[0] as $k => $pattern) {
					if(isset($params[$matches[1][$k]])) {
						$url_pattern = str_replace($pattern, $params[$matches[1][$k]], $url_pattern);
						unset($unused_params[$matches[1][$k]]);
					} else {
						$url_pattern = str_replace($pattern, "", $url_pattern);
					}
				}
				$url_pattern = str_replace(array("^", "$", "\\"), "", $url_pattern);
			}
		}

		$url_pattern = preg_replace("/\(\?P?<(.+?)>.*?\)/",'', $url_pattern);
		$url_pattern = str_replace(array("^", "$", "\\"), "", $url_pattern);

		if(!empty($unused_params)) {
			$url_pattern = $url_pattern . '?' . urldecode(http_build_query($unused_params));
			$url_pattern = str_replace("??", "?", $url_pattern);
		}

		return $url_pattern;

	}

    protected function _url($handler) {

        foreach($this->rules as $code => $event) {
            $e = $event['module'].'.'.$event['command'];
            if($e == $handler) {
                return $code;
            }
        }

        return false;

    }

}


?>
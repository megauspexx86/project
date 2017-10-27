<?php

namespace Vendor\Core;

class Response {

    protected $content_type;
	protected $charset;
	protected $headers;
	protected $cookies;
    protected $objects = [];

    /**
     * @var View
     */
	protected $content;

	/**
	 * @param string $key
	 * @return Response
	 */
	static public function getInstance() {
		return Factory::getInstance(__CLASS__);
	}

	public function setContentType($content_type, $charset = null) {
		$this->content_type = $content_type;
		$this->charset = $charset;
	}
	
	public function getContentType() {
		return $this->content_type . ($this->charset == null ? '' : '; charset='.$this->charset);
	}
	
	public function setContent(View $view) {
		$this->content = $view;
	}
	
	public function getContent() {
		return $this->content;
	}
	
	public function addHeader($header) {
		if(!empty($header)) {
			$this->headers[] = $header;
		}
	}
	
	public function addCookie($cookieName, $cookieValue, $ttl = null, $domain = null) {
		if(empty($cookieName)) {
			return false;
		}
		
		$this->cookies[$cookieName] = array(
			'name' => $cookieName,
			'value' => $cookieValue,
			'ttl' => $ttl,
			'domain' => $domain
		);
		return true;
	}

    public function addObject($name, $object) {
        $this->objects[$name] = $object;
    }
	
	public function getCookie($cookieName) {
		return isset($this->cookies[$cookieName]) ? $this->cookies[$cookieName] : false;
	}
	
	public function flush() {

		if((headers_sent() == false) && ($this->getContentType() != '')) {
			header("Content-type: ".$this->getContentType());
		}
		
		if(!empty($this->headers)) {
			foreach ($this->headers as $header) {
				header($header);
			}
		}
		
		if(!empty($this->cookies)) {
			foreach ($this->cookies as $cookieData) {
				setcookie($cookieData['name'], $cookieData['value'], $cookieData['ttl'], '/', $cookieData['domain']);
			}
		}

        foreach($this->objects as $name => $object) {
            $this->content->addObject($name, $object);
        }

		print $this->content;

		$this->clear();
	}
	
	public function clear() {
		$this->content_type = '';
		$this->charset = '';
		$this->headers = null;
		$this->content = null;
		$this->cookies = null;
	}
}




?>
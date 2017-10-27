<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

require_once('./configure.php');

\Vendor\Core\Session::getInstance();

(new \App\Application())->run(urldecode($_SERVER['REQUEST_URI']));

?>
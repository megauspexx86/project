<?php

define('BASE_DIR', dirname(__FILE__));

$env = require_once ('common/configure.php');

$project_config = [
    'base_url' => \Vendor\Core\ProjectConfig::getInstance()->getKey('settings', 'partner_url')
];

\Vendor\Core\ProjectConfig::getInstance()->merge($project_config);


?>


<?php

define('BASE_DIR', dirname(__FILE__));
define('PARTNER_COMPONENT_TEMPLATE_DIR', BASE_DIR . '/static/components');

$env = require_once ('common/configure.php');

$project_config = [
    'base_url' => \Vendor\Core\ProjectConfig::getInstance()->getKey('settings', 'partner_url')
];

\Vendor\Core\ProjectConfig::getInstance()->merge($project_config);


?>


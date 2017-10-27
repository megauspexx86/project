<?php

define('ENV_DIR', dirname(__FILE__) . '/env');

$env = json_decode(file_get_contents(ENV_DIR . '/env.json'));

$base_config = require_once (sprintf(dirname(__FILE__) .'/../config/%s.php', $env->env));

error_reporting($env->error_level);

define('TMP_DIR', $env->tmp_dir);
define('ENV', $env->env);

define('ENV_TMP_DIR', TMP_DIR .'/partners_envs');

ini_set('log_errors', 'On');
ini_set('error_log', TMP_DIR  . '/logs/error_log.log');

define('DB_HOST', $env->db->host);
define('DB_NAME', $env->db->dbname);
define('DB_USER', $env->db->user);
define('DB_PASSWORD', $env->db->passwd);

define('MAIL_ENABLE', $env->mail->enable);
define('MAIL_HOST', $env->mail->host);
define('MAIL_PORT', $env->mail->port);
define('MAIL_SECURE', $env->mail->secure);
define('MAIL_DEBUG', $env->mail->debug);
define('MAIL_CHARSET', $env->mail->charset);
define('MAIL_USERNAME', $env->mail->username);
define('MAIL_PASSWORD', $env->mail->password);
define('MAIL_FROM', $env->mail->from);
define('MAIL_FROM_NAME', $env->mail->name);
define('MAIL_SMTP_AUTH', $env->mail->smtp_auth);

define('LOCALE_DIR', sprintf('%s/locale', dirname(__FILE__)));

define('ENGINE_DIR', BASE_DIR . '/engine');
define('COMPONENT_DIR', BASE_DIR . '/components');
define('TEMPLATE_DIR', BASE_DIR . '../../frontend/templates');
define('COMMON_DIR', BASE_DIR . '/common');
define('PROFILING_MODE', intval($env->profiling_mode));

//define('MESSENGER_TELERGAM_TOKEN', $env->messenger->telegram->token);


require_once(dirname(__FILE__) . '/../vendor/autoload.php');

require_once(ENGINE_DIR . '/vendor/core/autoload.php');

//Сделано так в связи с конфликто namespace

new Autoload(BASE_DIR);


//new Autoload(BASE_DIR);

new Autoload(ENGINE_DIR);
//new Autoload(COMPONENT_DIR);
new Autoload(COMMON_DIR);

$payment_redirect_url = false;

define('RECAPTCHA_SECRET', $env->recaptcha->secret);
define('RECAPTCHA_PUBLIC', $env->recaptcha->public);

define('COOKIE_DOMAIN', $env->session->domain);
define('SUPPORT', $env->support ? $env->support->name : false);
define('METRIKA', $env->metrika ? $env->metrika->name : false);

ini_set('session.cookie_domain', COOKIE_DOMAIN);
ini_set('session.save_path', TMP_DIR . '/sessions');

ini_set('session.gc_maxlifetime', 7200);
ini_set('session.cookie_lifetime', 7200);

/*$sms = (array) $env->sms;

$locale = new \Vendor\Core\Locale();

define('EMAIL_TEMPLATE_DIR', COMMON_DIR . '/email/templates/' . $locale->locale());

\Vendor\Core\ProjectConfig::getInstance()->merge($base_config);
//\Vendor\Core\ProjectConfig::getInstance()->merge($marketing_config);
\Vendor\Core\ProjectConfig::getInstance()->merge(
    [
        'sms_config' => (array) $sms[$env->sms->provider],
        'redis' => (array)$env->redis,
        'geo' => (array) $env->geo,
        'new_account' => (array) $env->new_account
    ]);

$locale->set();

date_default_timezone_set($env->timezone);*/

return $env->env;

?>
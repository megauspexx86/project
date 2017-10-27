<?php

namespace App\Modules;


use Email\Objects\EmlPartnerCreate;
use Partner\Objects\CPartner;
use Partner\Services\ServicePartner;
use SDK\Objects\CUser;
use SDK\Services\ServiceUser;
use Vendor\Core\DbRedis;
use Vendor\Core\Error\Ex404;
use Vendor\Core\ExCommon;
use Vendor\Core\JsonView;
use Vendor\Core\Module;
use Vendor\Core\HtmlView;
use Vendor\Core\ProjectConfig;
use Vendor\Core\Request;
use Vendor\Core\Session;
use Vendor\Lib\Validator\CRuleEmail;
use Vendor\Lib\Validator\CRuleEquals;
use Vendor\Lib\Validator\CRuleMinLength;
use Vendor\Lib\Validator\CRuleNotEmail;
use Vendor\Lib\Validator\CRuleNotEmpty;
use Vendor\Lib\Validator\ExValidateFails;
use Vendor\Lib\Validator\FormValidator;

class ModPublic extends Module {

    public function onIndex() {
        $view = new HtmlView('public.tpl');

        if($user = Session::getInstance()->current_user) {
            if(CPartner::findByUserId($user->id)) {
                header('Location: ' . ProjectConfig::getInstance()->getKey('settings', 'partner_url') . '/statistics/main');
            }
            $view->addObject('logged', true);
        }else{
            $view->addObject('logged', false);
        }

        $view->addObject('captcha', RECAPTCHA_PUBLIC);

        $view->addObject('metrika', ProjectConfig::getInstance()->getKey('external_service', 'yandex_metrika'));

        return $view;
    }

}


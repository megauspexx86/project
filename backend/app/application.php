<?php

namespace App;

use Vendor\Core\HtmlView;
use Vendor\Core\HttpLocation;
use Vendor\Core\ProjectConfig;
use Vendor\Core\View;

class Application extends \Vendor\Core\Application {

    protected function setupComponents() {

        parent::setupComponents();
        $this->url_mapper->addRule('^/$', '\App\Modules\ModPublic', 'onIndex');

       /* $this->url_mapper->addRule('^/json/report/data$', '\App\Modules\ModStatistic', 'onLoadPromoData');
        $this->url_mapper->addRule('^/json/report/common$', '\App\Modules\ModStatistic', 'onCommonReport');
        $this->url_mapper->addRule('^/json/report/promo$', '\App\Modules\ModStatistic', 'onPromoReport');
        $this->url_mapper->addRule('^/json/report/link', '\App\Modules\ModStatistic', 'onDirectLinkReport');

        $this->url_mapper->addRule('^/json/private/reward', '\App\Modules\ModCommon', 'onRewardSettings');
        $this->url_mapper->addRule('^/json/help/faq', '\App\Modules\ModHelp', 'onGetFaqList');
        $this->url_mapper->addRule('^/json/filter/sizes/(?<filter>[a-z]*)$', '\App\Modules\ModPromo', 'onGetUniqueSizes');
        $this->url_mapper->addRule('^/json/filter/height/(?<width>[0-9]*)/(?<filter>[a-z]*)$', '\App\Modules\ModPromo', 'onGetFilterHeight');
        $this->url_mapper->addRule('^/json/filter/width/(?<height>[0-9]*)/(?<filter>[a-z]*)$', '\App\Modules\ModPromo', 'onGetFilterWidth');

        $this->url_mapper->addRule('^/json/promo/forms', '\App\Modules\ModPromo', 'onGetPromoFormsList');

        $this->url_mapper->addRule('^/json/promo/archive', '\App\Modules\ModPromo', 'onGetArchivedComponentsList');
        $this->url_mapper->addRule('^/json/promo/links/create', '\App\Modules\ModPromo', 'onPromoLinkCreate');
        $this->url_mapper->addRule('^/json/promo/links/edit', '\App\Modules\ModPromo', 'onPromoLinkEdit');
        $this->url_mapper->addRule('^/json/promo/links/(?<status>[a-z]*)$', '\App\Modules\ModPromo', 'onPromoLinks');
        $this->url_mapper->addRule('^/json/place/on/(?<place_id>[0-9]*)', '\App\Modules\ModPromo', 'onTurnOnPlace');
        $this->url_mapper->addRule('^/json/place/off/(?<place_id>[0-9]*)', '\App\Modules\ModPromo', 'onTurnOffPlace');
        $this->url_mapper->addRule('^/json/place/archive/(?<place_id>[0-9]*)', '\App\Modules\ModPromo', 'onAddPlaceToArchive');
        $this->url_mapper->addRule('^/json/place/restore/(?<place_id>[0-9]*)', '\App\Modules\ModPromo', 'onRestoreComponentsByPlace');
        $this->url_mapper->addRule('^/json/component/on/(?<component_id>[0-9]*)', '\App\Modules\ModPromo', 'onTurnOnComponent');
        $this->url_mapper->addRule('^/json/component/restore/(?<component_id>[0-9]*)', '\App\Modules\ModPromo', 'onRestoreComponent');
        $this->url_mapper->addRule('^/json/component/off/(?<component_id>[0-9]*)', '\App\Modules\ModPromo', 'onTurnOffComponent');
        $this->url_mapper->addRule('^/json/component/archive/(?<component_id>[0-9]*)', '\App\Modules\ModPromo', 'onAddToArchiveComponent');
        $this->url_mapper->addRule('^/json/rotation/create', '\App\Modules\ModPromo', 'onCreateMultiplePlace');
        $this->url_mapper->addRule('^/json/rotation/edit/(?<place_id>[0-9]*)', '\App\Modules\ModPromo', 'onEditMultiplePlace');
        $this->url_mapper->addRule('^/json/rotation/(?<place_id>[0-9]*)/components', '\App\Modules\ModPromo', 'onGetRotationComponents');
        $this->url_mapper->addRule('^/preview/template/(?<template_id>[0-9]*)$', '\App\Modules\ModCommon', 'onPreviewTemplate');
        $this->url_mapper->addRule('^/json/user/bill$', '\App\Modules\ModCommon', 'onGetUserBill');

        $this->url_mapper->addRule('^/json/wl/create', '\App\Modules\ModWlabel', 'onCreateWhiteLabel');
        $this->url_mapper->addRule('^/json/wl/list', '\App\Modules\ModWlabel', 'onGetList');
        $this->url_mapper->addRule('^/json/wl/promo/create$', '\App\Modules\ModWlabel', 'onCreateWlComponent');
        $this->url_mapper->addRule('^/json/wl/upload$', '\App\Modules\ModCommon', 'onUploadWlResources');

        $this->url_mapper->addRule('^/json/upload$', '\App\Modules\ModCommon', 'onUpload');

        $this->url_mapper->addRule('^/login', '\App\Modules\ModPublic', 'onLogin');
        $this->url_mapper->addRule('^/remind/check$', '\App\Modules\ModPublic', 'onRemindCheckCode');
        $this->url_mapper->addRule('^/remind/autologin/(?<code>[0-9a-z]*)$', '\App\Modules\ModPublic', 'onRemindAutologin');
        $this->url_mapper->addRule('^/remind/password/change$', '\App\Modules\ModPublic', 'onRemindChangePassword');
        $this->url_mapper->addRule('^/remind$', '\App\Modules\ModPublic', 'onRemindPassword');
        $this->url_mapper->addRule('^/signup/logged', '\App\Modules\ModPublic', 'onSignUpLogged');
        $this->url_mapper->addRule('^/signup/redirect', '\App\Modules\ModPublic', 'onRegisterTechnicalPage');
        $this->url_mapper->addRule('^/signup', '\App\Modules\ModPublic', 'onSignUp');
        $this->url_mapper->addRule('^/logout$', '\App\Modules\ModCommon', 'onLogout');
        $this->url_mapper->addRule('^/(.*)$', '\App\Modules\ModCommon', 'onRender');*/
    }

   /* protected function _components() {

        return [
            //'MainProjectComponent',
            'Profile\ProfileComponent',
            'Pages\PagesComponent',
            'Bill\BillComponent',
            'Autologin\AutologinComponent',
            'I18n\I18nComponent'
        ];

    }*/

    public function run($request_uri)
    {

        try {

            $result = $this->url_mapper->parseUrl($request_uri)->run();

            if ($result instanceof HtmlView) {
                $result->addObject('config', ProjectConfig::getInstance()->getKeys());
            }

        } catch (\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            echo 'account error.<br/>';
            echo sprintf("Error: %s. %s", $e->getCode(), $e->getMessage());
            exit;
        }

        if ($result instanceof View) {
            $this->response->setContentType($result->getContentType(), 'utf-8');
            $this->response->setContent($result);
            $this->response->flush();
        }
    }


}
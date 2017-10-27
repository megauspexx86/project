<?php

namespace Partner\App\Modules;

use Partner\Core\PartnerModule;
use Partner\Objects\CPartner;
use Partner\Services\ServicePartner;
use Partner\Services\ServicePartnerResourceUploader;
use Partner\Services\ServicePartnerWlResourceUploader;
use SDK\Objects\CUser;
use SDK\Services\ServiceOrderResourceUploader;
use SDK\Services\ServiceUser;
use Vendor\Core\HtmlView;
use Vendor\Core\HttpLocation;
use Vendor\Core\JsonView;
use Vendor\Core\ProjectConfig;
use Vendor\Core\Request;
use Vendor\Core\Session;
use Vendor\Lib\Validator\ExValidateFails;

class ModCommon extends PartnerModule {

    public function onRender() {

        $view = new HtmlView('common.tpl');
        $view->setDelimiter('<!--{', '}-->');
        $partner = CPartner::findByUserId(Session::getInstance()->current_user->id);
        $view->addObject('user', Session::getInstance()->current_user->view(['id', 'role', 'name', 'phone', 'phone_country_code', 'agency_id', 'email', 'create_date']));
        $view->addObject('form_sizes_width', json_encode(ProjectConfig::getInstance()->getKey('form_sizes_width')));
        $view->addObject('form_sizes_height', json_encode(ProjectConfig::getInstance()->getKey('form_sizes_height')));
        $view->addObject('form_sizes_available_height', json_encode(ProjectConfig::getInstance()->getKey('form_sizes_available_height')));
        $view->addObject('partner_url', json_encode(ProjectConfig::getInstance()->getKey('settings', 'partner_url')));
        $view->addObject('account_url', json_encode(ProjectConfig::getInstance()->getKey('settings', 'account_url')));
        $view->addObject('mirror_url', json_encode(ProjectConfig::getInstance()->getKey('settings', 'mirror_url')));
        $view->addObject('partner_id', $partner ? $partner->id : 'false');
		$view->addObject('support',  SUPPORT);
        $view->addObject('wl', json_encode(in_array(Session::getInstance()->current_user->id, ProjectConfig::getInstance()->getKey('partner', 'wl_ids'))));


        return $view;
    }

    public function onRewardSettings() {

        $view = new JsonView();

        $settings = CPartner::findByUserId(Session::getInstance()->current_user->id)->view(['settings_first_order', 'settings_rebill', 'settings_ttl']);
        $settings['settings_ttl'] = floor($settings['settings_ttl'] / 30);

        $view->addObject('settings', $settings);

        return $view;
    }

    /**
     * Просмотр формы или баннера
     * @return HtmlView
     */
    public function onPreviewTemplate() {
        $view = new HtmlView('preview_template.tpl');

        $view->addObject('partner_url', ProjectConfig::getInstance()->getKey('settings', 'partner_url'));
        $view->addObject('template_id', $this->param('template_id'));
        return $view;
    }

    public function onUpload() {
        $view = new JsonView();
        try {
            $file = new ServicePartnerResourceUploader(Request::getQueryVar('type'));
            $file->validate();
            
            $view->addObject('server_filename', $file->save(TMP_DIR.'/user_files'));
            $view->addObject('file_key', Request::getQueryVar('key'));
            
        }catch (ExValidateFails $e) {
            $view->addObject('status', 'ERROR');
            $view->addObject('error', ['code' => $e->getCode(), 'message' => $e->getMessage()]);
            $view->addObject('fields', $e->getErrors());
            $view->addObject('key', Request::getQueryVar('key'));
            $view->addObject('type', Request::getQueryVar('type'));

        }

        return $view;
    }

    /**
     * Сохранение файлов для WL
     * @todo refactor
     */
    public function onUploadWlResources() {
        $view = new JsonView();
        try {
            $file = new ServicePartnerWlResourceUploader(Request::getQueryVar('type'));
            $file->validate();

            $view->addObject('server_filename', $file->save(TMP_DIR.'/user_files'));
            $view->addObject('file_key', Request::getQueryVar('key'));

        }catch (ExValidateFails $e) {
            $view->addObject('status', 'ERROR');
            $view->addObject('error', ['code' => $e->getCode(), 'message' => $e->getMessage()]);
            $view->addObject('fields', $e->getErrors());
            $view->addObject('key', Request::getQueryVar('key'));
            $view->addObject('type', Request::getQueryVar('type'));
        }

        return $view;
    }



    /**
     * Получение баланса пользователя
     * @return JsonView
     */
    public function onGetUserBill() {
        $view = new JsonView();

        $view->addObject('cash', (new CUser())->findById(Session::getInstance()->current_user->id)->view(['cash']));

        return $view;
    }

    public function onLogout() {
        $service = new ServiceUser();
        $service->logout();
        $location = new HttpLocation('/');
        $location->go();
    }

}

?>
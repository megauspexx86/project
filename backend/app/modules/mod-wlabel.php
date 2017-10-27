<?php

namespace Partner\App\Modules;

use Partner\Core\PartnerModule;
use Partner\Objects\CPartner;
use Partner\Objects\CPartnerWhiteLabel;
use Partner\Services\ServicePartner;
use Partner\Services\ServicePartnerWhiteLabel;
use Partner\Services\ServicePartnerWhiteLabelResources;
use Vendor\Core\Error\Ex403;
use Vendor\Core\Error\Ex404;
use Vendor\Core\JsonView;
use Vendor\Core\Request;
use Vendor\Lib\Validator\CRuleNotEmpty;
use Vendor\Lib\Validator\ExValidateFails;
use Vendor\Lib\Validator\FormValidator;

/**
 * Класс для рабоьы c White label
 * Class ModWlabel
 * @package App\Modules
 */
class ModWlabel extends PartnerModule {

    /**
     * Создание White Label
     * @return JsonView
     * @throws Ex404
     */
    public function onCreateWhiteLabel() {
        $view = new JsonView();

        $hash = Request::getQueryVars(['title', 'host', 'site_name', 'email', 'files']);
   
        try {
            $partner = CPartner::findByUserId($this->user->id);

            if(!$partner){
                throw new Ex404();
            }
            
            $hash['partner_id'] = $partner->id;
            
            $service = new ServicePartnerWhiteLabel();
            $wl = $service->validate($hash)
                ->create($hash);
            
            $file_service = new ServicePartnerWhiteLabelResources($wl);
            $file_service->saveFiles($hash['files']);

        }catch (ExValidateFails $e) {
            $view->addObject('status', 'ERROR');
            $view->addObject('error', ['code' => $e->getCode(), 'message' => $e->getMessage()]);
            $view->addObject('fields', $e->getErrors());
        }

        
        return $view;
    }

    /**
     * Получение списка WL
     * @return JsonView
     * @throws Ex404
     */
    public function onGetList() {
        $view = new JsonView();
        
        if(!$partner = CPartner::findByUserId($this->user->id)) {
            throw new Ex404();
        }
        
        $view->addObject('list', CPartnerWhiteLabel::findAllByPartnerId($partner->id)->view(['title', 'host']));

        return $view;
    }

    /**
     * Создание компонента с привязкой к нему WL
     * @return JsonView
     * @throws Ex404
     */
    public function onCreateWlComponent() {
        $view = new JsonView();
        $request = Request::getQueryVars(['wl_id', 'template_id']);

        try {
            $validator = new FormValidator();
            $validator->addRule(new CRuleNotEmpty('wl_id'));
            $validator->validate($request);

            $service = new ServicePartner();

            $partner = CPartner::findByUserId($this->user->id);
            if (!$partner) {
                throw new Ex404();
            }

            $hash = [
                'template_id' => $request['template_id'],
                'partner_id' => $partner->id
            ];

            if($request['wl_id'] != 'napishem') {
                $wl = CPartnerWhiteLabel::findById($request['wl_id']);

                if ($wl->partner_id != $partner->id) {
                    throw new Ex403();
                }
                $hash['wl_id'] = $wl->id;
            }

            $place = $service->createPartnerComponent($hash);
            $view->addObject('place', $place->view(['id']));

        } catch (ExValidateFails $e) {
            $view->addObject('status', 'ERROR');
            $view->addObject('error', ['code' => $e->getCode(), 'message' => $e->getMessage()]);
            $view->addObject('fields', $e->getErrors());
        }
        
        return $view;
    }
}

?>
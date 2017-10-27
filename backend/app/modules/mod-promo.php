<?php

namespace Partner\App\Modules;

use Partner\Core\PartnerModule;
use Partner\Objects\CPartner;
use Partner\Objects\CPartnerComponent;
use Partner\Objects\CPartnerComponentTemplate;
use Partner\Objects\CPartnerPlace;
use Partner\Services\ServicePartner;
use Vendor\Core\Error\Ex403;
use Vendor\Core\Error\Ex404;
use Vendor\Core\ExCommon;
use Vendor\Core\JsonView;
use Vendor\Core\Request;
use Vendor\Lib\Validator\CRuleNotEmpty;
use Vendor\Lib\Validator\ExValidateFails;
use Vendor\Lib\Validator\FormValidator;

/**
 * Класс для страницы промоматериалов
 * Class ModPromo
 * @package App\Modules
 */
class ModPromo extends PartnerModule {

    /**
     * Получение списка форм по заданным параметрам
     * @return JsonView
     */
    public function onGetPromoFormsList() {

        $view = new JsonView();

        $hash = Request::getQueryVars(['shape', 'size_width', 'size_height', 'banners', 'forms']);

        $params = [
            'shape' => $hash['shape'],
            'size_width' => $hash['size_width'],
            'size_height' => $hash['size_height']
        ];

        if($hash['banners'] == 'true') {
            $params['type'] = 'banner';
            $banners = CPartnerComponentTemplate::getPromoFormsByFilters($params);
            unset($params['type']);
        }

        if($hash['forms'] == 'true') {
            $params['type'] = ['form', 'react_form'];
            $forms = CPartnerComponentTemplate::getPromoFormsByFilters($params);
            unset($params['type']);
        }

        $view->addObject('templates_list_banners', isset($banners) ? $banners : []);
        $view->addObject('templates_list_forms', isset($forms) ? $forms : []);

        return $view;
    }

    /**
     * Создание компонента с рекламным местом(по клику по кнопке Получить код)
     * @return JsonView
     * @throws \Vendor\Core\Error\Ex404
     */
    public function onCreatePartnerComponentByTemplate() {
        $view = new JsonView();

        $service = new ServicePartner();
        $partner = CPartner::findByUserId($this->user->id);
        $hash = [
            'template_id' => $this->param('template_id'),
            'partner_id' => $partner->id
        ];
        $place = $service->createPartnerComponent($hash);
        $view->addObject('place', $place->view(['id']));

        return $view;
    }

    /**
     * Получение списка компонентов, сгруппированных по рекламному месту
     * @return JsonView
     */
    public function onGetPartnerComponentsList() {
        $view = new JsonView();
        $partner = CPartner::findByUserId($this->user->id);
        if(!$partner) {
            throw new Ex404();
        }
        $components = CPartnerComponent::getPartnerComponentsGroupedByPlaces($partner->id);

        $view->addObject('components', $components);

        return $view;
    }

    /**
     * Включение рекламного места
     * @return JsonView
     */
    public function onTurnOnPlace() {
        $view = new JsonView();

        $service = new ServicePartner();

        $service->turnOnPlace($this->param('place_id'), $this->user->id);

        return $view;
    }

    /**
     * Отключение рекламного места
     * @return JsonView
     */
    public function onTurnOffPlace() {
        $view = new JsonView();

        $service = new ServicePartner();

        $service->turnOffPlace($this->param('place_id'), $this->user->id);

        return $view;
    }

    /**
     * Добавление рекламного места в архив
     * @return JsonView
     */
    public function onAddPlaceToArchive() {
        $view = new JsonView();

        (new ServicePartner())->addPlaceToArchive($this->param('place_id'), $this->user->id);

        return $view;
    }

    /**
     * Включение компонента
     * @return JsonView
     */
    public function onTurnOnComponent() {
        $view = new JsonView();
        (new ServicePartner())->changeComponentStatus($this->param('component_id'), CPartnerComponent::STATUS_ACTIVE);
        return $view;
    }
    /**
     * Включение компонента
     * @return JsonView
     */
    public function onRestoreComponent() {
        $view = new JsonView();
        (new ServicePartner())->changeComponentStatus($this->param('component_id'), CPartnerComponent::STATUS_DISABLED);
        return $view;
    }

    /**
     * Отключение компонента
     * @return JsonView
     */
    public function onTurnOffComponent() {
        $view = new JsonView();
        (new ServicePartner())->changeComponentStatus($this->param('component_id'), CPartnerComponent::STATUS_DISABLED);
        return $view;
    }

    /**
     * Добавление компонента в архив
     * @return JsonView
     */
    public function onAddToArchiveComponent() {
        $view = new JsonView();
        (new ServicePartner())->changeComponentStatus($this->param('component_id'), CPartnerComponent::STATUS_ARCHIVE);
        return $view;
    }

    /**
     * Получение списка архивных компонентов
     * @return JsonView
     * @throws Ex404
     */
    public function onGetArchivedComponentsList() {
        $view = new JsonView();
        $partner = CPartner::findByUserId($this->user->id);
        if(!$partner) {
            throw new Ex404();
        }
        $components = CPartnerComponent::getPartnerArchivedComponents($partner->id);

        $view->addObject('components', $components);

        return $view;
    }

    /**
     * Восстановление компонентов из архива по рекламному месту
     * @return JsonView
     */
    public function onRestoreComponentsByPlace() {
        $view = new JsonView();

        (new ServicePartner())->restoreComponentsFromPlace($this->param('place_id'), $this->user->id);

        return $view;
    }

    /**
     *
     * @return JsonView
     * @throws Ex404
     */
    public function onCreateMultiplePlace() {
        $view = new JsonView();

        try {
            $hash = Request::getQueryVars(['title', 'ids', 'wl']);
            
            $service = new ServicePartner();
            $place = $service->createMultiplePlace($hash, $this->user->id);
            $extra = [
                'fields' => [
                    'partner_component_template.preview_file' => 'preview_file',
                    'partner_component_template.type' => 'type'
                ],

                'join' => [
                    'JOIN partner_component_template ON(partner_component.template_id = partner_component_template.id)'
                ]
            ];
            $components = CPartnerComponent::find('place_id = :place_id', ['place_id' => $place->id], $extra);
            $view->addObject('components', $components->view(['title', 'type', 'preview_file', 'template_id']));
            $view->addObject('place', $place->view(['title']));

        } catch(ExValidateFails $e) {
            $view->addObject('status', 'ERROR');
            $view->addObject('errors', $e->getErrors());
        }

        return $view;
    }

    /**
     * Получение компонентов в ротации
     * @return JsonView
     */
    public function onGetRotationComponents() {
        $view = new JsonView();
        $components = CPartnerComponent::findComponentsByPlacePartnerId($this->param('place_id'));
        $view->addObject('components', $components->view(['place_title', 'place_status', 'template_id', 'settings', 'shape', 'template_width', 'template_height', 'place_id', 'status', 'type', 'wl_id']));
        $view->addObject('types', $components->type);

        return $view;
    }


    /**
     * Получение уникальных значений ширины темплейтов для фильтра
     * @return JsonView
     */
    public function onGetUniqueSizes() {
        $view = new JsonView();

        $width = CPartnerComponentTemplate::findUniqueTemplateWidth($this->param('filter'));
        $height = CPartnerComponentTemplate::findUniqueTemplateHeight($this->param('filter'));
        $view->addObject('filter_width', $width->view(['size_width']));
        $view->addObject('filter_height', $height->view(['size_height']));

        return $view;
    }

    /**
     * Получение доступных значений высоты
     * @return JsonView
     */
    public function onGetFilterHeight() {
        $view = new JsonView();

        $height = CPartnerComponentTemplate::findUniqueTemplateHeight($this->param('filter'), $this->param('width'));
        $view->addObject('height', $height->view(['size_height']));

        return $view;
    }

    /**
     * Получение доступных значений ширины
     * @return JsonView
     */
    public function onGetFilterWidth() {
        $view = new JsonView();

        $height = CPartnerComponentTemplate::findUniqueTemplateWidth($this->param('filter'), $this->param('height'));
        $view->addObject('width', $height->view(['size_width']));

        return $view;
    }

    /**
     * Редактирование ротации
     * @return JsonView
     * @throws Ex404
     */
    public function onEditMultiplePlace() {
        $view = new JsonView();

        try {
            $hash = Request::getQueryVars(['title', 'ids', 'wl']);
            $service = new ServicePartner();
            $service->editMultiplePlace($hash, $this->param('place_id'));

        } catch(ExValidateFails $e) {
            $view->addObject('status', 'ERROR');
            $view->addObject('errors', $e->getErrors());
        }

        return $view;
    }

    /**
     * Получение кастомных ссылок
     * @return JsonView
     */
    public function onPromoLinks() {
        $view = new JsonView();

        $partner = CPartner::findByUserId($this->user->id);

        $links = CPartnerPlace::links($partner->id, $this->param('status'));

        $view->addObject('links', $links->view(['link_id', 'link_title']));

        return $view;
    }

    /**
     * Создание кастомной ссылки
     * @return JsonView
     * @throws Ex404
     */
    public function onPromoLinkCreate() {
        $view = new JsonView();

        $hash = Request::getQueryVars(['title']);

        try {
            $validator = new FormValidator();
            $validator->addRule(new CRuleNotEmpty('title'));
            $validator->validate($hash);

            $service = new ServicePartner();
            $partner = CPartner::findByUserId($this->user->id);

            $service->createStreamedLink($hash['title'], $partner->id);

        } catch (ExValidateFails $e) {
            $view->addObject('status', 'ERROR');
            $view->addObject('error', ['code' => $e->getCode(), 'message' => $e->getMessage()]);
            $view->addObject('fields', $e->getErrors());
        }

        return $view;
    }


    /**
     * Редактирование кастомной реферальной ссылки
     * @return JsonView
     */
    public function onPromoLinkEdit() {
        $view = new JsonView();

        $hash = Request::getQueryVars(['title', 'link_id']);

        try {
            $validator = new FormValidator();
            $validator->addRule(new CRuleNotEmpty('title'));
            $validator->validate($hash);
            $service = new ServicePartner();
            $service->editStreamedLink($hash, $this->user->id);

        } catch (ExValidateFails $e) {
            $view->addObject('status', 'ERROR');
            $view->addObject('error', ['code' => $e->getCode(), 'message' => $e->getMessage()]);
            $view->addObject('fields', $e->getErrors());
            
        } catch (ExCommon $e) {
            $view->addObject('status', 'ERROR');
            $view->addObject('error', ['code' => $e->getCode(), 'message' => $e->getMessage()]);
        } 

        return $view;
    }

}

?>
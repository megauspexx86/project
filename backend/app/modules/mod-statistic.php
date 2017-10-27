<?php

namespace Partner\App\Modules;
use Partner\Core\PartnerModule;
use Partner\Objects\CPartnerComponent;
use Partner\Objects\CPartnerPlace;
use Partner\Services\ServicePartner;
use Partner\Services\ServicePartnerStatistic;
use Vendor\Core\Error\Ex403;
use Vendor\Core\JsonView;
use Vendor\Core\Request;


/**
 * Класс для страницы промоматериалов
 * Class ModPromo
 * @package App\Modules
 */
class ModStatistic extends PartnerModule  {

    /**
     * Получение общей статистики
     */
    public function onCommonReport() {

        $view = new JsonView();

        $service = new ServicePartnerStatistic($this->user->id);

        $default_f = (new \DateTime())->modify("-1month")->format('d.m.Y');
        $default_t = (new \DateTime())->format('d.m.Y');

        $period_f = Request::getQueryVar('period_f', $default_f);
        $period_t = Request::getQueryVar('period_t', $default_t);

        $f = (new \DateTime())->setTimestamp(strtotime($period_f))->format('Y-m-d H:i:s');
        $t = (new \DateTime())->setTimestamp(strtotime($period_t))->setTime(23, 59, 59)->format('Y-m-d H:i:s');

        $service->visit_from(strtotime($f))
            ->visit_to(strtotime($t));

        $orders_statistic = $service->orders();
        $visits_statistic = $service->visits();
        $registers_statistic = $service->registrations();

        $view->addObject('orders_statistic', $orders_statistic);
        $view->addObject('visits_statistic', $visits_statistic);
        $view->addObject('registers_statistic', $registers_statistic);

        $view->addObject('default_f', $default_f);
        $view->addObject('default_t', $default_t);

        $view->addObject('period_f', $f);
        $view->addObject('period_t', $t);

        return $view;
    }

    /**
     * Получение статистики по активным промоматериалам
     * @return JsonView
     * @throws Ex403
     */
    public function onPromoReport() {

        $view = new JsonView();

        $place = CPartnerPlace::findById(Request::getQueryVar('pid'));
        $components = CPartnerComponent::findComponentsByPlaceId($place->id, [CPartnerComponent::STATUS_ACTIVE, CPartnerComponent::STATUS_DISABLED]);

        if($place->partner_id !== $this->_partner->id) {
            throw new Ex403();
        }

        $f = (new \DateTime())->setTimestamp(strtotime(Request::getQueryVar('period_f')))->format('Y-m-d H:i:s');
        $t = (new \DateTime())->setTimestamp(strtotime(Request::getQueryVar('period_t')))->setTime(23, 59, 59)->format('Y-m-d H:i:s');

        $service = new ServicePartnerStatistic($this->user->id, [CPartnerComponent::STATUS_ACTIVE, CPartnerComponent::STATUS_DISABLED]);
        $service->place($place->id)
            ->visit_from(strtotime($f))
            ->visit_to(strtotime($t));

        $orders_statistic = $service->orders();
        $visits_statistic = $service->visits();
        $registers_statistic = $service->registrations();

        $view->addObject('orders_statistic', $orders_statistic);
        $view->addObject('visits_statistic', $visits_statistic);
        $view->addObject('registers_statistic', $registers_statistic);
        $view->addObject('place', $place->view(['title']));
        $view->addObject('components', $components->view(['title']));
        $view->addObject('all_components_count', CPartnerComponent::count('place_id = :place_id', [':place_id' => $place->id]));

        return $view;

    }

    public function onDirectLinkReport() {

        $view = new JsonView();

        $f = (new \DateTime())->setTimestamp(strtotime(Request::getQueryVar('period_f')))->format('Y-m-d H:i:s');
        $t = (new \DateTime())->setTimestamp(strtotime(Request::getQueryVar('period_t')))->setTime(23, 59, 59)->format('Y-m-d H:i:s');

        $service = new ServicePartnerStatistic($this->user->id);
        $service->component(0)
            ->visit_from(strtotime($f))
            ->visit_to(strtotime($t));

        $orders_statistic = $service->orders();
        $visits_statistic = $service->visits();
        $registers_statistic = $service->registrations();

        $view->addObject('orders_statistic', $orders_statistic);
        $view->addObject('visits_statistic', $visits_statistic);
        $view->addObject('registers_statistic', $registers_statistic);

        return $view;
    }

    public function onLoadPromoData() {

        $view = new JsonView();

        $view->addObject('data',  (new ServicePartner())->placeList($this->_partner->id, 0, 0, ['status' => 'ACTIVE'])->view([]));
        $view->addObject('period_f',  (new \DateTime())->modify("-1 month")->format('Y-m-d'));
        $view->addObject('period_t',  (new \DateTime())->format('Y-m-d'));

        return $view;
    }

}

?>
<?php

namespace Partner\App\Modules;

use Partner\Core\PartnerModule;
use Partner\Services\ServicePartner;
use Vendor\Core\Db\DbFilter;
use Vendor\Core\JsonView;

/**
 * Класс для страницы помощи
 * Class ModHelp
 * @package App\Modules
 */
class ModHelp extends PartnerModule {

    /**
     * Получение faq для страницы помощи
     * @return JsonView
     */
    public function onGetFaqList() {
        $view = new JsonView();

        $list = (new ServicePartner())->faqList(new DbFilter(), '');
        $view->addObject('faq_list', $list->view([]));

        return $view;
    }

}

?>
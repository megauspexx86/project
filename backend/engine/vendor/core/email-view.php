<?php

namespace Vendor\Core;

/**
 * Класс для генерации шаблонов для писем
 * Class EmailView
 * @package Vendor\Core
 */
class EmailView extends HtmlView {

    /**
     * EmailView constructor.
     * @param $name
     * @param $locale
     */
    public function __construct($name){
        parent::__construct($name);
    }

    /**
     * Получение директории с темплейтами для email
     * @return string
     */
    protected function _getTemplateDir() {
        return EMAIL_TEMPLATE_DIR;
    }

}
?>
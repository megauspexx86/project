<?php

namespace Email\Objects\Defended;

/**
 * Класс для отправки письма о создании заказа с партнёрской формы
 * Class EmlOrderCreateSimpleApi
 * @package Email\Objects\Defended
 */
class EmlOrderCreateSimpleApi extends EmlOrderCreateSimple
{
    /**
     * Utm метка
     * @return string
     */
    protected function utm() {
        return '?utm_source=e-mail&utm_medium=avtomaticheskie_pisma&utm_campaign=vash_zakaz_razmeschen_s_form_partnerki';
    }
}
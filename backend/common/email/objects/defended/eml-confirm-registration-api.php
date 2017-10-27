<?php

namespace Email\Objects\Defended;


use Email\Objects\EmlConfirmRegistration;

class EmlConfirmRegistrationApi extends EmlConfirmRegistration
{
    /**
     * Utm метка
     * @return string
     */
    protected function utm() {
        return '?utm_source=e-mail&utm_medium=avtomaticheskie_pisma&utm_campaign=podtverdite_vashu_registraciyu_s_form_partnerki';
    }
}
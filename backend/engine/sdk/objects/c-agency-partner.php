<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

/**
 * Агентство-партнер, агентство которое размещает заказы в свой агентский аккаунт с внешних источников
 * Class CPartnerAgency
 * @package SDK\Objects
 */
class CAgencyPartner extends ActiveRecord {


    static protected function model() {

        return [
           'owner_id' => null, 'private_key' => null
        ];

    }


    static protected function dbTable() {
        return 'agency_partner';
    }



}

?>
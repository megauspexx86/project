<?php

namespace Partner\Core;

use Partner\Objects\CPartner;
use Profile\Modules\AccountModule;
use Vendor\Core\Error\Ex403;

class PartnerModule extends AccountModule {

    protected $user;
    protected $_partner;

    public function __construct($params = []) {

        parent::__construct($params);

        if(!$this->_partner = CPartner::findOne("user_id = :id", [':id' => $this->user->id])) {
            throw new Ex403();
        }
    }

}

?>
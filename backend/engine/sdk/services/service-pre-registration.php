<?php

namespace SDK\Services;
use SDK\Objects\CPreRegistrationOrder;
use SDK\Objects\CPreRegistrationUser;
use SDK\Objects\CUser;


/**
 *
 * Реализация функционала по работе с недозарегистрированными пользователями
 *
 * Class ServicePreRegistration
 * @package SDK\Services
 */
class ServicePreRegistration {


    /**
     * Создает запись о недозарегистрированном пользователе
     * @param $name
     * @param $email
     * @return CPreRegistrationUser
     */
    public function create($name, $email) {

        if(CUser::findByEmail($email)) {
            return false;
        }

        $list = CPreRegistrationUser::find("email = :email", [':email' => $email]);

        if($list->getCount() > 0) {
            return $list->get(0);
        }

        $u = new CPreRegistrationUser();
        $u->name = $name;
        $u->email = $email;
        $u->save();

        return $u;
    }

    /**
     * Создает запись о предварительном заказе
     *
     * @param int $id
     * @param $hash
     */
    public function orderData($id, $hash) {

        $data = new CPreRegistrationOrder();
        $data->owner_id = $id;
        $data->data = $hash;
        $data->save();

        return $data;
    }

}
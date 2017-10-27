<?php

namespace SDK\Services;
use SDK\Objects\CUser;
use SDK\Objects\CUserGroup;
use Vendor\Core\Error\Ex403;
use Vendor\Lib\Validator\ExValidateFails;


/**
 * Сервис для работы с промогруппами
 * Class ServicePromoGroupStatistic
 * @package SDK\Services
 */
class ServicePromoGroup {

    /**
     * Объект пользователя
     * @var CUser
     */
    protected $user;

    /**
     * Промокод
     * @var
     */
    protected $promo_email;

    /**
     * ServicePromoGroup constructor.
     * @param CUser $user
     * @param $promo_email
     * @throws Ex403
     */
    public function __construct(CUser $user, $promo_email) {

        if(CUserGroup::findByUserId($user->id)) {
            throw new Ex403();
        }

        if($user->wl_id > 0) {
            throw new Ex403();
        }

        $this->user = $user;
        $this->__checkPromoCode($promo_email);
    }

    /**
     * Проверка промокода
     * @param $promo_email
     * @throws ExValidateFails
     */
    protected function __checkPromoCode($promo_email) {

        if($promo_email == $this->user->email) {
            throw new ExValidateFails(['promocode_error' => 'equals']);
        }

        if(!$promo_user = CUser::findByEmail($promo_email)) {
            throw new ExValidateFails(['promocode_error' => 'not_found']);
        }

        if($promo_user->role != CUser::ROLE_CUSTOMER || $promo_user->agency_id) {
            throw new ExValidateFails(['promocode_error' => 'role']);
        }

        $this->promo_email = $promo_email;

    }

    /**
     * Присоединение пользователя к промогруппе
     */
    public function add() {

        $group_owner = CUser::findByEmail($this->promo_email);

        $owner_registration = CUserGroup::findByUserId($group_owner->id);

        // Если промо-код используется впервые, регистрируем владельца, чтобы объединить их в группу
        if(!$owner_registration) {
            $owner_registration = new CUserGroup();
            $owner_registration->group_owner_id = $group_owner->id;
            $owner_registration->user_id = $group_owner->id;
            $owner_registration->invite_user_id = $group_owner->id;
            $owner_registration->save();
        }

        $group = new CUserGroup();
        $group->group_owner_id = $owner_registration->group_owner_id;
        $group->user_id = $this->user->id;
        $group->invite_user_id = $group_owner->id;
        if($owner_registration->name) {
            $group->name = $owner_registration->name;
        }

        $group->save();

        //Пересчет накопительной скидки для пользователей группы
        $service_cumulative_discount = new ServiceCumulativeDiscount($this->user->id);
        $service_cumulative_discount->recount();

    }

}
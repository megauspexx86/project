<?php

namespace SDK\Objects;


use Vendor\Core\ActiveRecord;

class CUser extends ActiveRecord {

    const ROLE_CUSTOMER = 1;
    const ROLE_AUTHOR = 2;

    // для consultant_status
    const CONSULTANT_ACTIVE = 1;
    const CONSULTANT_NOT_ACTIVE = 0;
    const CONSULTANT_WAS_DELETED = 2;

    // для consultant
    const NOT_CONSULTANT = 0;
    const IS_CONSULTANT = 1;

    //profile confirmed status
    const ANKETA_WAITING = 1;
    const ANKETA_CONFIRM = 2;
    const ANKETA_UNCONFIRM = 3;

    const USER_ACTIVE = 1; //для bet_ability
    const USER_TIME_BLOCKED = 0;
    const USER_FULL_BLOCKED = 2;
    
    const DEFAULT_WHITE_LABEL = 0;

    static protected function model() {

        return [
            'name' => '', 'role' => '', 'email' => '', 'password_md5' => '', 'author_text' => null, 'confirmation_code' => null,
            'author_skill' => null, 'rating' => null, 'cash' => 0, 'last_visit' => null, 'contact_exception_count' => 0,
            'avatar' => null, 'rating_value' => 0, 'create_date' => '', 'register_date' => null, 'country' => null,
            'city' => null, 'phone_country_code' => null, 'phone_code' => null, 'phone' => null, 'icq' => null, 'is_agent' => 0,
            'adress' => null, 'adress_comment' => null, 'work_time' => null, 'fax_code' => null, 'fax' => null, 'site' => null,
            'qualification' => null, 'email_agent' => null, 'work_count' => null, 'in_favourites' => 0, 'remember_code' => null,
            'autologin_code' => null, 'works_uploaded' => 0, 'learn_about' => null, 'new_order_send' => 1, 'bet_ability' => 1,
            'is_dealer' => 0, 'dealer_comission' => 0, 'dealer_country' => '', 'dealer_city' => '', 'dealer_phone_code' => '',
            'dealer_phone' => '', 'dealer_comment' => null, 'dealer_address' => null, 'dealer_email' => null, 'agency_id' => null,
            'agency_name' => null, 'agency_mobile' => null, 'agency_phone' => null, 'agency_icq' => null, 'agency_skype' => null,
            'agency_logo' => null, 'author_agency_id' => null, 'subs_news_napishem' => 1, 'subs_new_orders' => 1, 'subs_orders_status' => 1,
            'subs_new_messages' => 1, 'subs_new_bets' => 1, 'referer' => null, 'user_phone' => null, 'user_icq' => null, 'study_form' => null,
            'college' => null, 'user_character' => '', 'promo_code' => null, 'enc_password' => null, 'has_bonus' => null, 'bonus' => 0,
            'our_referal' => 0, 'referal_link_type' => null, 'referal_comment' => null, 'our_referal_url' => null, 'analytic_type' => '',
            'rating_of_ten' => 0, 'author_level' => 0, 'page_reg' => 0, 'money' => 0, 'all_orders' => 0, 'fio' => null, 'admin_confirmation' => 1,
            'admin_comment' => null, 'admin_confirmation_date' => null, 'anketa_val' => 1, 'bonus_point' => 0, 'date_make_loser' => null,
            'com_discount_id' => null, 'consultant' => 0, 'consultant_date' => null, 'admin_cons_status' => null, 'cons_discount_percent' => null,
            'consultant_status' => 0, 'online_order_confirm' => 0, 'sms_confirm' => null, 'subs_new_sms' => 1, 'skype' => null,
            'token' => null, 'sms_pass_confirm' => null, 'sms_pass_date' => null, 'edit_purse' => 1, 'author_agency' => 'NOT', 'children_anketa_val' => "NEW",
            'block_cash_sum' => null, 'block_cash_date' => null, 'block_cash_comment' => null, 'private_key' => null, 'withdraw_time_wm' => 'standart_auto_withdraw', 
            'withdraw_time_q' => 'manual', 'withdraw_time_b' => 'manual', 'wl_id' => '', 'admin_id' => '', 'purse_sms_date' => '', 'purse_confirm_code' => ''
        ];
    }

    public function __get($name) {

        if($name == "password") {
            if(!$this->_hasAttribute($name)) {
                return null;
            }
        }

        return parent::__get($name);
    }

    public function __set($name, $value) {

        if($name == "password") {

            $this->extend('password', $value);

            $name = "password_md5";
            $value = md5($value);
        }
        if($name == 'phone' || $name == 'phone_country_code') {
            $value = preg_replace('~\D+~', '', $value);
        }

        parent::__set($name, $value);
    }

    public function view($fields = []) {

        if(in_array('cash_formatted', $fields)) {
            $this->__extension['cash_formatted'] = number_format($this->cash, 0, " ", " ");
        }

        if(in_array('author_rating_100', $fields)) {
            $this->__extension['author_rating_100'] = $this->rating_of_ten * 10;
        }

        if(in_array('chat_token', $fields)) {
            $this->__extension['chat_token'] = $this->chatToken();
        }

        return parent::view($fields);
    }

    /**
     * Инициализация объекта CUser из хэша.
     * Сделано для синхронизации старого объекта CUser(старого кабинета) в случае, если объект создаётся в рамках транзакции БД
     * @param $hash
     */
    public function initialize($hash) {
        $this->initFromHash($hash);
        return $this;
    }

    protected function saveInsert() {
        $this->create_date = (new \DateTime())->format('Y-m-d H:i:s');
        parent::saveInsert();
    }

    /**
     * @todo доработать token таким образом, чтобы он был динамическим
     * @return string
     */
    public function chatToken() {
        return strtoupper(sha1(sprintf("%d.%s.%s", $this->id, ($this->role == CUser::ROLE_AUTHOR ? "AUTHOR" : "CUSTOMER"), $this->create_date)));
    }

    /**
     * Поиск пользователя по адресу почты
     * @param $email
     * @param $wl_id
     * @return CUser
     */
    static public function findByEmail($email, $wl_id = null) {

        $wl = is_null($wl_id) ? WL : intval($wl_id);

        $list = self::find("email = :email AND wl_id = :wl_id", [':email' => $email, ':wl_id' => $wl]);

        if($list->getCount() == 0) {
            return null;
        }

        return $list->get(0);
    }

    /**
     * Получение пользователей по массиву id
     * @param array $ids
     * @return \Vendor\Core\ActiveRecordList
     */
    static public function findByIds(array $ids) {
        return self::find("id IN (:ids)", [':ids' => $ids]);
    }

    /**
     * Получает пользователя по email и смс коду подтверждения
     * @param $email
     * @param $code
     * @return ActiveRecord
     */
    static public function findByEmailSmsCode($email, $code) {
        return self::findOne("email = :email AND wl_id = :wl_id AND sms_pass_confirm = :code", [':email' => $email, ':wl_id' => WL, ':code' => $code]);
    }

    static protected function dbTable() {
        return 'users';
    }
}

?>
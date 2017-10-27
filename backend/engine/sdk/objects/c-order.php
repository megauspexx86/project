<?php

namespace SDK\Objects;


use SDK\Lib\DateTime;
use Vendor\Core\ActiveRecord;
use Vendor\Core\Error\Ex403;
use Vendor\Core\ExCommon;
use Vendor\Lib\Validator\CRuleDate;
use Vendor\Lib\Validator\CRuleEmail;
use Vendor\Lib\Validator\CRuleIntNumber;
use Vendor\Lib\Validator\CRuleLength;
use Vendor\Lib\Validator\CRuleMaxLength;
use Vendor\Lib\Validator\CRuleMaxValue;
use Vendor\Lib\Validator\CRuleMinLength;
use Vendor\Lib\Validator\CRuleMinValue;
use Vendor\Lib\Validator\CRuleNotEmpty;
use Vendor\Lib\Validator\CRuleNumberFormat;
use Vendor\Lib\Validator\CRuleObjectExists;
use Vendor\Lib\Validator\ExValidateFails;
use Vendor\Lib\Validator\FormValidator;
use SDK\Services\ServiceOrderFeed;
use SDK\Services\ServiceOrderStatus;

class COrder extends ActiveRecord {

    const DELETED_NOT = 0;
    const DELETED_CUSTOMER = 1;
    const DELETED_AUTHOR = 2;
    const DELETED_ALL = 3;
    const DELETED_TEMP = 4;

    const STATUS_NEW = 1;
    const STATUS_AUTHOR_SELECTED = 2;
    const STATUS_AUTHOR_REFUSED = 3;
    const STATUS_WAIT_MONEY = 4;
    const STATUS_NOT_PAYD = 5;
    const STATUS_MAKING_WORK = 8;
    const STATUS_AUTHOR_NOT_SELECTED = 10;
    const STATUS_COMPLETE_WAITAGREE = 13;
    const STATUS_NOT_COMPLETED = 16;
    const STATUS_ORDER_FINISH = 17;
    const STATUS_ORDER_COMPLETED = 18;
    const STATUS_ORDER_COMPLETED_ARBITRAGE = 20;
    const STATUS_ORDER_CANCELED_ARBITRAGE = 21;
    const STATUS_PREPAYMENT = 22;
    const STATUS_PREPAYMENT_FULL = 23;
    const STATUS_CUSTOMER_REFUSED  = 24;

    const STEP_SELECT_AUTHOR = 1;
    const STEP_MAKING_WORK = 2;
    const STEP_FINISHED = 3;

    const TYPE_EDU = 1;
    const TYPE_TRANSLATE = 2;
    const TYPE_COPYRIGHT = 4;
    const TYPE_EXAM = 8;

    //satisfied
    const ORDER_SATISFIED_DEFAULT = 0; // по умолчанию
    const ORDER_IS_COMPLETE = 1; // заказ считать выполненным
    const ORDER_IS_NOT_COMPLETE = 2; // заказ считать невыполненным

    static protected function model() {

        return [
            'owner_id' => '',  'title' => '', 'work_class' => null, 'type' => null, 'language' => null, 'subject' => null,
            'volume_from' => '', 'volume_to' => '', 'task' => '', 'resources' => [], 'budget' => 0, 'currency' => 1,
            'end_day' => null, 'count_steps' => 1, 'create_day' => null, 'select_author_day' => null, 'country' => null,
            'city' => null, 'college' => null, 'faculty' => null, 'department' => null, 'lecturer' => null, 'for_author' => 1,
            'for_agent' => 1, 'status' => COrder::STATUS_NEW, 'step' => null, 'selected_author' => null, 'author_refused' => null, 'cash' => null,
            'old_success' => null, 'status_changed_date' => null, 'status_expire_date' => null, 'complete_resource' => null, 'modify_date' => null,
            'is_warn' => 0, 'fee' => 0, 'deleted' => 0, 'complete_percent' => 0, 'personal_to_author' => 0, 'confirmation_code' => null,
            'has_penalty' => 0, 'penalty_date' => null, 'agency_customer_id' => null, 'agency_customer_price' => null,
            'agency_customer_prepayment' => null, 'agency_customer_term' => null, 'favourites_only' => 0, 'remote_agency_id' => 0, 'user_character' => null, 'bets_count' => 0, 'min_bet' => null,
            'work_id' => null, 'o_number' => null, 'comment' => null, 'migration_status' => null, 'system_comission' => null, 'was_complete_waitagree' => null,
            'prepayment_percent' => null, 'satisfied' => 0, 'discount_id' => null, 'pers_m' => 0, 'pers_status' => 0, 'pers_id' =>null,
            'pers_rate' => 0, 'author_bonus' => 0, 'disc_cons_summ' => null, 'create_source' => "NAPISHEM", 'refuse_comment' => null,
            'unpriced_order' => "NOT", 'user_budget' => 0, 'personal_discount' => "NO", 'search_subject' => '', 'status_discount' => null, 'date_discount' => null,
            'promo_discount' => "NO", 'min_valuate_price' => null, 'max_valuate_price' => null, 'pay_date' => null, 'authors_view' => null, 'in_progress_date' => null,
            'personal' => "NO", 'create_link' => '', 'bank_flag' => '', 'from_remember' => '', 'refused_summ' => null, 'refused_prepayment' => null,
            'promo_discount' => "NO", 'min_valuate_price' => null, 'max_valuate_price' => null, 'pay_date' => null, 'authors_view' => null, 'create_link' => null, 'in_progress_date' => null,
            'personal' => "NO"
        ];
    }

    static public function rules() {
        return [
            'type' => [new CRuleNotEmpty('type'), new CRuleObjectExists('type', 'SDK\Objects\CListElement', 'id = :id')],
            'language' => [new CRuleNotEmpty('language'), new CRuleObjectExists('language', 'SDK\Objects\CLanguage', 'id = :id')],
            'volume_from' => [new CRuleNumberFormat('volume_from', true)],
            'volume_to' => [new CRuleNumberFormat('volume_to', true)],
            'title' => [new CRuleNotEmpty('title')],
            'subject' => [new CRuleNotEmpty('subject')],
            'end_day' => [new CRuleNotEmpty('end_day')]
        ];
    }

    static public function examRules() {
        return [
            'type' => [new CRuleNotEmpty('type'), new CRuleObjectExists('type', 'SDK\Objects\CListElement', 'id = :id')],
            'language' => [new CRuleNotEmpty('language'), new CRuleObjectExists('language', 'SDK\Objects\CLanguage', 'id = :id')],
            //'volume_from' => [new CRuleNumberFormat('volume_from', true)],
            'subject' => [new CRuleNotEmpty('subject')],
            'hour' => [new CRuleNotEmpty('hour'), new CRuleMaxLength('hour', 2), new CRuleMinValue('hour', 0), new CRuleMaxValue('hour', 23)],
            'minute' => [new CRuleNotEmpty('minute'), new CRuleMinValue('minute', 0), new CRuleMaxValue('minute', 59), new CRuleLength('minute', 2)],
            'duration' => [new CRuleNotEmpty('duration')],
            'end_day' => [new CRuleNotEmpty('end_day')]
        ];
    }

    static public function translateRules() {
        return [
            'type' => [new CRuleNotEmpty('type'), new CRuleObjectExists('type', 'SDK\Objects\CListElement', 'id = :id')],
            'volume_from' => [new CRuleNumberFormat('volume_from', true)],
            'volume_to' => [new CRuleNumberFormat('volume_to', true)],
            'language' => [new CRuleNotEmpty('language'), new CRuleObjectExists('language', 'SDK\Objects\CLanguage', 'id = :id')],
            'language_to' => [new CRuleNotEmpty('language_to'), new CRuleObjectExists('language_to', 'SDK\Objects\CLanguage', 'id = :id')],
            'end_day' => [new CRuleNotEmpty('end_day')]
        ];
    }

    static public function copyrightRules() {
        return [
            'type' => [new CRuleNotEmpty('type'), new CRuleObjectExists('type', 'SDK\Objects\CListElement', 'id = :id')],
            'category' => [new CRuleNotEmpty('category'), new CRuleObjectExists('category', 'SDK\Objects\CCategory', 'id = :id')],
            'title' => [new CRuleNotEmpty('title')],
            'language' => [new CRuleNotEmpty('language'), new CRuleObjectExists('language', 'SDK\Objects\CLanguage', 'id = :id')],
            'volume_from' => [new CRuleNumberFormat('volume_from', true)],
            'volume_to' => [new CRuleNumberFormat('volume_to', true)],
            'end_day' => [new CRuleNotEmpty('end_day')]
        ];
    }


    /**
     * Валидация формы создания заказа на главной странице
     * @param $hash
     * @throws ExValidateFails
     */
    static public function validateMainLandingOrderForm($hash) {

        $rules = [
            'type' => [new CRuleNotEmpty('type'), new CRuleObjectExists('type', 'SDK\Objects\CListElement', 'id = :id')],
            'subject' => [new CRuleNotEmpty('subject')],
            'title' => [new CRuleNotEmpty('title')],
            'volume_to' => array(new CRuleNumberFormat('volume_to')),
            'volume_from' => [new CRuleNumberFormat('volume_from', true)],
            'name' => [new CRuleNotEmpty('name')],
            'term_date' => [new CRuleNotEmpty('term_date')],
            'is_email' => [new CRuleEmail('email')]
        ];

        self::run($rules, $hash);

    }

    static public function validateMainLandingOrderFormLogged($hash) {

        $rules = [
            'type' => [new CRuleNotEmpty('type'), new CRuleObjectExists('type', 'SDK\Objects\CListElement', 'id = :id')],
            'subject' => [new CRuleNotEmpty('subject')],
            'title' => [new CRuleNotEmpty('title')],
            'volume_to' => array(new CRuleNumberFormat('volume_to')),
            'volume_from' => [new CRuleNumberFormat('volume_from', true)],
            'term_date' => [new CRuleNotEmpty('term_date')],
        ];

        self::run($rules, $hash);

    }

    /**
     * @param $hash
     * @param null $id
     */
    static public function validate($hash, $id = null) {

        $rules = self::rules();

        if($hash['work_class'] == self::TYPE_EXAM) {
            $rules = self::examRules();
        }
        if($hash['work_class'] == self::TYPE_TRANSLATE) {
            $rules = self::translateRules();
        }

        if($hash['work_class'] == self::TYPE_COPYRIGHT) {
            $rules = self::copyrightRules();
        }

        if(!$id) {
            $rules['end_day'] = [new CRuleNotEmpty('end_day'), new CRuleDate('end_day', (DateTime::getInstance()->time() + 86400), (DateTime::getInstance()->time() + 7776000))];
        }

        self::run($rules, $hash);
    }

    protected static function run($rules, $hash) {
        $validator = new FormValidator();

        foreach($rules as $fields => $f_rules) {
            foreach($f_rules as $rule) {
                $validator->addRule($rule);
            }
        }

        $errors = $validator->validate($hash);

        if($errors) {
            throw new  ExValidateFails(__CLASS__, $errors);
        }
    }

    public function addResource($id) {

        $resources = $this->resources;
        if(!is_array($resources)) {
            $resources = unserialize($resources);
        }

        if(!in_array(intval($id), $resources)) {
            $resources[] = intval($id);
        }

        $this->resources = $resources;
    }

    public function view($fields = []) {

        // Полная цена для заказчика
        if(in_array('price', $fields)) {
            $this->extend('price', $this->budget + $this->fee);
        }

        if(in_array('formatted_terms', $fields)) {
            $this->extend('formatted_terms', (new \DateTime())->setTimestamp(strtotime($this->end_day))->format("d.m.Y"));
        }

        // формат даты создания для ленты заказов
        if(in_array('formatted_create_date', $fields)) {
            $this->extend('formatted_create_date', (new \DateTime($this->create_day))->format("d.m.Y"));
        }
        // формат даты завершения заказа для ленты
        if(in_array('formatted_status_changed_date', $fields)) {
            $this->extend('formatted_status_changed_date', (new \DateTime($this->status_changed_date))->format("d.m.Y"));
        }

        if(in_array('available_payment', $fields)) {
            $this->extend('available_payment', $this->availablePayments());
        }
        if(in_array('trim_task', $fields)) {
            $this->extend('trim_task', trim($this->task));
        }

        return parent::view($fields);
    }

    public function save() {

        $this->modify_date = time();

        if(is_array($this->resources)) {
            $this->resources = serialize($this->resources);
        }

        return parent::save();
    }

    protected function saveInsert() {

        $this->create_day = (new \DateTime())->format('Y-m-d H:i:s');
        $this->setStatus(self::STATUS_NEW);

        return parent::saveInsert();
    }

    public function setStatus($value) {
        (new ServiceOrderStatus($this))->set($value);
        parent::__set('status', $value);
    }

    /**
     * Установка значения поля модели
     * @param $name
     * @param $value
     */
    public function __set($name, $value) {

        if ($name == 'status') {
            throw new ExCommon(0,"Can't set status. Use setStatus() method.");
        }

        if($name == 'pers_id') {
            $this->pers_m = intval(intval($value)  > 0);
        }

        parent::__set($name, $value);
    }

    /**
     * Загружает данные объекта из массива $hash
     * Всегда вырезает ID из переданного массива
     * @param $hash
     * @return ActiveRecord
     */
    public function loadFromHash($hash) {

        if(!array_key_exists('status', $hash)) {
            return parent::loadFromHash($hash);
        }

        if(isset($hash['id'])) {
            unset($hash['id']);
        }

        foreach ($hash as $property => $value) {

            if($property == 'status') {
                parent::__set($property, $value);
            } else {
                $this->$property = $value;
            }
        }

        return $this;
    }

    /**
     * Проверяет может ли заказ быть оплачен
     * @return bool
     */
    public function canPay() {
        return in_array($this->status, [COrder::STATUS_AUTHOR_SELECTED, COrder::STATUS_WAIT_MONEY, COrder::STATUS_NOT_PAYD, COrder::STATUS_PREPAYMENT]);
    }

    /**
     * Проверяет можно ли делать ставку на заказ
     * @return bool
     */
    public function canOffer() {
        return in_array($this->status, [self::STATUS_NEW, self::STATUS_AUTHOR_REFUSED, self::STATUS_CUSTOMER_REFUSED]);
    }

    /**
     * Расчет доступных сумм к оплате
     * @return array
     */
    public function availablePayments() {

        $comissions = $this->_hasAttribute('prepayment') && $this->prepayment ? [0.5, 1] : [1];

        $result = [];

        if ((($this->status == self::STATUS_ORDER_COMPLETED || $this->status == self::STATUS_ORDER_FINISH) && $this->prepayment_percent < 100 ) ||  $this->status == self::STATUS_PREPAYMENT || $this->status == self::STATUS_MAKING_WORK || $this->status == self::STATUS_NOT_COMPLETED || $this->status == self::STATUS_COMPLETE_WAITAGREE || ($this->status == self::STATUS_ORDER_COMPLETED && $this->prepayment_percent == 50)) {

            $to_pay = $this->budget - ceil(($this->budget * (100 - $this->prepayment_percent)) / 100);

            // В случае накопительной скидки, сумма к оплате должна высчитываться с точностью до рубля
            // Поэтому тут необходимо прибегнуть к точному определению второй половины оплаты, в зависимости от текущего процента предоплаты
            // Нам это важно, т.к. на момент введения функционала в продакшн могут быть пользвователи с разными процентами оплаты
            if(($this->budget - $this->cash) != $to_pay) {
                $to_pay = $this->budget - $to_pay;
            }

            $result[] = ['sum' => $to_pay, 'size' => $this->prepayment_percent];

            return $result;
        }

        foreach ($comissions as $size) {
            $sum = $this->budget - ceil(($this->budget * (100 - ($size * 100))) / 100);
            $result[] = ['sum' => $sum, 'size' => $size * 100];
        }

        return $result;
    }


    /**
     * Инициализация объекта Corder из хэша.
     * Сделано для синхронизации старого объекта COrder(старого кабинета) в случае, если объект создаётся в рамках транзакции БД
     * @param $hash
     */
    public function initialize($hash) {
        $this->initFromHash($hash);
        return $this;
    }

    static protected function dbTable() {
        return 'orders';
    }
}

?>
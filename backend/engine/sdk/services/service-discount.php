<?php

namespace SDK\Services;
use Marketing\MarketingValidator;
use SDK\Objects\CActionLog;
use SDK\Objects\CDiscount;
use SDK\Objects\CDiscountRegistration;
use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\COrderBet;
use SDK\Objects\CUser;
use Vendor\Core\Db\DbBridge;
use Vendor\Core\Error\Ex403;
use Vendor\Core\ProjectConfig;
use Vendor\Lib\Validator\ExValidateFails;


/**
 *
 * Реализация функционала по коду скидки
 *
 * Class ServiceDiscount
 * @package SDK\Services
 */
class ServiceDiscount {

    /**
     * Объект CDiscount
     * @var \Vendor\Core\ActiveRecord
     */
    protected $discount;

    /**
     * Объект COrder
     * @var COrder
     */
    protected $order;

    /**
     * Объект CUser
     * @var \Vendor\Core\ActiveRecord
     */
    protected $user;

	/**
	 * Массив игровых скидок, подгружается из конфига
	 * @var array
	 */
	protected $game_discount_codes;

    /**
     * ServiceDiscount constructor.
     * @param $code
     * @param COrder $order
     * @throws ExValidateFails
     */
    public function __construct(COrder $order) {

        $this->order = $order;

        $this->user = CUser::findById($order->owner_id);
     }

    /**
     * Уставновка свойства discount по коду скидки
     * @param $code
     * @throws ExValidateFails
     */
     public function code($code) {
         $this->discount = CDiscount::findByCode($code);

         if(!$this->discount) {
             throw new ExValidateFails(['error' => 'not_exist']);
         }
         return $this;
     }

    /**
     * Проверка всех необходимых условий для применения кода скидки
     */
    public function validate() {

        $this->__marketingValidate();

        $this->__checkOrderStatus();
        $this->__checkLimits();
        $this->__checkActivatePeriod();
        $this->__checkActive();
        $this->__checkBudget();
        $this->__checkOwner();
        $this->__checkRole();
        $this->__checkSignupDate();
        $this->__checkType();

        return $this;
    }

    /**
     * Применение кода скидки
     * @return bool
     */
    public function process() {

        try {

            DbBridge::getInstance()->startTransaction();

            $registration = $this->__saveOrderDiscount();
            $this->__saveOrderBet();
            $this->__saveOrder($registration);

            DbBridge::getInstance()->commit();

        } catch (\Exception $e) {
            DbBridge::getInstance()->rollback();

            return false;
        }

        return true;
    }

    /**
     * Отмена кода скидки
     * @return bool
     */
    public function cancel() {
        if(intval($this->order->discount_id) == 0) {
            return false;
        }

        $discount = CDiscountRegistration::activeDiscount($this->order->id);
        $discount->delete();

        $this->order->discount_id = null;
        $this->order->save();

        return true;
    }


    public function applyFirstOrderBonus() {

        if($this->order->promo_discount != "YES") {
            return false;
        }

        $bet = COrderBet::findByOrderAuthorId($this->order->id, $this->order->selected_author);

        if($bet->discount_sum){
            return false;
        }

        $this->code(ProjectConfig::getInstance()->getKey('common', 'first_order_bonus_code'));
        $this->validate()
            ->process();
    }

    /**
     * Проверка статуса заказа на возможность применения скидки
     * @throws Ex403
     */
    protected function __checkOrderStatus() {
        if(!in_array($this->order->status, [COrder::STATUS_AUTHOR_SELECTED, COrder::STATUS_WAIT_MONEY, COrder::STATUS_NOT_PAYD])) {
            throw new Ex403();
        }
    }

    /**
     * Изменение заказа
     * @param CDiscountRegistration $registration
     * @return $this
     */
    protected function __saveOrder(CDiscountRegistration $registration) {
        $this->order->fee = $this->order->fee - $this->__sum();
        $this->order->budget = $this->order->budget - $this->__sum();
        $this->order->discount_id = $registration->id;
        return $this->order->save();
    }

    /**
     * Сохранение того, что скидака применилась
     * @return $this
     */
    protected function __saveOrderDiscount() {
        $registration = new CDiscountRegistration();
        $registration->discount_id = $this->discount->id;
        $registration->user_id = $this->user->id;
        $registration->order_id = $this->order->id;
        $registration->discount_sum = $this->__sum();
        return $registration->save();
    }

    /**
     * Изменение ставки
     * @return $this
     */
    protected function __saveOrderBet() {
        $bet = COrderBet::findByOrderAuthorId($this->order->id, $this->order->selected_author);
        $bet->fee = $bet->fee - $this->__sum();
        return $bet->save();
    }

    /**
     * Получение суммы скидки
     * @return float
     */
    protected function __sum() {
        return round(($this->order->budget * $this->discount->discount) / 100, -1);
    }

    /**
     * Проверка по условиям текущиех маркетинговых программ
     */
    protected function __marketingValidate() {
        $validator = new MarketingValidator($this->discount, $this->user, $this->order);
        $validator->validate();
    }

    /**
     * Проверка, активен ли код скидки
     * @return bool
     * @throws ExValidateFails
     */
    protected function __checkActive() {
        if($this->discount->status != CDiscount::STATUS_ACTIVE) {
            throw new ExValidateFails(['error' => 'not_active']);
        }
        return true;
    }

    /**
     * Проверка, удовлетворяет ли бюджет заказа условиям скидки
     * @return bool
     * @throws ExValidateFails
     */
    protected function __checkBudget() {
        if($this->discount->min_sum > $this->order->budget) {
            throw new ExValidateFails(['error' => 'invalid_budget', 'param' => $this->discount->min_sum]);
        }
        return true;
    }

    /**
     * Проверка, удовлетворяет ли тип заказа условиям скидки
     * @return bool
     * @throws ExValidateFails
     */
    protected function __checkType() {
        if(intval($this->discount->order_type) != 0 && $this->discount->order_type != $this->order->type) {
            $type = CListElement::findById($this->discount->order_type);
            if (!function_exists('morpher_inflect')) {
                $r = $type->lower_name;
            } else {
                $r = morpher_inflect($type->lower_name, 'rod');
            }
            throw new ExValidateFails(['error' => 'invalid_type', 'param' => $r]);
        }
        return true;
    }

    /**
     * Проверка, удовлетворяет ли роль владельца заказа условиям скидки
     * @return bool
     * @throws ExValidateFails
     */
    protected function __checkRole() {

        if($this->discount->recipient_type == CDiscount::RECIPIENT_TYPE_ALL) {
            return true;
        }

        if($this->discount->recipient_type == CDiscount::RECIPIENT_TYPE_CUSTOMER) {
            if($this->user->role != CUser::ROLE_CUSTOMER || intval($this->user->agency_id > 0)) {
                throw new ExValidateFails(['error' => 'role_customer']);
            }
        }

        if($this->discount->recipient_type == CDiscount::RECIPIENT_TYPE_AGENCY) {
            if($this->user->role != CUser::ROLE_CUSTOMER || intval($this->user->agency_id == 0)) {
                throw new ExValidateFails(['error' => 'role_agency']);
            }
        }

        if($this->discount->recipient_type == CDiscount::RECIPIENT_TYPE_AUTHOR) {
            if($this->user->role != CUser::ROLE_AUTHOR || intval($this->user->is_agent == 0)) {
                throw new ExValidateFails(['error' => 'role_author']);
            }
        }
    }

    /**
     * Проверка на лимит использования кода скидки пользователем
     * @throws ExValidateFails
     */
    protected function __checkLimits() {
        $activated_count = CDiscountRegistration::countActivatedCodes($this->discount->id, $this->user->id);
        if(intval($this->discount->user_limit) != 0 && intval($activated_count) >= intval($this->discount->user_limit)) {
            throw new ExValidateFails(['error' => 'limit_exceed']);
        }
    }

    /**
     * Проверка, доступна ли скидка пользователю
     * @throws ExValidateFails
     */
    protected function __checkOwner() {
        if($this->discount->user_id > 0 && $this->discount->user_id !== $this->user->id) {
            throw new ExValidateFails(['error' => 'invalid_owner']);
        }
    }

    /**
     * Проверка, удовлетворяет ли дата регистрации пользователя условиям скидки
     * @throws ExValidateFails
     */
    protected function __checkSignupDate() {

        $start = 0;
        $finish = time() + 86400;

        $from = $this->discount->signup_from;
        if(!empty($from)) {
            $start = strtotime($from);
        }

        $to = $from = $this->discount->signup_to;
        if(!empty($to)) {
            $finish = strtotime($to);
        }

        $t = strtotime($this->user->create_date);
        if(!($t >= $start && $t <= $finish)) {
            throw new ExValidateFails(['error' => 'signup_date']);
        }
    }

    /**
     * Проверка, возможна ли активация скидки
     * @return bool
     * @throws ExValidateFails
     */
    protected function __checkActivatePeriod() {
        $now = time();
        $from = $this->discount->period_from;
        $to = $this->discount->period_to;

        if(empty($from) && empty($to)) {
            return true;
        }

        if(!empty($from)) {
            $date_from = strtotime($from);
            if($date_from > $now) {
                throw new ExValidateFails(['error' => 'invalid_activate_period']);
            }
        }

        if(!empty($to)) {
            $date_to = strtotime($to);
            if($date_to < $now) {
                throw new ExValidateFails(['error' => 'invalid_activate_period']);
            }
        }
    }

    /**
     * Проверка на то, что заказ находится на этапе оплаты первых 50 %
     * @throws Ex403
     */
    protected function __checkPayment50() {
        if(intval($this->order->prepayment_percent) > 0) {
            throw new Ex403();
        }
    }

}
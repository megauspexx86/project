<?php

namespace SDK\Services;

use SDK\Objects\CDefaultFee;
use SDK\Objects\COrder;
use SDK\Objects\COrderBet;
use SDK\Objects\CRegionFee;
use SDK\Objects\CRegionFeeValue;
use SDK\Objects\CUser;
use SDK\Objects\CUserGeo;
use Vendor\Core\Db\DbBridge;
use Vendor\Lib\RandomGenerator;


/**
 * Class ServiceFee
 * Расчет комиссий системы
 *
 * https://redmine.napdev.ru/issues/10373
 *
 * @package SDK\Services
 * @test ServiceFeeTest
 *
 * При исправлении запуск и написание unit-тестов обязательно
 *
 */
class ServiceFee {

    /**
     * Значение комиссии для заказчиков-агентств
     * не зависят от региона и типа
     */
    const AGENCY_FEE = 25;

    /**
     * Значение ставки на заказ
     *
     * @var int
     */
    protected $__sum;

    /**
     * Заказ на который начисляется комиссия
     *
     * @var COrder
     */
    protected $__order;

    /**
     * Заказчик
     * @var CUser
     */
    protected $__owner;

    /**
     * Автор, который делает ставку
     * @var CUser
     */
    protected $__author;

    /**
     *
     * Локация пользователя
     *
     * @var CRegionFeeValue
     */
    protected $__fee;

    /**
     * Полученный в результате вычеслений %
     * @var int
     */
    protected $__percent;


    /**
     * ServiceFee constructor.
     * @param int $order_id
     */
    public function __construct($order_id) {

        $this->__order = COrder::findById($order_id);
        $this->__owner = CUser::findById($this->__order->owner_id);

        $this->__region();
    }

    /**
     * Получение суммы комиссии
     * @param $sum
     * @param $author_id
     * @param $fee
     * @return float
     */
    public function fee($sum, $author_id, $fee = null) {

        $this->__sum = $sum;
        $this->__author = CUser::findById($author_id);

        if($offer = $this->__existsFee()) {
            return $this->__calc($offer);
        }

        if(!is_null($fee)) {
            return $this->__calc($fee);
        }

        if(($agency = $this->__checkAgencyFee()) !== null) {
            return $this->__calc($agency);
        }

        if($fee = $this->__checkAuthor()) {
            return $this->__calc($fee);
        }

        if(!$this->__fee) {
            return $this->__defaultFee();
        }

        if($this->__fee->getCount() == 0) {
            return $this->__defaultFee();
        }

        return $this->__calc($this->__value());
    }

    /**
     * Получение расчитанного процента
     * @return int
     */
    public function percent() {
        return $this->__percent;
    }

    /**
     * Если в заказе уже есть ставки применяем комиссию которая была выставлена на первую ставку
     */
    protected function __existsFee() {

        if(!$offer = COrderBet::findOne('order_id = :oid', [':oid' => $this->__order->id], ['orderby' => 'id ASC'])) {
            return false;
        }

        return $offer->analytics_fee_percent;
    }


    /**
     * Расчет комиссии для агенства
     * @return null | int
     */
    protected function __checkAgencyFee() {

        if(intval($this->__owner->agency_id) == 0) {
            return null;
        }

        if(intval($this->__author->author_agency_id)) {
            return 0;
        }

        return self::AGENCY_FEE;
    }

    /**
     * Проверка является ли автор агенством (для неоцененных заказов своя комиссия)
     * @return int
     */
    protected function __checkAuthor() {

        if($this->__author->author_agency == "YES") {
            return $this->__authorAgencyFee();
        }

        return 0;
    }

    /**
     * Получение актуальной комиссии для авторов-агентств
     * Функция не использует ActiveRecord объект, тк он в текущей реализации является избыточным
     * @return int
     */
    protected function __authorAgencyFee() {

        $result = DbBridge::getInstance()->query('SELECT fee FROM unpriced_order_settings ORDER BY id DESC LIMIT 0, 1')->fetchHash();

        return intval($result['fee']);
    }

    /**
     * Получение значения комиссии по умолчанию
     * @return int
     */
    protected function __defaultFee() {

        $default = CDefaultFee::findOne('type_id = :id', [':id' => $this->__order->type]);

        return $this->__calc($default->value);
    }

    /**
     * Получение региона пользователя
     */
    protected function __region() {

        /**
         * Локация пользователя не определена
         */
        if(!$location = CUserGeo::findByOwnerId($this->__order->owner_id)) {
            return false;
        }

        /**
         * Локация пользователя установлена, однако учет по данному региону не ведется
         */
        if(!$region = $this->__findRegion($location)) {
            return false;
        }

        $this->__fee = CRegionFeeValue::find('region_id = :rid AND type = :t AND status = :s', [':rid' => $region->id, ':t' => $this->__order->type, ':s' => 'ACTIVE']);
    }

    /**
     * Получение случайного значения комиссии для Типа-Региона, в случае если установлено несколько вариантов
     * @return int
     */
    protected function __value() {

        $rand = $this->__random($this->__fee->getCount());

        return $this->__fee->value[$rand];
    }

    /**
     * Выбор случайного индекса для списка доступных комиссий
     * @param $cnt
     * @return int
     */
    protected function __random($cnt) {
        return RandomGenerator::makeRandom(0, $cnt - 1);
    }

    /**
     * Расчет суммы комиссии в зависимости от переданного $percent
     * @param $percent
     * @return int
     */
    protected function __calc($percent) {

        $this->__percent = $percent;

        return round($this->__sum * $this->__percent / 100);
    }

    /**
     * Поиск наиболее подходящего региона для пользователя по определенной локации
     * @param $location
     * @return null | CRegionFee
     */
    protected function __findRegion(CUserGeo $location) {

        /**
         * Если у пользователя определен ГОРОД и в системе зарегистрирован Регион: СТРАНА-РЕГИОН-ГОРОД
         */
        if($location->city_id) {

            if($by_city = $this->__findRegionByLocation($location->country_id, $location->region_id, $location->city_id)) {
                return $by_city;
            }
        }

        /**
         * Если у пользователя определен РЕГИОН и в системе зарегистрирован Регион: СТРАНА-РЕГИОН-ГОРОД=0
         */
        if($location->region_id) {
            if($by_region = $this->__findRegionByLocation($location->country_id, $location->region_id, 0)) {
                return $by_region;
            }
        }

        /**
         * Если у пользователя определена СТРАНА и в системе зарегистрирован Регион: СТРАНА-РЕГИОН=0-ГОРОД=0
         */
        return $this->__findRegionByLocation($location->country_id, 0, 0);
    }

    /**
     *
     * Поиск региона по точной локации
     *
     * Всегда ищем по трем параметрам тк это данные 3 параметра являются ключом БД
     *
     * @param $country_id
     * @param $region_id
     * @param $city_id
     * @return CRegionFee
     */
    protected function __findRegionByLocation($country_id, $region_id, $city_id) {
        return CRegionFee::findOne('country_id = :cid AND region_id = :rid AND city_id = :city', [':cid' => $country_id, ':rid' => $region_id, ':city' => $city_id]);
    }
}
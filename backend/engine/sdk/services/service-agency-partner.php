<?php

namespace SDK\Services;
use SDK\Objects\CAgencyPartner;
use SDK\Objects\CPersManagers;
use SDK\Objects\CUser;
use Vendor\Core\Error\Ex403;


/**
 *
 * Реализация функций для агентств-партнеров
 *
 * Class ServiceAuthor
 * @package SDK\Services
 */
class ServiceAgencyPartner {

    protected $user;
    protected $agency_settings;

    public function __construct($id) {

        $this->user = CUser::findById($id);

        if(!$this->user || !intval($this->user->agency_id)) {
            throw new Ex403();
        }

        $this->agency_settings = CAgencyPartner::findOne("owner_id = :id", [':id' => $id]);
    }

    /**
     * Получает контрольную сумму для агентства-партнера
     * @param $hash
     * @return string
     */
    public function crc($hash) {
        return sha1(sprintf("%s%s", self::data2Hash($hash), $this->agency_settings->private_key));
    }

    /**
     * Проверяет доступен ли переданный manager_id для привязки его к заказу
     * Работает с менеджерами системы Напишем
     * @param $manager_id
     * @return int
     */
    public function manager($manager_id) {

        if(!$manager_id) {
            return 0;
        }

        $manager = CPersManagers::findById($manager_id);

        if(is_null($manager) || !$manager->status) {
            return 0;
        }

        return $manager_id;
    }

    /**
     * Формирует сумму их переданного массива
     * @param $hash
     * @return string
     */
    static public function data2Hash($hash) {
        ksort($hash);
        return sha1(join('', $hash));
    }

}
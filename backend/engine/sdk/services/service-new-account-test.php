<?php

namespace SDK\Services;
use SDK\Objects\CUser;
use Vendor\Core\Db\DbBridge;
use Vendor\Core\ProjectConfig;
use Vendor\Lib\RandomGenerator;

/**
 *
 * Временный сервис для назначения пользователю кабинета пользования
 *
 * https://redmine.napdev.ru/issues/10389
 *
 * Объекты ActiveRecord отсутствуют
 * Тестами не покрыт
 *
 * Class ServiceNewAccountTest
 * @package SDK\Services
 */
class ServiceNewAccountTest {

    /**
     * Пользователь c которым проходит работа
     * @var CUser
     */
   protected $__user;

   public function __construct(CUser $user) {
       $this->__user = $user;
   }

    /**
     * Выбирает случайным образом аккаунт пользователя в пределах допустимого процента
     * @return bool
     */
   public function account() {

       if(!$this->__validate()) {
           return false;
       }

       if(!$this->__account()) {
           return false;
       }

       DbBridge::getInstance()->insert('new_account_user', ['id' => null, 'user_id' => $this->__id()]);

       return true;
   }

    /**
     * Проверяет аккаунт пользователя (true - новый; false - старый)
     * @return bool
     */
   public function newAccount() {
       $result = DbBridge::getInstance()->query("SELECT COUNT(id) AS cnt FROM new_account_user WHERE user_id = :uid", [':uid' => $this->__id()])->fetchHash();
       return intval($result['cnt']) > 0;
   }

    /**
     * Случайный выбор аккаунта в пределеах установленного процента
     */
   protected function __account() {

       $value = RandomGenerator::makeRandom(1, 100);

       $percent = intval(ProjectConfig::getInstance()->getKey('new_account', 'percent'));

       return $value <= $percent;
   }

    /**
     * Проверка удовлетворяет ли пользователь условиям, при которых возможна активация нового кабинета
     * @return bool
     */
   protected function __validate() {

       if($this->__role() == CUser::ROLE_AUTHOR) {
           return false;
       }

       if($this->__agency() || $this->__whiteLabel()) {
           return false;
       }

       if(strtotime($this->__date()) < strtotime(ProjectConfig::getInstance()->getKey('new_account', 'create_date'))) {
           return false;
       }

       return true;
   }

    /**
     * Получение ID пользователя
     * вынесено в отдельную функцию для возможности использовать объекты старого кабинета в наследниках
     *
     * @return int
     */
   protected function __id() {
       return $this->__user->id;
   }

   /**
     * Получение роли пользователя для валидации
     * вынесено в отдельную функцию для возможности использовать объекты старого кабинета в наследниках
     *
     * @return int
     */
   protected function __role() {
       return $this->__user->role;
   }

    /**
     * Проверяет является ли пользователь агентством
     * вынесено в отдельную функцию для возможности использовать объекты старого кабинета в наследниках
     *
     * @return int
     */
   protected function __agency() {
       return intval($this->__user->agency_id);
   }

   /**
     * Получает wl_id пользователя
     * вынесено в отдельную функцию для возможности использовать объекты старого кабинета в наследниках
     *
     * @return int
     */
   protected function __whiteLabel() {
       return intval($this->__user->wl_id);
   }

   /**
     * Получает дату регистрации пользователя
     * вынесено в отдельную функцию для возможности использовать объекты старого кабинета в наследниках
     *
     * @return string
     */
   protected function __date() {
       return $this->__user->create_date;
   }
}
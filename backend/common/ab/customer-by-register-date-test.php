<?php

namespace Ab;

use SDK\Lib\AbTest;
use SDK\Objects\CUser;

/**
 * Class CustomerByRegisterDateTest
 *
 * AB-тестирование по выборке заказчиков зарегистрированных в заданный период времени
 *
 * @package Ab
 */
class CustomerByRegisterDateTest extends AbTest {

    /**
     * Параметры для проверки данных пользователя
     * @var array
     */
    protected $__params;

    public function __construct($test_id, array $conflict = [], $params = []) {

        parent::__construct($test_id, $conflict);

        $this->__params = $params;
    }

    public function isPossible($id, array $active_tests = []) {

        $user = CUser::findById($id);

        if(intval($user->role) !== CUser::ROLE_CUSTOMER) {
            return false;
        }

        if(isset($this->__params['register_from'])) {
            if(strtotime($user->create_date) < strtotime($this->__params['register_from'])) {
                return false;
            }
        }

        if(isset($this->__params['register_to'])) {
            if(strtotime($user->create_date) > strtotime($this->__params['register_to'])) {
                return false;
            }
        }

        return parent::isPossible($id, $active_tests);
    }
}
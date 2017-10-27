<?php

namespace Ab;

use SDK\Services\ServiceAbTest;

/**
 * Class AbRunner
 * предназначен для запуска тестов для всех версий проекта
 * Остановка теста в период релиза возможна только следующим образом:
 *
 * - Ответвление ветки master в отдельную ветку -> правка данного класса -> обновление ветки master
 *
 *
 * @package Ab
 */
class AbRunner {

    /**
     * id пользователя, который веротно должен быть подвержен тестированию
     * @param int $user_id
     */
    static public function run($user_id) {

        $tests = [

            // Тестирование завершено 09/06/2017
            // new CustomerByRegisterDateTest('CUSTOMER_BET_LIST_01', [], ['register_from' => '2017-05-22 11:00:00'])
            
        ];

        if(!empty($tests)) {
            new ServiceAbTest($user_id, $tests);
        }
    }

}
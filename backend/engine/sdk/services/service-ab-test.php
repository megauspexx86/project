<?php

namespace SDK\Services;

use SDK\Objects\CAbUser;
use Vendor\Lib\RandomGenerator;

class ServiceAbTest {


    /**
     * ID пользователя, который учавствует в тестировании
     *
     * @var int
     */
    protected $__id;

    /**
     * Список активных тестирований
     * @var array
     */
    protected $__tests;

    /**
     * Список ID тестов в которых учавствовал пользователь
     * @var array
     */
    protected $__user_tests = [];


    /**
     * Инициализация активных тестирований
     *
     * @param  $id - user id
     * @param array $tests - активные AB-тесты
     *
     */
    public function __construct($id, $tests = []) {

        $this->__id = $id;

        $this->__tests = $this->__shuffle($tests);

        $this->__userTests();
        $this->__attribute();
    }

    /**
     * Формирование списка тестов в которых учавствовал пользователь
     */
    protected function __userTests() {
        $this->__user_tests = CAbUser::find("owner_id = :id", [':id' => $this->__id])->test_id;
    }

    /**
     * Тасует в случайном порядке тесты для равномерного распределения
     * @param $tests
     */
    protected function __shuffle($tests) {
        shuffle($tests);
        return $tests;
    }

    /**
     *
     * Относит пользователя к первой подходящей тествой группе,
     * если ни одна из групп не подходит, пользователь не будет учавствовать в тестировании
     *
     * @return bool
     */
    protected function __attribute() {

        foreach ($this->__tests as $test) {
            if($test->isPossible($this->__id, $this->__user_tests)) {
                return $this->__save($test->getTestId());
            }

        }

        return false;
    }

    /**
     * Сохраняет участие пользователя в тесте
     * @param string $test_id
     * @return bool
     */
    protected function __save($test_id) {

        $test = new CAbUser();
        $test->owner_id = $this->__id;
        $test->test_id = $test_id;
        $test->variant = RandomGenerator::randomElement(['ORIGINAL', 'SUPPOSE']);
        $test->save();

        return true;
    }

}
<?php

namespace SDK\Lib;


abstract class AbTest {

    /**
     *
     * Уникальный идентификатор теста, на основании которого в дальнейшем будет строиться отчетная выборка
     *
     * Рекомендации по названию:
     *
     *  - заглавные латинские символы
     *  - версия
     *
     *  Например: ORDER_BET_LIST_01
     *
     * @var string
     */
    protected $__test_id;

    /**
     * Конфликтующие тесты
     * @var array
     */
    protected $__conflict;

    /**
     *
     * Инициализируем тест и его ID
     *
     * @param string $test_id
     * @param array $conflict
     */
    public function __construct($test_id, array $conflict = []) {
        $this->__test_id = $test_id;
        $this->__conflict = $conflict;
    }

    /**
     * Получает идентификатор теста
     * @return string
     */
    public function getTestId() {
        return $this->__test_id;
    }


    /**
     * Проверка может ли пользователь учавствовать в тестировании,
     * тут реализована базовая логика на проверку конфликтов тестов и на повторное участие в текущем тестировании
     *
     * @param mixed $id
     * @param array $active_tests
     * @return bool
     *
     */
    public function isPossible($id, array $active_tests = []) {

        if(in_array($this->__test_id, $active_tests)) {
            return false;
        }

        foreach ($active_tests as $test_id) {
            if(in_array($test_id, $this->__conflict)) {
                return false;
            }
        }

        return true;
    }

}
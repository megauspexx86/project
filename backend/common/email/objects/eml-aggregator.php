<?php

namespace Email\Objects;

use SDK\Objects\CUser;
use Vendor\Core\Email;

/**
 *
 * Абстрактный класс для реализации отправки разных писем (зависит от условий)
 * при совершении одного и того же действия над заказом
 *
 * Class EmlAggregator
 * @package Email\Objects
 */
abstract class EmlAggregator {

    /**
     * Объект письма
     * @var Email
     */
    private $__provider;

    /**
     * @var CUser
     */
    protected $__user;

    /**
     * @param CUser $user
     * @param COrder $order
     */
    public function __construct(CUser $user) {

        $this->__user = $user;

        $this->__provider = $this->__initProvider();
    }

    /**
     * Перегрузка public методов и перенаправление вызова на провайдера писем
     * @param $m
     * @param $params
     * @return mixed
     */
    public function __call($m, $params) {
        return call_user_func_array(array($this->__provider, $m), $params);
    }

    /**
     * Выбор провайдера отправки в зависимости от условий
     * @return mixed
     */
    abstract protected function __initProvider();
}
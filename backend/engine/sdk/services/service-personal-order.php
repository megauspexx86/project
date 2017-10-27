<?php

namespace SDK\Services;

use Email\Objects\EmlPersonalOrderAuthor;
use SDK\Objects\COrder;
use SDK\Objects\CPersonalOrder;
use SDK\Objects\CUser;
use SMS\SmsPersonalOrderAuthor;

/**
 *
 * Реализация функций создания персонального заказа
 *
 * Class ServicePersonalOrder
 *
 * @package SDK\Services
 * @tests ServicePersonalOrderTest
 *
 */
class ServicePersonalOrder {

    /**
     * Допустимое количество работ в работе у авторов находящихся на испытательном сроке
     */
    const PROBATION_ACTIVE_LIMIT = 3;

    /**
     * Лимит просроченных у автора заказов
     */
    const EXPIRATION_LIMIT = 2;

    protected $__ids = [];

    protected $__errors = [];

    protected $__added = [];

    /**
     * Добавление ID пользователя к персональному заказу
     * @param int $id
     */
    public function add($id) {

        if(in_array($id, $this->__ids) || in_array($id, $this->__added)) {
            return true;
        }

        if(in_array($id, $this->__errors)) {
            return false;
        }

        if(!$this->__validate($id)) {

            $this->__errors[] = $id;

            return false;
        }

        $this->__ids[] = $id;

        return true;
    }

    /**
     * Инициализация уже добавленных к заказу авторов
     * @param $id
     */
    public function init($id) {
        $this->__added = CPersonalOrder::find("order_id = :id", [':id' => $id])->author_id;
    }

    /**
     * Добавление множества авторов
     * @param array $ids
     */
    public function addIds(array $ids) {

        foreach ($ids as $id) {
            $this->add($id);
        }

        return $this->ids();
    }

    /**
     * Возвращает ID которые не были добавлены
     * @return array
     */
    public function errors() {
        return $this->__errors;
    }

    /**
     * Получает список авторов, которые будут добавлены как персональные к заказу
     */
    public function ids() {
        return $this->__ids;
    }

    /**
     * Сохраняет привязку авторов к персональному заказу и отправляет письмо
     * Функция элементарная и не покрыта тестами
     *
     * @param int $order_id
     */
    public function save($order_id) {

        foreach ($this->__ids as $id) {

            $element = new CPersonalOrder();
            $element->order_id = $order_id;
            $element->author_id = $id;
            $element->save();

            $author = CUser::findById($id);

            $email = new EmlPersonalOrderAuthor($author, $order_id);
            $email->send();

            $sms = new SmsPersonalOrderAuthor($author, $order_id);
            $sms->send();
        }
    }

    /**
     * Отказ от выполнения персонального заказа
     * Функция элементарная и не покрыта тестами
     *
     * @param $order_id
     * @param $author_id
     * @param $comment
     */
    public function refuse($order_id, $author_id, $comment) {

        $offer = CPersonalOrder::findOne('order_id = :oid AND author_id = :uid', [':oid' => $order_id, ':uid' => $author_id]);

        if(!$offer) {
            return false;
        }

        $offer->status = "REFUSED";
        $offer->comment = $comment;
        $offer->save();

        return true;
    }

    /**
     * Проверка прав доступа к персональному заказу
     * не покрыта тестами
     * @param $order_id
     * @param $author_id
     * @return bool
     */
    public function hasAccess($order_id, $author_id) {

        $offer = CPersonalOrder::findOne('order_id = :oid AND author_id = :uid', [':oid' => $order_id, ':uid' => $author_id]);

        if(!$offer) {
            return false;
        }

        return true;
    }


    /**
     * Проверка пользователя на возможность прекрипления к персональному заказу
     * @param $id
     */
    protected function __validate($id) {

        $user = CUser::findById($id, [

            'fields' => [
                'l.result' => 'author_result'
            ],

            'join' => [
                'LEFT JOIN limit_for_user AS l ON l.user_id = users.id'
            ]
        ]);


        if(!$user) {
            return false;
        }

        if($user->role != CUser::ROLE_AUTHOR) {
            return false;
        }

        if($user->admin_confirmation == 0) {
            return false;
        }

        if($user->bet_ability != 1) {
            return false;
        }

        if(!$this->__validateProbation($user->id, $user->author_result)) {
            return false;
        }


        if(!$this->__validateOrderStatus($user->id)) {
            return false;
        }

        return true;
    }

    /**
     * Проверка авторов на испытательном сроке
     * @param $id
     * @param $status
     */
    protected function __validateProbation($id, $status) {

        if(is_null($status) || in_array($status, [2, 3, 4, 5])) {
            return true;
        }

        if(intval($status) == 1) {
            return false;
        }

        // Испытательный срок

        $cnt = COrder::count('selected_author = :uid AND status NOT IN(:status)', [':uid' => $id, ':status' => [COrder::STATUS_ORDER_FINISH, COrder::STATUS_ORDER_COMPLETED, COrder::STATUS_ORDER_COMPLETED_ARBITRAGE, COrder::STATUS_ORDER_CANCELED_ARBITRAGE]]);

        return $cnt < self::PROBATION_ACTIVE_LIMIT;
    }

    /**
     * Проверка статусов заказов, находящихся у автора в работе
     * @param $id
     */
    protected function __validateOrderStatus($id) {

        $cnt = COrder::count('selected_author = :uid AND status = :status', [':uid' => $id, ':status' => COrder::STATUS_NOT_COMPLETED]);

        return $cnt < self::EXPIRATION_LIMIT;
    }

}
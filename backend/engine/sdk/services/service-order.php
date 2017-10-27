<?php

namespace SDK\Services;
use SDK\Objects\CChatMessage;
use SDK\Objects\CUserBlocking;
use SDK\Objects\CUserGroup;
use Vendor\Core\Db\DbBridge;
use Vendor\Core\Error\Ex400;
use SDK\Objects\COrder;
use SDK\Objects\COrderBetOwner;
use SDK\Objects\CUser;
use Vendor\Core\Error\Ex403;
use Vendor\Lib\Validator\ExValidateFails;

/**
 * Class ServiceOrder - работа с заказом
 * @package SDK\Services
 */
class ServiceOrder {

    /**
     * Выбирает среднюю цену заказов по типу
     *
     * @param int $type
     * @param bool $date
     * @return array
     */
    static public function avgBudget($type, $date = false) {

        $criteria = "";
        $params = [':type' => $type, ':step' => COrder::STEP_SELECT_AUTHOR];
        if ($date) {
            $d = date('Y-m-d 00:00:00', time() - (86400 * 30));
            $criteria = "AND create_day >= :date";
            $params[':date'] = $d;
        }

        $result = DbBridge::getInstance()->query("SELECT AVG(budget) AS a_budget FROM orders WHERE type = :type AND step > :step $criteria", $params)->fetchHash();

        $a_budget = intval($result['a_budget']);

        $min_budget = round($a_budget - ($a_budget * 0.3), -1);
        $max_budget = round($a_budget + ($a_budget * 0.1), -1);

        return [$min_budget, $max_budget];
    }

    /**
     * Enter description here...
     *
     * @param COrder $order
     * @param CUser $user
     * @throws ExAclDeny
     */
    static function checkOrderResourceAcl(COrder $order, CUser $user)
    {

        if ($order->owner_id != $user->id && $order->selected_author != $user->id) {
            if (($order->status != COrder::STATUS_NEW || $order->step != COrder::STEP_SELECT_AUTHOR) && $order->status != COrder::STATUS_AUTHOR_REFUSED && $order->status != COrder::STATUS_CUSTOMER_REFUSED) {
                throw new Ex400([]);
            }
        }
    }

    static function getOrderCountsByAuthor($author_id) {
        $extra = [

            'fields' => [
                'count(o1.id)' => 'completed_orders',
                'count(o2.id)' => 'not_completed_orders',
                'count(o3.id)' => 'in_progress_orders',
            ],

            'join' => [
                'LEFT JOIN orders AS o1 ON (o1.id=orders.id AND (o1.status IN (:finished, :completed) OR (o1.status =:completed_arbitrage AND o1.complete_percent >=:percent )) )',
                'LEFT JOIN orders AS o2 ON (o2.id=orders.id AND o2.status =:completed_arbitrage AND o2.complete_percent < :percent )',
                'LEFT JOIN orders AS o3 ON (o3.id=orders.id AND o3.status IN (:making_work, :not_completed) )',
            ]
        ];

        $criteria = [
            "orders.selected_author = :author_id",
        ];

        $params = [':author_id' => $author_id, ':finished' => COrder::STATUS_ORDER_FINISH, ':completed' => COrder::STATUS_ORDER_COMPLETED, ':completed_arbitrage' => COrder::STATUS_ORDER_COMPLETED_ARBITRAGE,
                    ':making_work' => COrder::STATUS_MAKING_WORK, ':not_completed' => COrder::STATUS_NOT_COMPLETED, ':percent' => 80
        ];

        return COrder::findOne(join(" AND ", $criteria), $params, $extra);
    }

    static function getOrdersCountByType($author_id) {
        $extra = [

            'fields' => [
                'l.name' => 'type_name',
                'count(orders.id)' => 'completed_orders'
            ],

            'join' => [
                'JOIN listelements as l ON (l.id = orders.type)'
            ],
            'groupby' => 'l.name',
            'orderby' => 'l.name ASC'
        ];

        $criteria = [
            "orders.selected_author = :author_id", '(orders.status IN (:finished, :completed) OR (orders.status =:completed_arbitrage AND orders.complete_percent >=:percent ))'
        ];

        $params = [':author_id' => $author_id, ':finished' => COrder::STATUS_ORDER_FINISH, ':completed' => COrder::STATUS_ORDER_COMPLETED, ':completed_arbitrage' => COrder::STATUS_ORDER_COMPLETED_ARBITRAGE, ':percent' => 80
        ];

        return COrder::find(join(" AND ", $criteria), $params, $extra);
    }


    /**
     * Получение списка зазазов с непрочитанными сообщениями
     * @todo используется только для чата автора(для заказчика пересмотреть условие owner_id != :user_id )
     * @param $user_id
     * @return \Vendor\Core\ActiveRecordList
     */
    public function getOrdersByNotReadMessages($user_id) {
        $extra = [

            'fields' => [
                'o.id' => 'order_id',
                'count(distinct(chat.id))' => 'new_messages',
                'o.status' => 'status',
                'o.title' => 'title',
                'o.type' => 'type_id',
                'o.work_class' => 'work_class',
                'o.owner_id' => 'owner_id'
            ],

            'join' => [
                'JOIN orders as o ON (chat.order_id = o.id)',
                'JOIN order_bet as ob ON (o.id = ob.order_id)'
            ],
            'groupby' => 'chat.order_id',
            'orderby' => 'MAX(chat.create_day) ASC'
        ];

        return CChatMessage::find('chat.author_id = :user_id AND chat.is_new = :is_new AND o.deleted = :deleted AND o.owner_id != :user_id AND ob.status = :status AND (o.selected_author = :user_id OR o.selected_author = 0 OR ISNULL(o.selected_author) ) AND (chat.only = :user_id OR chat.only = 0)', [':is_new' => 0, ':user_id' => $user_id, ':deleted' => 0, ':status' => 'ACTIVE'], $extra);
    }


    /**
     * Получает заказ с количеством непрочитанных сообщений(для автора)
     * @param $order_id
     * @return \Vendor\Core\ActiveRecord
     */
    public function getOrderWithCountNewMessages($order_id, $user_id) {

        $extra = [

            'fields' => [
                'count(c.id)' => 'new_messages',
                'orders.id' => 'order_id',
                'orders.type' => 'type_id',
            ],

            'join' => [
                'LEFT JOIN chat as c ON (c.order_id = orders.id AND is_new = :is_new AND c.author_id = :user_id)'
            ]
        ];

        return COrder::findOne('orders.id=:order_id AND orders.owner_id != :user_id', [':order_id' => $order_id, ':is_new' => 0, ':user_id' => $user_id], $extra);
    }


    /**
     * Проверка возможности вывода средств
     * @param CUser $author
     * @throws Ex403
     */
    public function validateWithdrawAbility(CUser $author) {

        if ($author->bet_ability == CUser::USER_FULL_BLOCKED) {

            if (CUserBlocking::getLastBlocking($author->id)->can_money_out == 0) {
                throw new ExValidateFails(['user_withdraw_block' => 'blocked']);
            }
        }

        if ($author->bet_ability == CUser::USER_TIME_BLOCKED) {

            if (CUserBlocking::getLastBlocking($author->id)->can_money_out == 0) {
                throw new ExValidateFails(['user_withdraw_block' => 'blocked']);
            }
        }

        if (COrder::count('status = :status AND selected_author = :author_id', [':status' => COrder::STATUS_NOT_COMPLETED, ':author_id' => $author->id]) >= 2) {
            throw new ExValidateFails(['expired_orders' => 'exceeded']);
        }
    }


    /**
     * Получение общей суммы по выполненным заказам
     * @param $user_id
     */
    public function amountFinishedOrders($user_ids) {

        $user_ids = is_array($user_ids) ? $user_ids : array($user_ids);

        $extra = [

            'fields' => [
                'SUM(if(status = :status, cash*complete_percent/100, cash))' => 'total_sum'
            ]
        ];

        $result = COrder::findOne('orders.owner_id IN (:user_ids) AND status IN (:completed_statuses) ', [':user_ids' => $user_ids, ':status' => COrder::STATUS_ORDER_COMPLETED_ARBITRAGE, ':completed_statuses' => [COrder::STATUS_ORDER_COMPLETED, COrder::STATUS_ORDER_COMPLETED_ARBITRAGE]], $extra);

        return $result->total_sum;
    }

    /**
     * Проверка, должен ли примениться бонус за первый заказ
     * @param $order
     * @return bool
     */
    static public function hasOrderBonus($order) {

        // Если нет информации о принадлежносити заказчика к какой-либо промо-группе
        if(!$group = CUserGroup::findByUserId($order->owner_id)) {
            return false;
        }

        if(intval($group->bonus_order_id) > 0) {
            return false;
        }

        $total = COrder::count('owner_id = :owner_id AND id != :order_id', [':owner_id' => $order->owner_id, ':order_id' => $order->id]);

        return $total == 0;
    }

}
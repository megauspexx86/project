<?php

namespace SDK\Services;


use SDK\Objects\COrder;
use SDK\Objects\CSettings;
use SDK\Objects\CUserGroup;
use SDK\Objects\CUserGroupRating;
use Vendor\Core\Error\Ex403;

class ServicePromoGroupRating {

    protected $__rating_from;

    protected $__rating_to;

    public function __construct($user_id) {

        if(!CUserGroup::findByOwner($user_id)) {
            throw new Ex403();
        }
        $this->__rating_from = sprintf('%s 00:00:00', CSettings::findValueByName('rating_from'));
        $this->__rating_to = sprintf('%s 23:59:59', CSettings::findValueByName('rating_to'));
    }

    public function rating() {

        $extra = [
            'fields' => [
                "IF(ug.name <> '', ug.name, u.name)" => 'name',
                "ug.group_owner_id, SUM(IF(status = :status_arbitrage, (o.cash * o.complete_percent) / 100, o.cash))" => 'sum'
            ],

            'join' => [
                'JOIN user_group AS ug ON (user_group_rating.group_owner_id = ug.group_owner_id)',
                'LEFT JOIN orders AS o ON (o.owner_id = ug.user_id AND o.create_day BETWEEN :rating_from AND :rating_to AND o.pay_date BETWEEN :rating_from AND :rating_to)',
                'JOIN users AS u ON (ug.group_owner_id = u.id)'
            ],

            'groupby' => 'user_group_rating.group_owner_id',

            'orderby' => 'sum DESC, COUNT(DISTINCT ug.user_id) desc, ug.id ASC'

        ];

        $sql_params = [':status_arbitrage' => COrder::STATUS_ORDER_COMPLETED_ARBITRAGE, ':rating_from' => $this->__rating_from, ':rating_to' => $this->__rating_to];

        return CUserGroupRating::find([], $sql_params, $extra);
    }

}
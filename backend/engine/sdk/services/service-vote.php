<?php

namespace SDK\Services;
use SDK\Objects\CVote;


/**
 * Class ServiceVote
 *
 * @package App\Services
 */
class ServiceVote {

    protected $author_id;

    public function __construct($author_id){
        $this->author_id = intval($author_id);
    }

    public function getFinishedOrdersOnTime($limit, $offset) {

        $extra = [

            'fields' => [
                'AVG(vote.work_quality)' => 'average_quality',
                'u.name' => 'writer_name',
                'o.type' => 'order_type',
                's.subject_name' => 'subject_name'
            ],

            'join' => [
                'JOIN users AS u ON u.id = vote.from_user',
                'JOIN orders AS o ON o.id = vote.order_id',
                'JOIN subject AS s ON s.id = o.subject',
            ],

            'orderby' => 'vote.id DESC',
            'groupby' => 'vote.id',
            'limit' => abs($limit),
            'offset' => abs($offset)
        ];

        $criteria = [
            "vote.to_user = :author_id"
        ];

        $params = [':author_id' => $this->author_id];

        return CVote::find(join(" AND ", $criteria), $params, $extra);
    }

    public function getCountsFinishedOrders() {
        $extra = [

            'fields' => [
                'COUNT(v1.id)' => 'expired_orders',
                'COUNT(v2.id)' => 'orders_on_time',
                'COUNT(v3.id)' => 'ahead_of_time_orders',
                '(COUNT(v1.id) + COUNT(v2.id) + COUNT(v3.id))' => 'total_count',
                'AVG(vote.work_quality)' => 'average_quality',
            ],

            'join' => [
                'LEFT JOIN vote AS v1 ON (v1.id = vote.id AND v1.time_quality=:delayed)',
                'LEFT JOIN vote AS v2 ON (v2.id = vote.id AND v2.time_quality=:on_time)',
                'LEFT JOIN vote AS v3 ON (v3.id = vote.id AND v3.time_quality=:ahead_of_time)',
            ],
        ];

        $criteria = [
            "vote.to_user = :author_id"
        ];

        $params = [':author_id' => $this->author_id, ':delayed' => CVote::DELAYED, ':on_time' =>CVote::IN_TIME, 'ahead_of_time' => CVote::AHEAD_OF_TIME];

        return CVote::findOne(join(" AND ", $criteria), $params, $extra);
    }

}
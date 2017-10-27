<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

/**
 * Сущность для таблицы author_refused
 * Class CAuthorRefused
 * @package SDK\Objects
 */
class CAuthorRefused extends ActiveRecord {


    /**
     * Model
     * @return array
     */
    static protected function model() {

        return [
           'log_status' => null, 'author_id' => null, 'order_id' => null, 'refuse_date' => null, 'order_type' => null, 'budget' => null, 'author_bet' => null, 'cash' => ''
        ];

    }

    /**
     * Получение количества отказов для автора по уникальным заказам за текущие сутки
     * @param $author_id
     * @return int
     */
    static public function countTodayByAuthor($author_id) {
        $extra = [
            'groupby' => 'order_id'
        ];
        $result = self::find('author_id = :author_id AND DATE(refuse_date) = CURDATE()', [':author_id' => $author_id], $extra);

        return $result->getCount();
    }

    /**
     * Имя таблицы
     * @return string
     */
    static protected function dbTable() {
        return 'author_refused';
    }



}

?>
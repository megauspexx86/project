<?php

namespace SDK\Objects;


use Vendor\Core\ActiveRecord;
use Vendor\Core\Db\DbBridge;

/**
 * Class CListElement
 * @package SDK\Objects
 */
class CListElement extends ActiveRecord {


    static protected function model() {
        return [
            'list_id' => null, 'name' => null, 'lower_name' => null, 'tlower_name' => null, 'sort' => null, 'morph' => null,
            'bet_limit' => 0, 'review_main' => "NO", 'menu_sort' => 0, 'complete_waitagree' => null, 'feed_expire' =>null
        ];
    }
	
    //существует ли тип с данным tlower_name
    static public function hasType($tlower_name) {
       return DbBridge::getInstance()->query('select count(id) as cc from listelements where tlower_name = ?', [$tlower_name])->fetchHash()['cc'] == 1;
    }

    public function save() {

        if(array_key_exists('name', $this->__changes)) {
            $this->lower_name = mb_strtolower($this->name, 'utf-8');
        }

        parent::save();
    }

    static protected function dbTable() {
        return 'listelements';
    }
}

?>
<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CArticle extends ActiveRecord {


    static protected function model() {

        return [
           'code' => null, 'page_title' => null, 'admin_title' => null, 'keywords' => null, 'description' => null,
            'content_title' => null, 'content' => null, 'division_id' => null, 'subdomain' => null, 'aa_directory' => null,
            'article_template' => null, 'order_class' => null, 'content_column' => '', 'category' => 0, 'direct_access' => null
        ];

    }


    static protected function dbTable() {
        return 'article';
    }



}

?>
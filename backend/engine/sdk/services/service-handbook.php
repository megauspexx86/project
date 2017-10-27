<?php

namespace SDK\Services;
use SDK\Objects\CCategory;
use SDK\Objects\CLanguage;
use SDK\Objects\CListElement;
use Vendor\Core\Error\Ex404;


/**
 * Class ServiceType
 * Предназначен для работы с типами работ
 * @package SDK\Services
 */

class ServiceHandbook {

    const WORK_TYPES_LIST_ID = 1;
    const WORK_TYPES_TRANSLATE_LIST_ID = 6;
    const WORK_TYPES_EXAM_LIST_ID = 11;
    const WORK_TYPES_COPYRIGHT_LIST_ID = 8;

    /**
     * @param $list_code
     * @return \Vendor\Core\ActiveRecordList
     * @throws Ex404
     */
    static public function getType($list_code_id) {
        if(!in_array($list_code_id, [self::WORK_TYPES_EXAM_LIST_ID, self::WORK_TYPES_LIST_ID, self::WORK_TYPES_TRANSLATE_LIST_ID, self::WORK_TYPES_COPYRIGHT_LIST_ID])) {
            throw new Ex404();
        }
        return CListElement::find('list_id = :id', [':id' => $list_code_id], ['orderby' => 'sort DESC, name ASC']);
    }

    /**
     * @return ActiveRecordList
     */
    static public function getLanguages() {
        return CLanguage::find("", [], ['orderby' => 'sort ASC']);
    }

    /**
     * Получение категорий для заказа(тип WORK_TYPES_COPYRIGHT_LIST_ID)
     * @return \Vendor\Core\ActiveRecordList
     */
    static public function categories() {
        return CCategory::find("", [], ['orderby' => 'id ASC']);
    }

}
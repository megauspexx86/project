<?php

namespace SDK\Services;
use SDK\Objects\CSubject;

/**
 * Class ServiceSubject
 * Предназначен для реализации логики предметов
 * @package App\Services
 */

class ServiceSubject {

    public function __construct(){}

    /**
     * Получает объект предмет, если не находит создает новый
     * @param $name
     * @return CSubject
     */
    public function forceByName($name) {

        if($subject = $this->getByName($name)) {
            return $subject;
        }

        return $this->create($name);
    }

    /**
     * Получает предмет по имени
     * @param $name
     * @return CSubject | null
     */
    public function getByName($name) {

        $list = CSubject::find("lower_name = :name or subject_name = :name", [':name' => mb_strtolower($name, 'UTF-8')]);

        if($list->getCount()) {
            return $list->get(0);
        }

        return null;
    }

    /**
     * Создает новый предмет
     * @param $name
     * @return CSubject
     */
    public function create($name) {

        $subject = new CSubject();
        $subject->subject_name = $name;
        $subject->subject_type = "PARENT";
        $subject->parent_id = 0;
        $subject->save();

        return $subject;
    }

    /**
     * Восстанавливает удаленный предмет
     * @param CSubject $subject
     */
    public function recovery(CSubject $subject) {
        if($subject->deleted == "YES") {
            $subject->deleted = "NO";
            $subject->is_moderated = "NO";
            $subject->save();
        }
    }
}
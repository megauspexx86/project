<?php

namespace SDK\Objects;


use Vendor\Core\ActiveRecord;

class CSubject extends ActiveRecord {

    const TYPE_SYNONYM = 'SYNONYM';


    static protected function model() {

        return [
            'parent_id' => null, 'subject_name' => null, 'lower_name' => null, 'tlower_name'=> null, 'by_subject' => null, 'sort' => null,
            'work_count' => 0, 'is_moderated' => "NO", 'deleted' => 'NO', 'subject_type' => null, 'create_date' => null
        ];
    }

    public function save() {

        $type = "PARENT";
        if(intval($this->parent_id > 0)) {
            $parent_subject = CSubject::findById($this->parent_id);
            $type = "SUBJECT";
            if($parent_subject->parent_id > 0) {
                $type = "SYNONYM";
            }
        }

        if(array_key_exists('subject_name', $this->__changes)) {
            $this->lower_name = mb_strtolower($this->subject_name, 'utf-8');
        }

        $this->subject_type = $type;

        return parent::save();
    }

    protected function saveInsert() {

        $name = preg_replace("/\"/", "", $this->subject_name);
        $name = preg_replace("/\'/", "", $name);

        $this->subject_name = $name;
        if (empty($this->by_subject)) {
            $this->by_subject = $this->subject_name;
        }

        $this->create_date = (new \DateTime())->format("Y-m-d H:i:s");

        parent::saveInsert();
    }

    static protected function dbTable() {
        return 'subject';
    }
}

?>
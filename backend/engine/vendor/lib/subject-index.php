<?php

namespace Vendor\Lib;


use SDK\Objects\CSubject;
use Vendor\Core\DbRedis;

class SubjectIndex {

    protected $index;

    public function __construct() {
        $this->index = DbRedis::getInstance();
    }

    public function reset() {
        $this->index->flushall();
    }

    public function add(CSubject $subject) {

        if(!$this->_validate($subject)) {
            return false;
        }

        $shingles = $this->_shingles($subject);

        $this->_toCache($subject, $shingles);
    }

    public function find($shingle, $offset = 0, $limit = -1) {

        $shingle = mb_strtolower($shingle, 'utf8');

        if(!$result = $this->index->range($this->key($shingle), $offset, $limit)) {
            return array();
        }

        return array_unique($result);
    }


    /**
     * Формирует ключ для сохранения/извлечения в Redis
     * @param $shingle
     * @return string
     */
    public function key($shingle) {
        return sprintf("SUBJECT:%s:NAME", $shingle);
    }

    /**
     * Проверка предмета
     * @param CSubject $subject
     */
    protected function _validate(CSubject $subject) {

        if($subject->subject_type == "PARENT") {
            return false;
        }

        return true;
    }

    /**
     * @param CSubject $subject
     * @return array of subject shingles
     */
    protected function _shingles(CSubject $subject) {

        $shingles = array();

        $csymbols = implode("", $this->cyrillicAlphabet());

        $subject_words = explode(' ', $subject->lower_name);

        foreach($subject_words as $word) {

            $subject_part_name = preg_replace("/[^a-zA-Z". $csymbols ."0-9\s]/", "", $word);

            for($i = 0; $i < mb_strlen($subject_part_name, 'utf8'); $i++) {
                for($j = 1; $j <= mb_strlen($subject_part_name, 'utf8') - $i; $j++) {

                    $shingle = mb_strtolower(mb_substr($subject_part_name, $i, $j, 'utf8'), 'utf8');
                    if(!in_array($shingle, $shingles)) {
                        $shingles[] = $shingle;
                    }
                }
            }
        }

        // Если имя предмета состоит из нескольких слов, дополнительно добавляем название целиком для верного формирования индекса
        // Если этого не сделать, то для предмета, например, Дискретная математика поиск будет осуществлятся по Дискретная и Математика, но не Дискретная математика
        if(sizeof($subject_words) > 1) {

            $full_name = preg_replace("/[^a-zA-Z". $csymbols ."0-9\s]/", "", $subject->lower_name);

            for($i = 0; $i <= mb_strlen($full_name, 'utf8'); $i++) {
                for($j = 1; $j <= mb_strlen($full_name, 'utf8'); $j++) {
                    $shingle = mb_strtolower(mb_substr($full_name, $i, $j, 'utf8'), 'utf8');
                    if(!in_array($shingle, $shingles)) {
                        $shingles[] = $shingle;
                    }
                }
            }
        }

        return $shingles;
    }


    /**
     * Добавляет в Redis информацию о предметах: Shingle -> Subject name
     * Если в качестве предмета передается синоним, то сохраняем имя родительского предмета
     * @param CSubject $subject
     * @param array $shingles
     */
    protected function _toCache(CSubject $subject, array $shingles) {

        $subject_name = $subject->name;

        if($subject->subject_type == CSubject::TYPE_SYNONYM) {

            $base_subject = CSubject::findById($subject->parent_id);
            $subject_name = $base_subject->name;

            $parent = CSubject::findById($base_subject->parent_id());

        } else {
            $parent = CSubject::findById($subject->parent_id());
        }

        $subject_name = sprintf("%s::%s", $subject_name, $parent->name);

        foreach($shingles as $shingle) {
            $key = $this->key($shingle);
            if(!in_array($subject_name, $this->index->range($key))) {
                $this->index->push($key, $subject_name);
            }
        }
    }


    protected function cyrillicAlphabet() {

        return array(
            'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н',
            'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь',
            'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к',
            'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ',
            'ъ', 'ы', 'ь', 'э', 'ю', 'я'
        );
    }
}

?>
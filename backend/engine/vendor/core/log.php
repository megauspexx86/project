<?php

namespace Vendor\Core;

class Log {

    protected $__filename;

    public function __construct($filename) {
        $this->__filename = $filename;
    }

    /**
     * логирует сообщение $message в $filename
     *
     * @param $message
     */
    public function log($message) {

        if(is_array($message)) {
            $message = $this->__prepare($message);
        }

        $this->save($message);
    }

    /**
     * Сохранение в логе с помощью функции print_r
     * @param $message
     */
    public function print_r($message) {
        $this->save(print_r($message, 1));
    }

    /**
     * Сериализует сообщение-массив
     * @param $message
     * @return string
     */
    protected function __prepare($message) {
        return serialize($message);
    }

    /**
     * Сохранение файла лога
     * @param $message
     */
    protected function save($message) {
        $fp = fopen(TMP_DIR . '/logs/' . $this->__filename, 'a+');
        fwrite($fp, sprintf('%s %s', (new \DateTime())->format('Y-m-d H:i:s'), $message));
        fclose($fp);
    }
}

?>
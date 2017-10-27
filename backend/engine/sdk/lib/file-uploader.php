<?php
namespace SDK\Lib;


use PHPThumb\GD;
use Vendor\Lib\Validator\ExValidateFails;

abstract class FileUploader
{
    protected $file;
    protected $file_name;

    public function __construct($name)
    {
        $this->file = $_FILES[$name];
        $this->_initFileName();
    }

    public function validate() {
        if(!in_array($this->file['type'], $this->_mime())) {
            throw new ExValidateFails(['type' => 'invalid']);
        }

        if(!in_array($this->_getExtension(), $this->_extensions())) {
            throw new ExValidateFails(['extension' => 'invalid']);
        }

        return $this->_validateSize();
    }

    public function getRealFileName() {
        return $this->file['name'];
    }


    /**
     * Метод перемещает файл во временную папку с новым именем
     */
    public function save($dir) {
        move_uploaded_file($this->file['tmp_name'], $dir.'/'.$this->_getFileName());
        return $this->_getFileName();
    }

    public function saveAvatar($dir) {
        $thumb = new GD($this->file['tmp_name']);
        $thumb->adaptiveResize(84, 84);
        $thumb->save($dir.'/'.$this->_getFileName(), 'jpg');
        return $this->_getFileName();
    }

    /**
     * Метод возвращает расширение загружаемого файла
     * @return string
     */

    protected function _getExtension() {
        $info = new \SplFileInfo($this->file['name']);
        return strtolower($info->getExtension());
    }

    /**
     * Метод возвращает имя файла, которое будет сохранено
     */
    protected function _getFileName() {
        return $this->file_name;
    }

    protected function _initFileName() {
        $this->file_name = md5(file_get_contents($this->file['tmp_name'])).'.'.$this->_getExtension();
    }


    abstract protected function _extensions();
    abstract protected function _mime();
    abstract protected function _validateSize();

}
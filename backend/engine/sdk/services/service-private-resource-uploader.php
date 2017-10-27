<?php

namespace SDK\Services;
use Vendor\Core\ProjectConfig;
use SDK\Lib\FileUploader;


/**
 * Class ServiceFileUploader
 * Предназначен для загрузки файлов
 * @package SDK\Services
 */

class ServicePrivateResourceUploader extends FileUploader {

    protected function _validateSize() {
        if($this->file['size'] <= ProjectConfig::getInstance()->getKey('profile', 'max_file_size')) {
            return true;
        }
        return false;
    }

    protected function _extensions() {
        return [
            'gif', 'png', 'pjpeg', 'jpeg', 'jpg'
        ];
    }
    protected function _mime() {
        return [
            'image/gif', 'image/png', 'image/pjpeg', 'image/jpeg', 'image/jpg'
        ];
    }



}
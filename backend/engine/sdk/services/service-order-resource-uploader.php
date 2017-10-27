<?php

namespace SDK\Services;
use Vendor\Core\ProjectConfig;
use SDK\Lib\FileUploader;


/**
 * Class ServiceFileUploader
 * Предназначен для загрузки файлов
 * @package SDK\Services
 */

class ServiceOrderResourceUploader extends FileUploader {

    protected function _validateSize() {
        if($this->file['size'] <= ProjectConfig::getInstance()->getKey('orders', 'max_file_size')) {
            return true;
        }
        return false;
    }

    protected function _extensions() {
        return ProjectConfig::getInstance()->getKey('orders', 'allowed_extensions');
    }

    protected function _mime() {
        return [
            'application/octet-stream','application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/zip', 'application/rar', 'application/x-rar', 'application/rtf', 'text/plain', 'application/x-rar-compressed',
            'image/pjpeg', 'image/jpeg', 'application/x-zip-compressed', 'image/bmp', 'application/pdf', 'image/gif', 'image/png', 'application/vnd.ms-office',
            'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'image/vnd.adobe.photoshop'
        ];
    }



}
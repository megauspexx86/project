<?php

namespace SDK\Services;

use Vendor\Core\ProjectConfig;
use SDK\Objects\CAnketaResource;
use SDK\Objects\CUser;


/**
 *
 * Реализация функций для работы с файлами
 *
 * Class ServiceAuthor
 * @package SDK\Services
 */
class ServicePrivateResource {

    const REQUEST_PASSPORT= 'anketa_resourceP';
    const REQUEST_DIPLOMA = 'anketa_resourceD';
    const REQUEST_SV = 'anketa_resourceSV';
    const REQUEST_SVCH = 'anketa_resourceSVCH';

    public function __construct(CUser $user)
    {
        $this->user = $user;
    }


    /**
     * Сохраняет файлы в таблицу и перемещает из временной папки в папку с файлами
     *
     * @param $files
     * @param $order_id
     * @param $owner_id
     */
    public function saveFiles($files, $request_key, $dir) {

        if(empty($files)) {
            return null;
        }

        switch ($request_key) {

            case self::REQUEST_SV: $type=CAnketaResource::SVID ;  break;
            case self::REQUEST_DIPLOMA:  $type=CAnketaResource::DIPLOM; break;
            case self::REQUEST_PASSPORT: $type=CAnketaResource::PASPORT; break;
            case self::REQUEST_SVCH: $type=CAnketaResource::CHILD; break;

        }

        foreach ($files as $key => $file) {

            $anketa_resource = new CAnketaResource();
            $file['owner_id']=$this->user->id;
            $file['type']=$type;
            $anketa_resource->loadFromHash($file);

            $result = $anketa_resource->save();
            $files[$key]['id'] = $result->id;
            $this->moveFile($file['file_name'], $dir);

        }

        return $files;
    }

    /**
     * Перемещает файл в папку с файлами
     *
     * @param $name
     */

    protected function moveFile($name, $dir) {
        rename(TMP_DIR.'/user_files/'.$name, ProjectConfig::getInstance()->getKey($dir).'/'.$name);
    }


}
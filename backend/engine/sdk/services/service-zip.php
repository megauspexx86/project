<?php
namespace SDK\Services;
use Vendor\Core\ExCommon;
use Vendor\Lib\RandomGenerator;


/**
 * Class ServiceZip
 *
 * @package App\Services
 */
class ServiceZip {
    /**
     * @param $files, массив вида array(array('file_name' => 'xxx', 'original_name' => 'yyy')), где
     * file_name - полный путь к файлу
     * original_name - имя файла в будующем архиве
     * @return bool|string
     * string полный путь к архиву
     * @throws ExCommon
     *
     */
    public function addToZip($files = [], $filename = null){
        if(!count($files)){
            return false;
        }
		$filename = $filename ? $filename : RandomGenerator::makePassword(10) . '.zip';
		
        $archiveName = TMP_DIR . '/zip/' . $filename;
        $zip = new \ZipArchive();
        if ($zip->open($archiveName, \ZipArchive::CREATE) !== true) {
            throw new ExCommon('400', 'zip not created');
        }
        foreach ($files as $i => $item){
            $name = iconv(mb_detect_encoding($item['original_name']), 'CP866//TRANSLIT//IGNORE', $item['original_name']);
            if (!$zip->addFile($item['file_name'], $name)) {
                throw new ExCommon('400', "error add, zip not created");
            }
        }
        $zip->close();
        return $filename;
    }
}


?>
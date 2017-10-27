<?php

namespace SDK\Services;
use Account\Common\Application;
use Vendor\Core\ActiveRecordList;
use Vendor\Core\Db\DbBridge;
use Vendor\Core\Db\DbCriteria;
use Vendor\Core\Error\Ex400;
use Vendor\Core\Error\Ex403;
use Vendor\Core\Error\Ex404;
use Vendor\Core\ProjectConfig;
use SDK\Objects\COrder;
use SDK\Objects\COrderResource;
use SDK\Objects\CUser;


/**
 *
 * Реализация функций для работы с файлами
 *
 * Class ServiceAuthor
 * @package SDK\Services
 */
class ServiceOrderResource {


    public function __construct()
    {
        //$this->order = COrder::findById($order_id);
    }

    /**
     * Получает список файлов для заказа
     * @param $order_id
     * @return ActiveRecordList
     */
    public function files($order_id, $only = null) {

        $extra = [
            'fields' => [
                'users.name' => 'owner_name',
                'users.avatar' => 'owner_avatar',
                'users.role' => 'owner_role'
            ],

            'join' => [
                'JOIN users ON order_resource.owner_id = users.id'
            ]
        ];
        
        $criteria = ["order_id = :oid", "is_deleted = :is_deleted"];
        $sql_params = [':oid' => $order_id, ':is_deleted' => 0];
        
        
        if(isset($only)) {
            $criteria = array_merge($criteria, ['owner_id = :only']);
            $sql_params = array_merge($sql_params, [':only' => $only]);
        }

        return COrderResource::find(join(' AND ', $criteria), $sql_params, $extra);
    }

    /**
     * Скачиваение файла
     * @param $resource_id
     * @param CUser $user
     * @throws Ex400
     */
    public function downloadOrderResource($resource_id, CUser $user) {

        $resource = COrderResource::findById($resource_id);
        $order = COrder::findById($resource->order_id);

        if (intval($order->prepayment_percent) < 100) {

            if ($order->owner_id == $user->id && $resource->owner_id != $user->id) {
                throw new Ex400([]);
            }
        }

        ServiceOrder::checkOrderResourceAcl($order, $user);

        if ($resource->owner_id != $user->id) {
            $resource->is_new = 0;
            $resource->save();
        }

        $this->downloadResource($resource);
    }

    public function checkOrderResource($resource_id, CUser $user) {

        $resource = COrderResource::findById($resource_id);
        $order = COrder::findById($resource->order_id);

        if (intval($order->prepayment_percent) < 100) {

            if ($order->owner_id == $user->id && $resource->owner_id != $user->id) {
                throw new Ex400([]);
            }
        }
    }

    /**
     * Скачка пользовательского файла
     * @param COrderResource $resource
     */
    protected function downloadResource(COrderResource $resource) {

        $fileinfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_buffer($fileinfo, file_get_contents(ProjectConfig::getInstance()->getKey('uploads','user_file_dir').'/' . $resource->file_name));
        finfo_close($fileinfo);

        $extension = strtolower((false === $pos = strrpos($resource->file_name, '.')) ? '' : substr($resource->file_name, $pos + 1));

        if($extension == 'docx') {
            $mime = 'application/vnd.ms-word';
        } else if ($extension == 'xlsx') {
            $mime = 'application/vnd.ms-excel';
        }

        \Account\App\Common\Application::getInstance()->downloadFile($mime, ProjectConfig::getInstance()->getKey('uploads','user_file_dir').'/' . $resource->file_name, $resource->original_name);

    }

    /**
     * Сохранение файлов при редактировании заказа
     * @param $order_id
     * @param $files
     * @return bool
     * @throws Ex403
     * @throws Ex404
     */
    public function editOrderSaveFiles($order_id, $files) {

        if(!$order = COrder::findById($order_id)) {
            throw new Ex404();
        }

        if(in_array($order->status, [COrder::STATUS_ORDER_COMPLETED_ARBITRAGE, COrder::STATUS_ORDER_CANCELED_ARBITRAGE])  || ($order->status == COrder::STATUS_ORDER_COMPLETED && (time() - strtotime($order->status_changed_date)) > 86400 * 30 )){
            throw new Ex403();
        }
        $service_order_resource = new ServiceOrderResource();
        $files = $service_order_resource ->saveFiles($order->id, $files);

        if(in_array($order->status, [COrder::STATUS_WAIT_MONEY, COrder::STATUS_NOT_PAYD, COrder::STATUS_MAKING_WORK, COrder::STATUS_COMPLETE_WAITAGREE, COrder::STATUS_NOT_COMPLETED, COrder::STATUS_ORDER_FINISH, COrder::STATUS_ORDER_COMPLETED])){
            $chat = new ServiceChat($order->owner_id, $order_id);
            $chat->send('', $order->selected_author, 0, 0, 0, $files);
        }


        return true;
    }

    /**
     * Сохраняет файлы в таблицу и перемещает из временной папки в папку с файлами
     *
     * @param $files
     * @param $order_id
     * @param $owner_id
     */
    public function saveFiles($order_id, $files) {

        if(empty($files)) {
            return null;
        }

        $order = COrder::findById($order_id);

        foreach ($files as $key => $file) {

            $order_resource = new COrderResource();
            $file['owner_id']=$order->owner_id;
            $file['order_id']=$order->id;
            $order_resource->loadFromHash($file);
            $result = $order_resource->save();
            $files[$key]['id'] = $result->id;
            $this->moveFile($file['file_name']);

        }

        return $files;
    }

    public function deleteOrderResource($id, CUser $user) {
        $order_resource = COrderResource::findById($id);

        if(!$order_resource) {
            throw new Ex404;
        }

        $order = COrder::findById($order_resource->order_id);

        $this->checkOrderStatusForDelete($order);

        if ($order->owner_id == $user->id && $order_resource->owner_id != $user->id) {
            throw new Ex400([]);
        }

        ServiceOrder::checkOrderResourceAcl($order, $user);

        $order_resource->is_deleted = 1;
        $order_resource->save();
    }

    protected function checkOrderStatusForDelete($order) {

        if (!in_array($order->status, array(COrder::STATUS_NEW, COrder::STATUS_AUTHOR_REFUSED, COrder::STATUS_AUTHOR_NOT_SELECTED, COrder::STATUS_CUSTOMER_REFUSED))) {
            throw new Ex403;
        }

        return true;

    }


    /**
     * Перемещает файл в папку с файлами
     * @todo Можно провести рефакторинг, данная функция используется при загрузке аватаров
     * @param $name
     */

    protected function moveFile($name) {
        rename(TMP_DIR.'/user_files/'.$name, ProjectConfig::getInstance()->getKey('uploads','user_file_dir').'/'.$name);
    }


}
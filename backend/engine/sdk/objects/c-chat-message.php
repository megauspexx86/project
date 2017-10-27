<?php

namespace SDK\Objects;

use Vendor\Core\ActiveRecord;

class CChatMessage extends ActiveRecord {

    const TYPE_MESSAGE = 0; // Просто сообщения между пользователями
    const TYPE_COMMENT_BET = 1; // Комментарий автора при выставлении ставки
    const TYPE_NEW_BET_AUTHOR = 2; // Сообщение системы, Автор сделал ставку
    const TYPE_APPLY_OFFER = 3; // Предложение автора принято, тип будет изменен после получения ответа от автора
    const TYPE_NEW_BET_OWNER = 4; // Сообщение системы, Заказчик сделал ставку (торг) для заказчика
    const TYPE_BET_OWNER_YES = 5; // Сообщение системы, Автор принял торг заказчика
    const TYPE_BET_OWNER_NO = 6; // Сообщение системы, Автор отказал в торге заказчику
    const TYPE_BET_ACTION = 7; // Сообщение системы, Заказчик сделал ставку (торг) для автора
    const TYPE_MATCHING_ORDER = 8; // Сообщение системы, Автор отправил работу на соглсование - требуется подтверждение
    const TYPE_MANY_FILES = 9; // Сообщение системы, Автор отправил множество файлов в чат (для отображения кнопки скачать все)
    const TYPE_ATTACHE_FILE = 10; // Сообщение системы, Автор отправил  файл в чат (для отображения кнопки скачать )
    const TYPE_REFILL = 11;
    const TYPE_SYSTEM_MESSAGE = 12; // Общее сообщение системы
    const TYPE_CUSTOMER_CHOSEN_AUTHOR = 13; //Закзачик выбрал автора, ожидается подтверждение
    const TYPE_PAYMENT_WAITING = 14; //Сообщение от администрации, ожидается оплата

    static protected function model() {
        return [
            'create_day' => null, 'owner_id' => null, 'status' => null, 'order_id' => null, 'text' => null,
            'is_new' => 0, 'author_id' => null, 'mail_send' => 1,  'type' => 0, 'only' => 0, 'admin_id' => 0, 'resource_link' => null
        ];
    }


    /**
     * Получение количества непрочитанных сообщений по номеру заказа и id автора сообщения
     * @param $order_id
     * @param $author_id
     */
    static public function countUnreadMessages($order_id, $author_id, $order_owner_id) {
        return self::count('order_id = :order_id AND owner_id = :author_id AND (only = 0 OR only = :order_owner_id) AND (is_new = 0)', [':order_id' => $order_id, ':author_id' => $author_id, ':order_owner_id' => $order_owner_id]);
    }


	/**
	 * Получение количества непрочитанных сообщений по получателю кроме сообщений от администрации
	 * @param $author_id
	 */
	static public function countUnreadMessagesRecipient($author_id) {
		return self::count('author_id = :author_id AND (only = 0 OR only = :author_id) AND (is_new = 0) and admin_id = 0', [':author_id' => $author_id]);
	}


    public function view($fields = array()) {

        $this->text = nl2br($this->text);

        if(in_array('is_system', $fields) && empty($this->__extension['is_system'])) {
            $this->__extension['is_system'] = intval($this->admin_id) > 0;
        }

        return parent::view($fields);

    }

    protected function saveInsert() {
        $this->create_day = (new \DateTime())->format('Y-m-d H:i:s');
        return parent::saveInsert();
    }

    /**
     * Очистка значений моделей от html тегов
     */
    protected function __clearModel() {
        foreach ($this->__model as $key => $value) {
            if($key == 'text') {
                $this->__model[$key] = $this->__clearValue($value);
            }else{
                parent::__clearValue($value);
            }

        }
    }

    /**
     * Защита от XSS (обрезание опасного html)
     * @param $value
     * @return string
     */
    protected function __clearValue($value) {
        $qevix = new \Qevix();
        $qevix->cfgAllowTags(array("a", 'br'));
        $qevix->cfgSetTagShort(array('br'));
        $qevix->cfgAllowTagParams('a', array('href'));
        $qevix->cfgSetTagParamsRequired('a', 'href');
        $qevix->cfgSetTagCutWithContent(array('script', 'object', 'iframe', 'style'));
        $qevix->cfgSetAutoBrMode(true);
        $value = $qevix->parse($value, $errors);
        $value = preg_replace('/\r\n|\r|\n/u', '', $value);
        return $value;
    }


    static protected function dbTable() {
        return 'chat';
    }
}

?>
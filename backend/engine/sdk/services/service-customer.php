<?php

namespace SDK\Services;

use Partner\Objects\CPartnerComponentStatistic;
use Partner\Objects\CPartnerStatistic;
use Partner\Objects\CPartnerVisit;
use Partner\Services\ServicePartnerStatistic;
use SDK\Objects\CLanguage;
use SDK\Objects\CManagerFixTypes;
use SDK\Objects\COrderArbitrage;
use SDK\Objects\COrderCategory;
use SDK\Objects\COrderTranslate;
use SDK\Objects\CSubject;
use Vendor\Core\ActiveRecordList;
use Vendor\Core\Db\DbBridge;
use Vendor\Core\Db\DbCriteria;
use Vendor\Core\Error\Ex400;
use Vendor\Core\Error\Ex403;
use Vendor\Core\Error\Ex404;
use Vendor\Core\ProjectConfig;
use Vendor\Core\Request;
use Vendor\Core\Session;
use Vendor\Lib\Validator\CRuleNotEmpty;
use Vendor\Lib\Validator\ExValidateFails;
use Vendor\Lib\Validator\FormValidator;
use SDK\Objects\CChatMessage;
use SDK\Objects\CListElement;
use SDK\Objects\CManagerType;
use SDK\Objects\COrder;
use SDK\Objects\COrderBet;
use SDK\Objects\COrderBetOwner;
use SDK\Objects\COrderDeleteCause;
use SDK\Objects\COrderProperty;
use SDK\Objects\CUser;
use SDK\Objects\CVote;
use SDK\Objects\CPersManagers;

/**
 *
 * Реализация функций для заказчика
 *
 * Class ServiceCustomer
 * @package SDK\Services
 */
class ServiceCustomer {

    /**
     * @var $id заказчика
     */
    protected $id;

    public function __construct($id) {
        $this->id = $id;
    }

    /**
     * Создание заказа
     *
     * @todo Метод только частично покрыт тестами
     *
     * @param array $hash
     * @throws ExValidateFails
     * @return COrder
     */
    public function createOrder($hash) {

        try {

            DbBridge::getInstance()->startTransaction();

            $files = isset($hash['files']) ? $hash['files']['order_file'] : [];

            $service_blocking = new ServiceUser();

            $blocking = $service_blocking->getUserBlocking($this->id);

            if($blocking->bet_ability != 1) {
                throw new Ex403();
            }

            $service_subject = new ServiceSubject();
            $subject = $service_subject->forceByName($hash['subject']);
            $service_subject->recovery($subject);

            if(isset($hash['title'])) {
                $title = $hash['title'];
            }

            if($hash['work_class'] && !isset($title)) {
                $text = $hash['subject'];

                if($hash['work_class'] == COrder::TYPE_TRANSLATE) {
                    if (!function_exists('morpher_inflect')) {
                        $text = 'c ' .CLanguage::findById($hash['language'])->name . ' на ' . CLanguage::findById($hash['language_to'])->name;
                    } else {
                        $text = 'c ' .morpher_inflect(CLanguage::findById($hash['language'])->name, 'rod') . ' ' . morpher_inflect(CLanguage::findById($hash['language_to'])->name, 'vin');
                    }
                }

                $title = sprintf("%s %s", CListElement::findById($hash['type'])->name, $text);
            }


            if(!empty($hash['promocode'])) {
                $user = CUser::findById($this->id);
                $promo_service = new ServicePromoGroup($user, $hash['promocode']);
                $promo_service->add();
            }

            $end_day = $hash['terms'];

            if($hash['work_class'] == COrder::TYPE_TRANSLATE) {
                $order_translate_hash = ['language' => $hash['language_to']];
            }

            if($hash['work_class'] == COrder::TYPE_COPYRIGHT) {
                $order_category_hash = ['category_id' => $hash['category']];
            }

            if($hash['work_class'] == COrder::TYPE_EXAM) {

                $property_code = [
                    'hour' => $hash['hour'],
                    'minute' => $hash['minute'],
                    'e_length' => $hash['duration'],
                    'date' => $end_day,
                ];
            }

            $user = CUser::findById($this->id);

            if(!intval($user->agency_id) && $blocking->wl_id == CUser::DEFAULT_WHITE_LABEL && $type_element = $this->_managerType($hash['type'])) {

                if($user->phone || $type_element->phone_required == "NO") {
                	$service = new ServiceManager();
					$service->manager($hash['type'], $user->id);
                    $pers_id = $service->manager($hash['type'], $user->id);
                }

            }

            $order_hash = [
                'volume_from' => isset($hash['volume_from']) ? $hash['volume_from'] : 0,
                'volume_to' => isset($hash['volume_to']) ? $hash['volume_to'] : 0,
                'work_class' => $hash['work_class'] = isset($hash['work_class']) ? $hash['work_class'] : 1,
                'end_day' => (new \DateTime($end_day))->format('Y-m-d'),
                'owner_id' => $this->id,
                'currency' => 1,
                'language' => $hash['language'],
                'language_to' => isset($hash['language_to']) ? $hash['language_to'] : '',
                'category' => isset($hash['category']) ? $hash['category'] : '',
                'task' => isset($hash['task']) ? $hash['task'] : null,
                'type' => $hash['type'],
                'pers_id' => isset($pers_id) ? $pers_id : null,
                'subject' => !$hash['subject'] ? null : $subject->id,
                'title' => $title,
                'hour' => isset($hash['hour']) ? $hash['hour'] : '',
                'minute' =>  isset($hash['minute']) ? $hash['minute'] : '',
                'duration' =>  isset($hash['duration']) ? $hash['duration'] : '',
            ];

            COrder::validate($order_hash);

            unset($order_hash['hour']);
            unset($order_hash['minute']);
            unset($order_hash['duration']);
            unset($order_hash['category']);
            unset($order_hash['language_to']);

            $order = new COrder();
            $order->loadFromHash($order_hash);
            $order->save();

            if(ServiceOrder::hasOrderBonus($order)) {
                $order->promo_discount = "YES";
                $order->save();
            }

            $service_order_resource = new ServiceOrderResource();
            $service_order_resource ->saveFiles($order->id, $files);

            if(!empty($property_code)) {
                foreach ($property_code as $key => $value) {
                    $order_property = new COrderProperty();
                    $order_property->order_id = $order->id;
                    $order_property->property_code = $key;
                    $order_property->property_value = $value;
                    $order_property->save();
                }
            }

            if(!empty($order_translate_hash)) {
                $order_translate = new COrderTranslate();
                $order_translate_hash['order_id'] = $order->id;
                $order_translate->loadFromHash($order_translate_hash);
                $order_translate->save();
            }

            if(!empty($order_category_hash)) {
                $order_category = new COrderCategory();
                $order_category_hash['order_id'] = $order->id;
                $order_category->loadFromHash($order_category_hash);
                $order_category->save();
            }

            //создание персонального заказа
            $personal_ids = Request::getQueryVar('author_ids', []);

            if(Session::getInstance()->current_admin && $personal_ids) {

                $service_personal = new ServicePersonalOrder();
                if(!$service_personal->addIds(explode(',', $personal_ids))) {
                    throw new ExValidateFails(['pers_order_full' => $service_personal->errors()]);
                }
                if($service_personal->errors()) {
                    throw new ExValidateFails(['pers_order_partly' => ['incorrect' => $service_personal->errors(), 'correct' => $service_personal->ids()]]);
                }
                $service_personal->save($order->id);

                /**
                 * Данное условие нужно для того, что если нет авторов подходящих под заказ
                 * снова выставить значение NO, которое может выставляться в YES в ServiceOrder::getInstance()->createOrderInterface()
                 **/

                $set_personal = $service_personal->ids() ? "YES" : "NO";

                $order->personal = $set_personal;
                $order->save();
            }


            $statistic = new ServicePartnerStatistic($this->id);
            $statistic->saveOrderStatistic($order);

            DbBridge::getInstance()->commit();


            return $order;

        } catch(\Exception $e) {
            throw $e;
        } finally {
            DbBridge::getInstance()->rollback();
        }

    }

    /**
     * Редактирование заказа
     * @param $order_id
     * @param $hash
     * @return \Vendor\Core\ActiveRecord
     * @throws ExValidateFails
     */
    public function editOrder($order_id, $hash) {

        $order = $this->__canEditOrder($order_id);

        $hash['type'] = $order->type;

        if(in_array($hash['work_class'], [COrder::TYPE_TRANSLATE, COrder::TYPE_COPYRIGHT])) {
            $hash['subject'] = CSubject::findById(intval($order->subject))->subject_name;

            if($hash['work_class'] == COrder::TYPE_TRANSLATE) {
                $hash['title'] = $order->title;
            }
        }

        $terms = $hash['terms'];

        unset($hash['terms']);


        if($order->status == COrder::STATUS_NOT_COMPLETED) {
            $order->setStatus(COrder::STATUS_MAKING_WORK);
        }
        $terms = (new \DateTime($terms))->format('Y-m-d');

        if(in_array($hash['work_class'], [COrder::TYPE_EDU, COrder::TYPE_TRANSLATE, COrder::TYPE_COPYRIGHT]) && in_array($order->status, [COrder::STATUS_NOT_PAYD, COrder::STATUS_MAKING_WORK, COrder::STATUS_NOT_COMPLETED])) {
            $order = $this->changeOrderDate($terms, $order);
            return $order->save();
        }

        $subject_title = $hash['subject'];
        unset($hash['subject']);

        if($hash['work_class'] == COrder::TYPE_EXAM ) {
            if(!$hash['title']) {
                $hash['title'] = sprintf("%s по %s", CListElement::findById($hash['type'])->name, $subject_title);
            }
            if(!$hash['duration']) {
                $duration = COrderProperty::findOne('order_id = :order_id AND property_code = :property_code', [':order_id' => $order->id, ':property_code' => 'e_length']);
                $hash['duration'] = $duration->property_value;
            }
        }

        $service_subject = new ServiceSubject();
        $subject = $service_subject->forceByName($subject_title);
        $service_subject->recovery($subject);

        if(strtotime($terms) != strtotime($order->end_day)) {
            $order = $this->changeOrderDate($terms, $order);
        }

        $hash = array_merge($hash, [
            'subject' => !$subject_title ? null : $subject->id, 'end_day' => $terms]);


        COrder::validate($hash, $order->id);

        $property_code = [];
        if($hash['work_class'] == COrder::TYPE_EXAM) {
            $property_code = [
                'hour' => $hash['hour'],
                'minute' => $hash['minute'],
                'e_length' => $hash['duration'],
            ];
        }

        unset($hash['hour']);
        unset($hash['minute']);
        unset($hash['duration']);
        unset($hash['language_to']);

        if($hash['work_class'] == COrder::TYPE_COPYRIGHT) {
            $category_id = $hash['category'];
        }

        unset($hash['category']);

        $order->loadFromHash($hash);
        $order->save();

        if(!empty($property_code)) {
            $property_code['date'] = (new \DateTime($terms))->format('d.m.Y');

            foreach ($property_code as $key => $value) {
                if($key == 'e_length' && !in_array($order->status, [COrder::STATUS_NEW, COrder::STATUS_AUTHOR_SELECTED, COrder::STATUS_AUTHOR_REFUSED, COrder::STATUS_CUSTOMER_REFUSED])) {
                    continue;
                }
                $order_property = COrderProperty::findOne('order_id = :order_id AND property_code = :key', [':order_id' => $order->id, ':key' => $key]);
                $order_property->property_value = $value;
                $order_property->save();
            }

            if($hash['work_class'] == COrder::TYPE_EXAM && in_array($order->status, [COrder::STATUS_MAKING_WORK, COrder::STATUS_NOT_COMPLETED])) {
                $order = $this->changeOrderDate($terms, $order);
                return $order->save();
            }
        }

        if(isset($category_id)) {
            $order_category = COrderCategory::findByOrderId($order->id);
            $order_category->category_id = $category_id;
            $order_category->save();
        }

        return $order;
    }

    /**
     * Единый интерфейс получения списка заказов заказчика
     * Возможные значение для переменной статус: inprogress, choose, complete, payment
     * @param int $limit int
     * @param int $offset int
     * @param mixed $status
     * @param mixed $extra_params
     *
     * @return ActiveRecordList
     */
    public function orders($limit, $offset, $extra_params) {

        $extra = [

            'fields' => [
                'subject.subject_name' => 'subject_name',
                'users.avatar' => 'avatar',
                'order_bet.prepayment' => 'prepayment',
                'COUNT(ob.id)' => 'bet_count'
            ],

            'join' => [
                'JOIN subject ON subject.id = orders.subject',
                'LEFT JOIN users ON users.id = orders.selected_author',
                'LEFT JOIN order_bet ON order_bet.order_id = orders.id AND order_bet.author_id = orders.selected_author AND order_bet.status=:offer_status',
                'LEFT JOIN order_bet as ob ON ob.order_id = orders.id AND ob.status=:offer_status',
                'JOIN listelements ON listelements.id = orders.type'
            ],

            'groupby' => 'orders.id',
            'count' => true,
            'orderby' => array_key_exists(':filterstatus', $extra_params['sql_params']) ? 'FIELD(orders.status, :filterstatus), orders.id DESC' :  'orders.id DESC',
            'limit' => abs($limit),
            'offset' => abs($offset)
        ];

        $owner_id = $this->id;

        $criteria = ["orders.owner_id = :oid", "orders.deleted IN(:deleted)"];
        $base_params = [':oid' => $owner_id, ':deleted' => [COrder::DELETED_AUTHOR, COrder::DELETED_NOT], ':offer_status' => 'ACTIVE'];

        $sql_params = array_merge($base_params, [

            ':filterstatus' => []
        ]);

        if(!empty($extra_params)) {
            $criteria = array_merge($criteria, $extra_params['criteria']);
            $sql_params = array_merge($sql_params, $extra_params['sql_params']);
        }

        return COrder::find(join(' AND ', $criteria), $sql_params, $extra);
    }

    /**
     * Считает колчество заказов заказчика группируя по статусам
     * @return array
     */
    public function cntByStatus() {

        $params = [':oid' => $this->id, ':deleted' => [COrder::DELETED_AUTHOR, COrder::DELETED_NOT]];

        $criteria = new DbCriteria([
            'fields' => 'COUNT(id) AS cnt, status',
            'table' => 'orders',
            'where' => "orders.owner_id = :oid AND orders.deleted IN(:deleted)",
            'groupby' => 'status'
        ]);

        $result = DbBridge::getInstance()->query($criteria->sql(), $params);
        $cnt = [];

        while($r = $result->fetchHash()) {
            $cnt[$r['status']] = $r['cnt'];
        }

        return $cnt;
    }

    /**
     * Получение заказа по его ID и проверка прав доступа к заказу
     * @param int $id
     * @throws Ex403()
     * @throws Ex404()
     * @return COrder
     */
    public function order($id) {

        $extra = [

            'fields' => [
                'order_bet.prepayment' => 'prepayment',
                'subject.subject_name' => 'subject_name',
                'order_translate.language' => 'language_to',
                'order_category.category_id' => 'category'
            ],

            'join' => [
                'LEFT JOIN order_bet ON order_bet.order_id = orders.id AND order_bet.author_id = orders.selected_author AND order_bet.status = :bet_status',
                'JOIN subject ON subject.id = orders.subject',
                'LEFT JOIN order_translate ON order_translate.order_id = orders.id',
                'LEFT JOIN order_category ON order_category.order_id = orders.id',
            ]

        ];

        $order = COrder::findOne("orders.id = :id", [':id' => $id, ':bet_status' => "ACTIVE"], $extra);

        //$order = COrder::findById($id);

        if(is_null($order)) {
            throw new Ex404();
        }

        if($order->owner_id != $this->id) {
            throw new Ex403();
        }

        return $order;
    }

    /**
     * Получение списка ставок для заказа и проверка прав доступа
     * @param COrder $order
     * @throws Ex403();
     * @return ActiveRecordList
     */
    public function offers(COrder $order, $extra_params) {

        if($order->owner_id != $this->id) {
            throw new Ex403();
        }

        $extra = [
            'fields' => [
                'u.name' => 'name',
                'u.id' => 'uid',
                'u.avatar' => 'avatar',
                'u.rating_of_ten' => 'author_rating',
                'ROUND(u.rating_of_ten * 10)' => 'author_rating_100',
               // 'COUNT(c.id)' => 'messages'
            ],

            'join' => [
                'JOIN users AS u ON u.id = order_bet.author_id',
                //'JOIN orders AS o ON o.id = order_bet.order_id',
                //'LEFT JOIN chat AS c ON c.order_id = order_bet.order_id AND (c.owner_id = order_bet.author_id) AND (c.only = :to_all OR c.only = :owner_id) AND (c.is_new = 0)'
            ],

            'groupby' => 'order_bet.id',
            'orderby' => $extra_params['sortby'] ? $extra_params['sortby'] : ''
        ];

        $criteria = ["order_bet.status = :status"];
        $params = [':status' => "ACTIVE"];

        $criteria[] = "order_bet.order_id = :oid";
        $params[':oid'] = $order->id;

        return COrderBet::find(join(" AND ", $criteria), $params, $extra);
    }


    public function offer(COrder $order) {

        if($order->owner_id != $this->id) {
            throw new Ex403();
        }

        if(!$order->selected_author) {
            throw new Ex404();
        }

        $extra = [
            'fields' => [
                'u.name' => 'name',
                'u.avatar' => 'avatar',
                'u.rating_of_ten' => 'author_rating',
                'ROUND(u.rating_of_ten * 10)' => 'author_rating_100',
                'COUNT(c.id)' => 'messages'
            ],

            'join' => [
                'JOIN users AS u ON u.id = order_bet.author_id',
                'JOIN orders AS o ON o.id = order_bet.order_id',
                'LEFT JOIN chat AS c ON c.order_id = o.id AND ((c.owner_id = o.owner_id AND c.author_id = order_bet.author_id) OR (c.owner_id = order_bet.author_id AND c.author_id = o.owner_id)) AND (c.only = :to_all OR c.only = o.owner_id)'
            ]
        ];

        $criteria = ["order_bet.status = :status"];
        $params = [':status' => "ACTIVE", ':to_all' => 0];

        $criteria[] = "order_bet.order_id = :oid";
        $params[':oid'] = $order->id;

        $criteria[] = "order_bet.author_id = :author_id";
        $params[':author_id'] = $order->selected_author;

        return COrderBet::find(join(" AND ", $criteria), $params, $extra);
    }


    /**
     * Получает количество непрочитанных сообщений для списка ставок по пользователям
     * @param $uids
     * @param $order_id
     * @return array
     */
    public function unreadMessagesCounts($uids, $order_id, $order_owner_id) {
        $unread_messages_counts = [];

        foreach ($uids as $uid) {
            $unread_messages_counts[] =
                [
                    'count' => CChatMessage::countUnreadMessages($order_id, $uid, $order_owner_id),
                    'user_id' => $uid
                ];
        }
        return $unread_messages_counts;
    }

    /**
     * Выбирает автора, на основе переданного предложения (ставки)
     * @param int $offer_id
     * @return COrderBet
     */
    public function chooseAuthor($offer_id) {

        if(!$offer = COrderBet::findById($offer_id)) {
            throw new Ex404();
        }

        if($offer->status == COrderBet::DELETED) {
            throw new Ex403();
        }

        $order = $this->order($offer->order_id);

        if(!in_array($order->status, [COrder::STATUS_NEW,COrder::STATUS_AUTHOR_REFUSED, COrder::STATUS_AUTHOR_NOT_SELECTED, COrder::STATUS_CUSTOMER_REFUSED])) {
            throw new Ex403();
        }

        $order->budget = $offer->customerSum();
        $order->setStatus(COrder::STATUS_AUTHOR_SELECTED);
        $order->select_author_day = (new \DateTime())->format('Y-m-d');
        $order->selected_author = $offer->author_id;
        $order->fee = $offer->fee;
        $order->min_bet = $offer->summ;
        $order->save();

        //здесь должна применится скидка на первый заказ
        $discount = new ServiceDiscount($order);
        $discount->applyFirstOrderBonus();

        //Пересчёт накопительной скидки
        $cumulative_discount = new ServiceCumulativeDiscount($order->owner_id);
        $cumulative_discount->recount();
        $cumulative_discount->registerDiscount($offer, $order);

        $service_chat = new ServiceChat($order->owner_id, $order->id);
        $service_chat->changeMessageTypeByMessageOwner(CChatMessage::TYPE_NEW_BET_AUTHOR, CChatMessage::TYPE_APPLY_OFFER, $offer->author_id, $order->owner_id);

        $service_chat = new ServiceChat($order->selected_author, $order->id);
        $service_chat->changeMessageTypeByMessageOwner(CChatMessage::TYPE_NEW_BET_OWNER, CChatMessage::TYPE_MESSAGE, $order->owner_id, $order->selected_author);

        $owner_bet = COrderBetOwner::findOne("order_id = :order_id AND owner_id = :owner AND author_id = :author_id AND status=:status", [':owner' => $order->owner_id, ':order_id' => $order->id, ':author_id' => $order->selected_author, ':status' => 0]);

        if(!empty($owner_bet)) {
            $owner_bet->status = 1;
            $owner_bet->save();
            $service_chat = new ServiceChat($order->selected_author, $order->id);
            $service_chat->changeMessageType(CChatMessage::TYPE_NEW_BET_OWNER, CChatMessage::TYPE_MESSAGE, $offer->author_id);
        }

        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');

        // для заказчика
        $customer_message = vsprintf($locale['CHOOSE_AUTHOR'], []);
        $messages[] = (new ServiceChat($this->id, $order->id))->send($customer_message, $offer->author_id, CChatMessage::TYPE_REFILL, $order->owner_id, 1);


        // для автора
        $author_message = vsprintf($locale['REFILL'], []);
        $messages[] = (new ServiceChat($this->id, $order->id))->send($author_message, $offer->author_id, CChatMessage::TYPE_CUSTOMER_CHOSEN_AUTHOR, $order->selected_author, 1);

        (new ServiceOnline())->sendMessages($messages);
        //обновление нового чата автора
        (new ServiceOnline())->updateChat($offer->author_id,$order->id, $order->owner_id);


        return $offer;
    }


    /**
     *
     * Принятие выполненной работы
     * @param $order_id
     * @return \Vendor\Core\ActiveRecord
     * @throws Ex403
     * @throws Ex404
     */
    public function acceptOrder($order_id, $hash) {

        $validator = new FormValidator();
        $validator->addRule(new CRuleNotEmpty('author_response'));

        $errors = $validator->validate($hash);

        if($errors) {
            throw new  ExValidateFails(__CLASS__, $errors);
        }

        $order = COrder::findById($order_id);

        if(is_null($order)) {
            throw new Ex404();
        }

        if ($order->status != COrder::STATUS_COMPLETE_WAITAGREE) {
            throw new Ex403();
        }

        if(COrderArbitrage::getActiveBid($order->id)) {
            throw new ExValidateFails(['arbitrage_bid' => 'active']);
        }

        $order->setStatus(COrder::STATUS_ORDER_FINISH);
        $order->complete_percent = 100;
        $order->save();

        $hash['from_user'] = $this->id;
        $hash['to_user'] = $order->selected_author;
        $hash['order_id'] = $order->id;
        $vote = new CVote();
        $vote->loadFromHash($hash);
        $vote->save();

        $end_day =  new \DateTime($order->status_expire_date);

        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');
        $months = ProjectConfig::getInstance()->getKey('locale', 'months');

        $customer_message = vsprintf($locale['ACCEPT_ORDER'], [$end_day->format('d'), $months[(int)$end_day->format('m')], $end_day->format('Y')]);
        $message = (new ServiceChat($this->id, $order->id))->send($customer_message, $order->selected_author, CChatMessage::TYPE_SYSTEM_MESSAGE, 0, 1);
        (new ServiceOnline())->chat($message);

        return $order;

    }

    /**
     * Отправка на доработку
     * @param $order_id
     * @throws Ex403
     * @throws Ex404
     */
    public function reworkOrder($order_id) {

        $validator = new FormValidator();
        $validator->addRule(new CRuleNotEmpty('comment'));

        $errors = $validator->validate(Request::getAll());

        if($errors) {
            throw new  ExValidateFails(__CLASS__, $errors);
        }

        $order = COrder::findById($order_id);

        if(is_null($order)) {
            throw new Ex404();
        }

        if ($order->status != COrder::STATUS_COMPLETE_WAITAGREE) {
            throw new Ex403();
        }

        $order->setStatus(COrder::STATUS_MAKING_WORK);
        //$order->end_day = date("Y-m-d H:i:s", 86400 + time());
        $order->save();

        $service_chat = new ServiceChat($order->owner_id, $order->id);
        $service_chat->changeMessageType(CChatMessage::TYPE_MATCHING_ORDER, CChatMessage::TYPE_MESSAGE);

        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');
        $months = ProjectConfig::getInstance()->getKey('locale', 'months');

        $end_day =  new \DateTime($order->end_day);
        $customer_message = vsprintf($locale['NO_ACCEPT_ORDER'], [$end_day->format('d'), $months[(int)$end_day->format('m')], $end_day->format('Y')]);
        $messages[] = (new ServiceChat($this->id, $order->id))->send($customer_message, $order->selected_author, CChatMessage::TYPE_SYSTEM_MESSAGE, 0, 1);
        $messages[] = (new ServiceChat($this->id, $order->id))->send(Request::getQueryVar('comment'), $order->selected_author, 0);

        $files = Request::getQueryVar('files');
        if(!empty($files)) {

            $service_order_resource = new ServiceOrderResource();
            $files = $service_order_resource->saveFiles($order_id, $files['order_file']);

            $service_chat = new ServiceChat($this->id, $order->id);
            $messages[] = $service_chat->send('', $order->selected_author, 0, 0, 0, $files);
        }




        (new ServiceOnline())->sendMessages($messages);

        return $order;

    }


    /**
     * Ставка заказчика в торге
     * @param $hash
     * @return COrderBetOwner
     * @throws Ex403
     * @throws Ex404
     */
    public function setNewOwnerBet($hash) {

        $order = COrder::findById($hash['order_id']);

        if(is_null($order)) {
            throw new Ex404();
        }
        $discount = $hash['discount'];
        unset($hash['discount']);

        $list = COrderBetOwner::findByOrderOwnerAuthorId($order->id, $this->id, $hash['author_id']);

        if(($list && $list->get(0)->status !=1)) {
            throw new Ex404;
        }

        if($list && $list->getCount() == 5) {
            throw new Ex404;
        }

        $order_bet = COrderBet::findByOrderAuthorId($order->id, $hash['author_id']);

        if($hash['bet'] < ((($order_bet->summ + $order_bet->fee) - (($order_bet->summ + $order_bet->fee) * 0.3)))) {
            throw new Ex403;
        }

        if(!in_array($order->status, array(COrder::STATUS_NEW, COrder::STATUS_AUTHOR_REFUSED, COrder::STATUS_AUTHOR_NOT_SELECTED, COrder::STATUS_CUSTOMER_REFUSED))){
            throw new Ex403;
        }

        $owner_bet = new COrderBetOwner();

        $hash['owner_id'] = $this->id;
        $hash['status'] = 0;
        $owner_bet->loadFromHash($hash);
        $owner_bet->save();

        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');

        $text = $discount < 0 ? $locale['TO_INCREASE_BARGAIN'] : $locale['TO_REDUCE_BARGAIN'];
        $new_sum = ceil(($order_bet->summ * ((100 - $discount) / 100) / 10)) * 10;

        $author_message = vsprintf($text, [$new_sum]);
        $messages[] = (new ServiceChat($this->id, $order->id))->send($author_message, $owner_bet->author_id, CChatMessage::TYPE_NEW_BET_OWNER, $owner_bet->author_id);

        // для заказчика
        $customer_message = vsprintf($text, [$owner_bet->bet]);
        $messages[] = (new ServiceChat($this->id, $order->id))->send($customer_message, $owner_bet->author_id, CChatMessage::TYPE_MESSAGE, $order->owner_id);

        (new ServiceOnline())->sendMessages($messages);

        return $owner_bet;

    }

    /**
     * Отказ заказчиком от автора
     * @param $order_id
     * @throws Ex403
     * @throws Ex404
     */
    public function declineAuthor($order_id) {

        $order = $this->order($order_id);

        if(!in_array($order->status, [COrder::STATUS_AUTHOR_SELECTED, COrder::STATUS_WAIT_MONEY, COrder::STATUS_NOT_PAYD])) {
            throw new Ex403();
        }
        $author_id = $order->selected_author;
        $offer = COrderBet::findByOrderAuthorId($order->id, $author_id);

        if(!$offer) {
            throw new Ex403;
        }

        $order->setStatus(COrder::STATUS_CUSTOMER_REFUSED);
        $order->selected_author = 0;
        $order->budget = 0;
        $order->save();

        $offer->is_new = 0;
        $offer->save();

        //удаляем накопительную скидку
        $cumulative_discount = new ServiceCumulativeDiscount($order->owner_id);
        $cumulative_discount->delete($order);

        $service_chat = new ServiceChat($order->owner_id, $order->id);
        $service_chat->changeMessageType(CChatMessage::TYPE_APPLY_OFFER, CChatMessage::TYPE_NEW_BET_AUTHOR, $order->owner_id);
        $service_chat = new ServiceChat($author_id, $order->id);
        $service_chat->changeMessageType(CChatMessage::TYPE_REFILL, CChatMessage::TYPE_MESSAGE, $order->owner_id);
        $service_chat->changeMessageType(CChatMessage::TYPE_CUSTOMER_CHOSEN_AUTHOR, CChatMessage::TYPE_MESSAGE, $author_id);

        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');

        //сообщение заказчику
        $customer_message = vsprintf($locale['DECLINE_AUTHOR_TO_CUSTOMER'], []);
        $messages[] = (new ServiceChat($author_id, $order->id))->send($customer_message, $order->owner_id, CChatMessage::TYPE_MESSAGE, $order->owner_id, 1);

        //сообщение автору
        $customer_message = vsprintf($locale['DECLINE_AUTHOR_TO_AUTHOR'], []);
        $messages[] = (new ServiceChat($this->id, $order->id))->send($customer_message, $author_id, CChatMessage::TYPE_MESSAGE, $author_id, 1);


        (new ServiceOnline())->sendMessages($messages);
        //необходимо для обновления нового чата автора
        (new ServiceOnline())->updateChat($author_id,$order->id, $order->owner_id);
        //(new ServiceOnline())->updateChat($order->owner_id,$order->id, $author_id);
    }

    /**
     * Удаление заказа заказчиком
     * @param $hash
     * @return \Vendor\Core\ActiveRecord
     * @throws Ex403
     * @throws Ex404
     */
    public function deleteOrder($hash) {
        $order = COrder::findById($hash['order_id']);

        if(is_null($order)) {
            throw new Ex404();
        }

        if(!in_array($order->status, [COrder::STATUS_NEW,COrder::STATUS_AUTHOR_REFUSED, COrder::STATUS_NOT_PAYD, COrder::STATUS_AUTHOR_NOT_SELECTED, COrder::STATUS_ORDER_COMPLETED, COrder::STATUS_CUSTOMER_REFUSED])) {
            throw new Ex403();
        }

        $order->deleted = COrder::DELETED_CUSTOMER;
        $order->save();

        if($order->status != COrder::STATUS_ORDER_COMPLETED) {
            $cause = new COrderDeleteCause();
            $cause->order_id = $order->id;
            $cause->owner_id = $order->owner_id;
            $cause->cause = $hash['cause'];
            $cause->comment = isset($hash['comment']) ? $hash['comment'] : '';
            $cause->order_create_date = $order->create_day;
            $cause->type = $order->type;
            $cause->save();
        }

        if($order->status == COrder::STATUS_ORDER_COMPLETED && $order_bets = COrderBet::find('order_id = :oid', [':oid' => $order->id])) {
            foreach($order_bets as $order_bet) {
                $order_bet->status = COrderBet::DELETED;
                $order_bet->save();
            }
        }

        return $order;

    }

    /**
     * Помечает ставку автора как "Скрыто заказчиком"
     * @param $offer_id
     * @return bool
     */
    public function hideOffer($offer_id) {

        $offer = COrderBet::findById($offer_id);

        $order = COrder::findById($offer->order_id);

        if($order->owner_id != $this->id || intval($order->personal_to_author) > 0) {
            return false;
        }

        $offer->status = "HIDE_CUSTOMER";
        $offer->save();

        (new ServiceAuthor($offer->author_id))->recountOffers($order);

        (new ServiceActionLog('CUSTOMER_HIDE_OFFER'))->log($this->id, $offer->id);

        return true;
    }

    /**
     * Проверка на возможность редактирования заказа
     * @param $order_id
     * @return \Vendor\Core\ActiveRecord
     * @throws Ex403
     * @throws Ex404
     */
    protected function __canEditOrder($order_id) {

        if(!$order = COrder::findById($order_id)) {
            throw new Ex404();
        }

        if(in_array($order->work_class, [COrder::TYPE_EDU, COrder::TYPE_TRANSLATE, COrder::TYPE_COPYRIGHT])) {

            if(!in_array($order->status, [COrder::STATUS_NEW, COrder::STATUS_AUTHOR_SELECTED, COrder::STATUS_AUTHOR_REFUSED, COrder::STATUS_NOT_PAYD, COrder::STATUS_MAKING_WORK, COrder::STATUS_NOT_COMPLETED, COrder::STATUS_CUSTOMER_REFUSED])) {
                throw new Ex403();
            }

        }

        if($order->work_class == COrder::TYPE_EXAM) {

            if(!in_array($order->status, [COrder::STATUS_NEW, COrder::STATUS_AUTHOR_SELECTED, COrder::STATUS_AUTHOR_REFUSED, COrder::STATUS_CUSTOMER_REFUSED, COrder::STATUS_MAKING_WORK, COrder::STATUS_NOT_COMPLETED])) {
                throw new Ex403();
            }

        }

        return $order;
    }


    /**
     * Изменение даты выполнения при редактировании заказа
     * @param $terms
     * @param $order
     * @return mixed
     * @throws Ex403
     */
    protected function changeOrderDate($terms, $order) {

        if ( ($order->work_class != COrder::TYPE_EXAM && (strtotime($terms) - strtotime($order->end_day)) < 86400) || (strtotime($terms) - strtotime((new \DateTime())->format('d.m.Y'))) < 86400) {
            throw new Ex403();
        }

        if($order->work_class == COrder::TYPE_EXAM && (strtotime($terms) - strtotime((new \DateTime())->format('d.m.Y'))) < 86400) {
            throw new Ex403();
        }

        $old_date = $order->end_day;

        if($old_date == $terms) {
            return $order;
        }

        $order->end_day = $terms;

        if(in_array($order->status, [COrder::STATUS_MAKING_WORK, COrder::STATUS_NOT_COMPLETED])) {
            $order->status_expire_date = $terms. " " . (new \DateTime($order->status_expire_date))->format('H:i:s');
        }

        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');

        if(!$order->selected_author) {
            $extra_params['sortby'] = 'id ASC';
            $offers = $this->offers($order, $extra_params);
            $messages = array();
            foreach($offers as $offer) {
                $customer_message = vsprintf($locale['CHANGE_DATE'], [(new \DateTime($old_date))->format('d.m.Y'), (new \DateTime($terms))->format('d.m.Y')]);
                $messages[] = (new ServiceChat($this->id, $order->id))->send($customer_message, $offer->author_id, CChatMessage::TYPE_MESSAGE);
            }
            (new ServiceOnline())->sendMessages($messages);
        } else {
            $customer_message = vsprintf($locale['CHANGE_DATE'], [(new \DateTime($old_date))->format('d.m.Y'), (new \DateTime($terms))->format('d.m.Y')]);
            $message = (new ServiceChat($this->id, $order->id))->send($customer_message, $order->selected_author, CChatMessage::TYPE_MESSAGE);
            (new ServiceOnline())->chat($message);
        }

        return $order;
    }


    /**
     * Проверяет, достпуен ли персональный менеджер для типа $type
     * @param $type
     * @return bool
     */
    protected function _managerType($type) {

        if($element = CManagerType::findByTypeId($type)) {
            if($element->status == "ENABLED") {
                return $element;
            }
        }

        return false;
    }
	//@depricated
	protected function _managerByMinCountOrders($bytype = 0) {
		$params = [
			'table' => 'pers_managers',
			'fields' => 'pers_managers.id AS id, COUNT(orders.id) AS cnt',
			'where' => 'pers_managers.status = :m_status',
			'join' => [
				'LEFT JOIN orders ON pers_id = pers_managers.id AND orders.status IN(:o_status)'
			],
			'groupby' => 'pers_managers.id',
			'orderby' => 'cnt ASC',
			'limit' => 1,
			'offset' => 0
		];
		$values = [':m_status' => 1, ':o_status' => [
			COrder::STATUS_NEW, COrder::STATUS_AUTHOR_SELECTED, COrder::STATUS_AUTHOR_REFUSED,
			COrder::STATUS_CUSTOMER_REFUSED, COrder::STATUS_WAIT_MONEY]];
		if ($bytype) {
			//ищем среди менеджеров закрепленных за типом работ
			$fix_manager_ids = CManagerFixTypes::findByTypeId($bytype)->manager_id;
			if (count($fix_manager_ids)) {
				$params['where'] .= ' and pers_managers.id in (:pers_ids)';
				$values[':pers_ids'] = $fix_manager_ids;
			}
		}
		//менеджеры в предыдущих заказах


		$active_managers = CPersManagers::find('status = :status', array(':status' => CPersManager::STATUS_ACTIVE));
		$last_orders = COrder::find('pers_m = :pers_m',[':pers_m' => 1], array('ORDER_BY'=>'id DESC','LIMIT'=>abs($active_managers->getCount()-1)));

		$criteria = new DbCriteria($params);
		$result = DbBridge::getInstance()->query($criteria->sql(), $values);
		if(!$result->rowCount()) {
			return 0;
		}
		$res = intval($result->fetchHash()['id']);
		return $res;
	}
	//Если у пользователя заказ с менеджером и менеджер активен, выбираем его
	// @depricated
	protected function _managerByOrders($bytype = 0) {

		$params = [
			'table' => 'orders',
			'fields' => 'pers_id as pid',
			'where' => 'pers_m = :status AND owner_id = :uid',
			'offset' => 0,
			'limit' => 1,
			'join' => [
				'JOIN pers_managers ON pers_managers.id = orders.pers_id AND pers_managers.status = :m_status'
			],
			'orderby' => 'orders.id desc'
		];
		$values = [':status' => 1, ':uid' => $this->id, ':m_status' => 1];
		if ($bytype) {
			//ищем среди менеджеров закрепленных за типом работ
			$fix_manager_ids = CManagerFixTypes::findByTypeId($bytype)->manager_id;
			if (count($fix_manager_ids)) {
				$params['where'] .= ' and pers_id in (:pers_ids)';
				$values[':pers_ids'] = $fix_manager_ids;
			}
		}
		$criteria = new DbCriteria($params);
		$query = DbBridge::getInstance()->query($criteria->sql(), $values);
		$res = $query->fetchHash();
		return intval(isset($res['pid']) ? $res['pid'] : 0);
	}

    /**
     * Возвращает ID персонального менеджера для заказчика
     * @return int
	 * depricated
     */

    protected function _personalManager($type) {
		//есть ли менеджеры закрепленные за данным типом работ
		if(CManagerFixTypes::findActiveByType($type)){
			//закрепление менеджера с учетом того, были ли у пользователя заказы с менеджером, поиск менеджера среди закрепленных за данным типом работ
			if(!$result = $this->_managerByOrders($type)){
				//закрепление менеджера по общему алгоритму среди закрепленных за данным типом работ
				return $this->_managerByMinCountOrders($type);
			}
		} else {
			//закрепление менеджера по общему алгоритму
			if(!$result = $this->_managerByOrders()){
				return $this->_managerByMinCountOrders();
			}
		}
		return $result;
    }

    /**
     * Получает объект непрочитанных сообщений
     * @param $user_id
     * @return \Vendor\Core\ActiveRecordList
     */
    public static function newMessages($user_id) {

        $extra = [

            'join' => [
                'LEFT JOIN orders ON chat.order_id = orders.id'
            ],

            'count' => true,
            'orderby' => 'chat.id ASC'
        ];

        $criteria = [
            "chat.owner_id = :user_id",
            "orders.id IS NOT NULL",
            "is_new = 0",
            "(only = :user_id OR only = 0)"
        ];

        $params = [':user_id' => $user_id];

        return CChatMessage::find(join(" AND ", $criteria), $params, $extra);
    }

    public function markAsRead($messages_list) {

        foreach ($messages_list as $object) {
            if($object->owner_id == $this->id) {
                $object->is_new = 1;
                $object->save();
            }
        }
    }
}
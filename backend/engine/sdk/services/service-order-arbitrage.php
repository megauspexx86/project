<?php

namespace SDK\Services;
use Email\Objects\EmlArbitrageAuthorCreate;
use Email\Objects\EmlArbitrageCreate;
use Email\Objects\EmlArbitrageCustomerCreate;
use Vendor\Core\Db\DbBridge;
use Vendor\Core\Error\Ex403;
use Vendor\Core\Error\Ex404;
use Vendor\Core\ProjectConfig;
use Vendor\Lib\Validator\CRuleNotEmpty;
use Vendor\Lib\Validator\ExValidateFails;
use Vendor\Lib\Validator\FormValidator;
use SDK\Objects\CAdmin;
use SDK\Objects\CChatMessage;
use SDK\Objects\COrder;
use SDK\Objects\COrderArbitrage;
use SDK\Objects\COrderArbitrageComment;
use SDK\Objects\CUser;

/**
 * Class ServiceOrderArbitrage
 * Предназначен для реализации логики арбитража
 * @package App\Services
 */

class ServiceOrderArbitrage
{

    public function __construct($user_id, $order_id)
    {
        $this->user_id = $user_id;
        $this->order = $order = COrder::findById($order_id);
    }


    /**
     * Сервис подачи заявки на отмену заказа(в арбитраж)
     * @param $hash
     * @return COrderArbitrage
     * @throws \Exception
     */
    public function cancelOrderArbitrage($hash)
    {

        try {

            DbBridge::getInstance()->startTransaction();

            if (!($this->user_id == $this->order->owner_id || $this->order->selected_author == $this->user_id)) {
                throw new Ex403;
            }

            if (!((in_array($this->order->status, [COrder::STATUS_MAKING_WORK, COrder::STATUS_NOT_COMPLETED, COrder::STATUS_COMPLETE_WAITAGREE]) && $this->order->prepayment_percent == 100) || ($this->order->status == COrder::STATUS_NOT_COMPLETED && $this->order->prepayment_percent == 50))) {
                throw new Ex403;
            }

            $active_bids = COrderArbitrage::find('order_id = :oid AND status = :status', [':oid' => $this->order->id, ':status' => COrderArbitrage::STATUS_NEW]);
            $bid_count = $active_bids->getCount();

            if ((int)$bid_count > 0) {
                throw new Ex403;
            }

            $hash['owner_id'] = $this->user_id;

            $validator = new FormValidator();
            $validator->addRule(new CRuleNotEmpty('comment'));
            $validator->addRule(new CRuleNotEmpty('complete_percent'));
            $errors = $validator->validate($hash);

            if ($errors) {
                throw new  ExValidateFails(__CLASS__, $errors);
            }

            $comment = $hash['comment'];
            unset($hash['comment']);

            $order_arbitrage = new COrderArbitrage();
            $order_arbitrage->loadFromHash($hash);
            $order_arbitrage->save();

            $hash = [
                'comment_text' => $comment,
                'complete_percent' => $order_arbitrage->complete_percent,
                'owner_id' => $order_arbitrage->owner_id,
                'appeal_id' => $order_arbitrage->id
            ];

            $order_arbitrage_comment = new COrderArbitrageComment();
            $order_arbitrage_comment->loadFromHash($hash);
            $order_arbitrage_comment->save();

            $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');

            $text_message = vsprintf($locale['ADD_ARBITRAGE_BID'], []);
            $message = (new ServiceChat($this->order->owner_id, $this->order->id))->send($text_message, $this->order->selected_author, CChatMessage::TYPE_MESSAGE, 0, CAdmin::find('', array())->get(0)->id);
            (new ServiceOnline())->chat($message);

            DbBridge::getInstance()->commit();

            return $order_arbitrage;
        } catch (\Exception $e) {
            throw $e;
        } finally {
            DbBridge::getInstance()->rollback();
        }

    }

    /**
     *
     * Удаление заявки на отмену заказа(арбитража)
     * @throws Ex403
     * @throws Ex404
     * @throws \Vendor\Core\ExCommon
     */
    public function removeOrderArbitrageBid()
    {

        if (!($this->user_id == $this->order->owner_id || $this->order->selected_author == $this->user_id)) {
            throw new Ex403;
        }

        $active_bid = COrderArbitrage::getActiveBid($this->order->id);

        if (!$active_bid) {
            throw new Ex404;
        }

        if (!$this->user_id == $active_bid->owner_id) {
            throw new Ex403;
        }

        $active_bid->status = COrderArbitrage::STATUS_DELETE;
        $active_bid->save();

        $user = CUser::findById($this->user_id);

        $locale = ProjectConfig::getInstance()->getKey('locale', 'chat');

        $text_message = $user->role == CUser::ROLE_CUSTOMER ? vsprintf($locale['REMOVE_ARBITRAGE_BID_CUSTOMER'], []) : vsprintf($locale['REMOVE_ARBITRAGE_BID_AUTHOR'], []);
        $message = (new ServiceChat($this->order->owner_id, $this->order->id))->send($text_message, $this->order->selected_author, CChatMessage::TYPE_MESSAGE, 0, CAdmin::find('', array())->get(0)->id);
        (new ServiceOnline())->chat($message);

    }

    /**
     * Добавление комментария в арбитраж
     *
     * @param $hash
     * @return $this
     * @throws Ex403
     * @throws Ex404
     * @throws ExValidateFails
     */
    public function addArbitrageComment($hash)
    {

        $validator = new FormValidator();
        $validator->addRule(new CRuleNotEmpty('comment_text'));
        $validator->addRule(new CRuleNotEmpty('complete_percent'));
        $errors = $validator->validate($hash);

        if ($errors) {
            throw new  ExValidateFails(__CLASS__, $errors);
        }

        $active_bid = COrderArbitrage::findOne('order_id = :oid AND status = :status', [':oid' => $this->order->id, ':status' => COrderArbitrage::STATUS_NEW]);

        if (!$active_bid) {
            throw new Ex403;
        }

        $hash['appeal_id'] = $active_bid->id;
        $hash['owner_id'] = $this->user_id;

        $order_arbitrage_comment = new COrderArbitrageComment();
        $order_arbitrage_comment->loadFromHash($hash);
        return $order_arbitrage_comment->save();
    }
}
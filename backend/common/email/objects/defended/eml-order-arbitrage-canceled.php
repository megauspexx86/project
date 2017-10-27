<?php

namespace Email\Objects\Defended;
use Bill\Objects\CTransaction;
use Bill\Services\ServicePayment;
use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\COrderArbitrage;
use SDK\Objects\CUser;
use Vendor\Core\Email;


/**
 * Письмо об отмене заказа арбитражем
 * Письмо автору и заказчику отличается не значительно поэтому логика различий реализована в шаблоне письма
 * Class EmlOrderComplete50
 * @package Email\Objects\Defended
 */
class EmlOrderArbitrageCanceled extends Email  {

    /**
     * @var COrderArbitrage
     */
    protected $__bid;

    /**
     * EmlOrderArbitrageCanceled constructor.
     * @param CUser $user
     * @param COrder $order
     */
    public function __construct(CUser $user, COrder $order, COrderArbitrage $bid) {

        $this->order = $order;
        $this->__bid = $bid;

        parent::__construct($user);

        $this->setParams();
    }

    /**
     * Имя темплейта
     * @return string
     */
    public function template() {
        return 'arbitrage_canceled.tpl';
    }

    /**
     * Тема письма
     * @return string
     */
    public function subject() {
        return "Заказ {$this->params['type_name']} №{$this->order->id} отменен";
    }


    public function setParams() {

        $params = [
            'type_name' => CListElement::findById($this->order->type)->name,
            'order' => $this->order->view(['title']),
            'role' => $this->user->role,
            'comment' => $this->__bid->admin_comment,
            'customer_penalty' => $this->__customerPenalty()
        ];

        parent::addParams($params);
    }

    /**
     * Проверяет был ли штраф заказчику за отмену онлайн-помощи
     * тк этот факт нигде не сохраянется проверяем на основе наличия транзакции
     * @return bool
     */
    protected function __customerPenalty() {

        if($this->order->work_class != COrder::TYPE_EXAM || $this->user->role == CUser::ROLE_AUTHOR) {
            return false;
        }

        $cnt = CTransaction::count('item = :oid AND trans_type = :t', [':oid' => $this->order->id, ':t' => ServicePayment::TYPE_CUSTOMER_PENALTY_ONLINE]);

        return $cnt > 0;
    }

    /**
     * Всегда отправляем это письмо
     * @return bool
     */
    protected function __canSend() {
        return true;
    }

}
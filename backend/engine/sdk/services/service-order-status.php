<?php

namespace SDK\Services;
use SDK\Objects\CListElement;
use SDK\Objects\COrder;
use SDK\Objects\COrderBet;

/**
 * Class ServiceOrderStatus
 * Сервис для работы со стаустами заказа, устанавливает статус но не сохраняет заказ
 * Сервис применяется в методе __set объекта COrder
 */

class ServiceOrderStatus {

    const H_24 = 24;
    const H_72 = 72;
    const H_120 = 120;
    const H_168 = 168;
    const H_720 = 720;

    protected $order;

    public function __construct(COrder $o) {
        $this->order = $o;
    }

    /**
     * Устанавливает параметры сроков действия нового статуса
     * @param int $status - Новый статус
     */
    public function set($status) {

        $this->order->step = $this->step($status);
        $this->order->status_changed_date = (new \DateTime())->format('Y-m-d H:i:s');

        switch($status) {

            case COrder::STATUS_MAKING_WORK:
                return $this->forWork();
            case COrder::STATUS_COMPLETE_WAITAGREE:
                return $this->forApproval();
            case COrder::STATUS_ORDER_COMPLETED:
            case COrder::STATUS_ORDER_COMPLETED_ARBITRAGE:
            case COrder::STATUS_ORDER_CANCELED_ARBITRAGE:
                $ttl = null;
                break;
            default:

                $ttl = (new \DateTime(sprintf("+%d hours", self::ttl($status))))->format('Y-m-d H:i:s');

                break;
        }

        $this->order->status_expire_date = $ttl;
    }

    /**
     * Возвращает срок действия статуса в часах
     * @param $status
     */
    static public function ttl($status) {

        switch ($status) {
            case COrder::STATUS_NEW:
            case COrder::STATUS_AUTHOR_REFUSED:
            case COrder::STATUS_CUSTOMER_REFUSED:
                return self::H_120;
            case COrder::STATUS_AUTHOR_NOT_SELECTED:
            case COrder::STATUS_WAIT_MONEY:
                return self::H_72;
            case COrder::STATUS_AUTHOR_SELECTED:
            case COrder::STATUS_PREPAYMENT:
            case COrder::STATUS_PREPAYMENT_FULL:
                return self::H_24;
            case COrder::STATUS_ORDER_FINISH:
                return self::H_168;
        }

        // В любой не понятной ситуации даем неделю
        return self::H_168;
    }

    /**
     * Возвращает этап по статусу
     * @param $status
     */
    protected function step($status) {

        switch($status) {
            case COrder::STATUS_NEW:
            case COrder::STATUS_AUTHOR_SELECTED:
            case COrder::STATUS_AUTHOR_REFUSED:
            case COrder::STATUS_WAIT_MONEY:
            case COrder::STATUS_NOT_PAYD:
            case COrder::STATUS_AUTHOR_NOT_SELECTED:
            case COrder::STATUS_PREPAYMENT:
            case COrder::STATUS_PREPAYMENT_FULL:
            case COrder::STATUS_CUSTOMER_REFUSED:

                return COrder::STEP_SELECT_AUTHOR;

            case COrder::STATUS_MAKING_WORK:
            case COrder::STATUS_COMPLETE_WAITAGREE:
            case COrder::STATUS_NOT_COMPLETED:

                return COrder::STEP_MAKING_WORK;

            case COrder::STATUS_ORDER_FINISH:
            case COrder::STATUS_ORDER_COMPLETED:
            case COrder::STATUS_ORDER_COMPLETED_ARBITRAGE:
            case COrder::STATUS_ORDER_CANCELED_ARBITRAGE:

                return COrder::STEP_FINISHED;
        }
    }

    /**
     * Отправляет заказ на согласование
     * @return int
     */
    protected function forApproval() {

         // Заказ впервые отправляется на согласование
        if (is_null($this->order->was_complete_waitagree)) {

            //var_dump($this->order->was_complete_waitagree);exit;

            $expire = (new \DateTime(sprintf("+%d hours", $this->termsOfCoordination($this->order))))->format('Y-m-d H:i:s');

            $this->order->was_complete_waitagree = $expire;
            $this->order->status_expire_date = $expire;
        }

        if(!is_null($this->order->was_complete_waitagree) && (new \DateTime($this->order->was_complete_waitagree))  < (new \DateTime("+5 days"))) {
            //если заказ уже отправлялся на согласование и от первоначального срока согласования осталось 5 или менее дней
            $this->order->status_expire_date = (new \DateTime("+5 days"))->format('Y-m-d H:i:s');
        } else {
            //если заказ уже отправлялся на согласование и от первоначального срока согласования осталось 5 и более дней
            $this->order->status_expire_date = (new \DateTime($this->order->was_complete_waitagree))->format('Y-m-d H:i:s');
        }

    }

    /**
     * Отправляет заказ на выполнение
     * @return int
     */
    protected function forWork() {

        // Текущий статус - тот который изменяется!!!!!
        $current_status = $this->order->status;

        $now = new \DateTime();

        if($current_status == COrder::STATUS_COMPLETE_WAITAGREE) {

            // При возврате заказа на доработку, в случае, если срок исполнения истек (end_day)
            // автору дается + 24 часа с текущей даты
            if($now > (new \DateTime($this->order->end_day))) {

                $now->modify("+24 hours");

                $this->order->end_day = $now->format('Y-m-d');
                $this->order->status_expire_date = $now->format('Y-m-d H:i:s');
                return true;
            }


        }

        if($current_status == COrder::STATUS_WAIT_MONEY) {
            $offer = COrderBet::findByOrderAuthorId($this->order->id, $this->order->selected_author);
            $this->order->end_day = (new \DateTime("+".$offer->terms." days"))->format('Y-m-d');

        }

        // Выставляем ДАТУ срока действия статуса на основе end_day, ВРЕМЯ - текущее
        $this->order->status_expire_date = sprintf("%s %s", (new \DateTime($this->order->end_day))->format('Y-m-d'), $now->format("H:i:s"));

        return true;
    }

    /**
     * Получает количество часов на согласование по типу заказа
     * @param COrder $order
     * @return int
     */
    protected function termsOfCoordination($order) {

        $element = CListElement::findById($order->type);

        if ($element->complete_waitagree) {
            return $element->complete_waitagree * 24;
        }

        return $order->work_class == 8 ? self::H_168 : self::H_720;
    }
}
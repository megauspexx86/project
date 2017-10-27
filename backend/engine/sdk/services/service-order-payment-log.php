<?php

namespace SDK\Services;
use Bill\Objects\CTransaction;
use Bill\Services\ServicePayment;
use SDK\Objects\COrder;
use SDK\Objects\COrderPaymentLog;
use SDK\Salary\EventOrderPayment;
use Vendor\Core\Error\Ex404;


/**
 *
 * Реализация функций логирования оплат заказов
 *
 * Class ServiceOrderPaymentLog
 * @package SDK\Services
 */
class ServiceOrderPaymentLog {

    protected $__transaction;

    protected $__order;

    public function __construct($transaction_id) {

        $this->__transaction = CTransaction::findById(intval($transaction_id));

        if(is_null($this->__transaction)) {
            throw new Ex404();
        }

        $this->__order = COrder::findById($this->__transaction->item);

    }

    /**
     * Проводит регистрацию платежа
     * @param int $sum
     */
    public function process() {

        if($this->__transaction->trans_status != CTransaction::STATUS_OK) {
            return false;
        }

        if($this->__transaction->trans_type == ServicePayment::TYPE_RETURN_MONEY) {
            return $this->__remove();
        }

        if(!in_array($this->__transaction->trans_type, [ServicePayment::TYPE_PAY_BY_ORDER, ServicePayment::TYPE_PARTIALY_PAY_BY_ORDER])) {
            return false;
        }
        
        if($log = COrderPaymentLog::findByOrderId($this->__transaction->item)) {
            return $this->__processSecondSum($log);
        }

        return $this->__processFirstSum();

    }

    /**
     * Проводит первый платеж
     */
    protected function __processFirstSum() {

        $log = new COrderPaymentLog();

        $log->order_id = $this->__transaction->item;
        $log->first_date = (new \DateTime())->format('Y-m-d H:i:s');
        $log->first_sum = $this->__transaction->trans_summ;
        $log->save();

        $this->__processManagerSalary($log->first_sum, 1);

        return $log;
    }


    /**
     * Проводит второй платеж
     */
    protected function __processSecondSum(COrderPaymentLog $log) {

        if($log->second_sum) {
            return false;
        }

        $log->second_date = (new \DateTime())->format('Y-m-d H:i:s');
        $log->second_sum = $this->__transaction->trans_summ;
        $log->save();

        $this->__processManagerSalary($log->second_sum, 2);

        return $log;
    }

    /**
     * Удаление информации о платежах при возврате средств
     */
    protected function __remove() {

        if($log = COrderPaymentLog::findByOrderId($this->__transaction->item)) {
            $log->delete();
        }

        return true;
    }

    /**
     * Начисление ЗП менеджеру
     * @param $payment_sum - Сумма операции, на основании которой будет произведен расчет ЗП
     * @param $index - Индекс оплаты - первая/вторая
     */
    protected function __processManagerSalary($payment_sum, $index) {
        $service = new ServiceManagerSalary($this->__order, new EventOrderPayment($payment_sum, $index));
        $service->process();
    }


}
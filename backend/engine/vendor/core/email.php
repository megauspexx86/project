<?php

namespace Vendor\Core;


use Autologin\Services\ServiceAutologin;
use Partner\Objects\CPartnerWhiteLabel;
use Partner\Objects\CPartnerWhiteLabelResources;
use SDK\Objects\CEmailLogs;
use SDK\Objects\CUser;
use SDK\Services\ServiceNewAccountTest;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Vendor\Core\Error\Ex403;
use Vendor\Core\Error\Ex404;

/**
 * Класс отвечает за генерацию и отправку писем
 * Class Email
 * @package Vendor\Core
 */
abstract class Email {

    protected $user;

    /**
     * Объект WL
     * @var
     */
    protected $wl;

    /**
     * Метка, новый или старый кабинет
     * @var void
     */
    protected $is_new = false;

    /**
     * Фавикон
     * @var
     */
    protected $favicon;

    /**
     * Логотип
     * @var
     */
    protected $logo;

    protected $params;

    /**
     * Задержка отправки письма(в секундах)
     * @var int
     */
    protected $delay = 0;

    private $attachment = [];

    /**
     * Email constructor.
     * @param CUser $user
     */
    public function __construct(CUser $user) {

        $this->user = $user;

        $this->__whitelabel();

        $this->__isNewAccount();

        $this->site_name = $this->wl ? $this->wl->site_name :  'Напишем';

        $this->addParam('name', $this->user->name);
        $this->addParam('mail_images_url', ProjectConfig::getInstance()->getKey('settings', 'mail_images_url'));

        $this->addParam('__AUTOLOGIN_BASE__', sprintf('%s/login/process', $this->__autologinBaseURL()));
    }

    /**
     * Отправка письма
     * @throws \phpmailerException
     */
    public function send() {

        if($this->__canSend()){

            $this->__unsubscribe();

            return $result = $this->run();
        }

        return true;
    }

    /**
     * Добавление параметра для view
     * @param $key
     * @param $value
     * @throws Ex403
     */
    public function addParam($key, $value) {

        if(is_object($value)) {
           throw new Ex403();
        }

        $this->params[$key] = $value;

    }

    /**
     * Добавление параметров для view
     * @param array $params
     */
    public function addParams(array $params) {
        foreach($params as $key => $param) {
            $this->addParam($key, $param);
        }
    }

    /**
     * Установка задержки отправки письма
     * @param $delay
     */
    public function setDelay($delay) {
        $this->delay = $delay;
    }

    /**
     * Установка Utm-метки
     * @param $code
     */
    protected function utm() {
        return '';
    }

    /**
     * Получает ссылку на страницу логина с учетом WL
     * @return string
     */
    protected function __autologinBaseURL() {

        if($this->wl) {
            return sprintf('%s://%s', ProjectConfig::getInstance()->getKey('protocol'), $this->wl->host);
        }

        if($this->is_new) {
            return ProjectConfig::getInstance()->getKey('settings', 'new_account_url');
        }

        return ProjectConfig::getInstance()->getKey('settings', 'account_url');
    }

    /**
     * Проверяет подписан ли пользователь на письмо
     * @todo Необходимо доработать проверку
     */
    protected function __canSend() {
        return true;
    }

    /**
     * Формирование ссылки на отписку от рассылки
     */
    protected function __unsubscribe() {
        $settings_page_url = $this->__autologinBaseURL() . '/private/notifications';

        //Условие добавлено на время, пока новый кабинет заказчика работает со старым кабинетом автора
        if($this->user->role == CUser::ROLE_AUTHOR) {
            $settings_page_url = ProjectConfig::getInstance()->getKey('common', 'settings_page');
        }
        $this->addParam('__UNSUBSCRIBE__', ServiceAutologin::make($this->user, 86400, 1, $settings_page_url));
    }

    final private function run() {

        if(MAIL_ENABLE) {

            $data = [
                'host' => MAIL_HOST,
                'SMTPAuth' => MAIL_SMTP_AUTH,
                'port' => MAIL_PORT,
                'SMTPSecure' => MAIL_SECURE,
                'SMTPDebug' => MAIL_DEBUG,
                'Debugoutput' => 'html',
                'CharSet' => MAIL_CHARSET,
                'Username' => MAIL_USERNAME,
                'Password' => MAIL_PASSWORD,
                'from' => $this->__from(),
                'from_name' => $this->__fromName(),
                'address' => $this->user->email,
                'isHTML' => true,
                'reply_to' => $this->__replyTo(),
                'attachment' => $this->attachment,
                'Subject' => $this->subject(),
                'Body' => $this->getView(),
                'user_id' => $this->user->id,
                'template' => $this->template(),
                'delay' => $this->delay
            ];


            //асинхронная отправка письма
            exec(sprintf('/usr/bin/php %s/async_mail_sender.php %s %s', ProjectConfig::getInstance()->getKey('settings', 'console_scripts_dir'), base64_encode(serialize($data)), '>/dev/null &'));
        }
        return false;
    }

    /**
     * Добавление файла к письму
     * @param $name
     * @param $source
     */
    public function attach($name, $source) {
        $this->attachment[] = ['name' => $name, 'source' => $source];
    }

    /**
     * Возращает email, на который необходимо слать ответы
     * @return string
     */
    protected function __replyTo() {
        return $this->wl ? $this->wl->email : MAIL_FROM;
    }

    /**
     * Формирует код автологина с именем $name
     */
    protected function __autologin($name) {

        $code = ServiceAutologin::make($this->user, $this->__autologinTTL(), $this->__autologinCnt(), $this->__autologinURL());

        $this->addParam($name, $code);
    }

    /**
     * Время жизни ссылки автологина, в случае необходимости перекрыть в потомке
     * @return int
     */
    protected function __autologinTTL() {
        return 86400;
    }

    /**
     * Допустимое количество активаций автологина, в случае необходимости перекрыть в потомке
     * @return int
     */
    protected function __autologinCnt() {
        return 1;
    }

    /**
     * Ссылка (полный адрес с протоколом) на которую будет вести автологин, в случае необходимости перекрыть в потомке
     * @return string
     */
    protected function __autologinURL() {
        return '/';
    }

    /**
     * Получение объетка WhiteLabel
     * @return ActiveRecord
     */
    protected function __whitelabel() {
        if($this->user->wl_id != 0) {
            $wl = CPartnerWhiteLabel::findById($this->user->wl_id);
            if(!$wl) {
                throw new Ex404();
            }

            $this->wl = $wl;
            $this->logo = CPartnerWhiteLabelResources::getLogoByWlId($this->wl->id);
            $this->favicon = CPartnerWhiteLabelResources::getFaviconByWlId($this->wl->id);
        }
    }

    /**
     * Устанавливает, работа будет вестись в новом или старом кабинете
     */
    protected function __isNewAccount() {
        $account = new ServiceNewAccountTest($this->user);
        if($this->wl || $account->newAccount()) {
            $this->is_new = true;
        }
    }


    /**
     * email отправителя письма
     * @return mixed
     */
    protected function __from() {
        return $this->wl ? $this->wl->email : MAIL_FROM;
    }

    /**
     * Имя отправителя письма
     * @return mixed
     */
    protected function __fromName() {
        return $this->wl ? $this->wl->site_name : MAIL_FROM_NAME;
    }


    /**
     * Сохранение лога
     * @param $result
     * @param $error
     */
    private function saveLog($result, $error) {

        if(!$result) {
            return false;
        }

        $log = new CEmailLogs();
        $log->subject = $this->subject();
        $log->user_id = $this->user->id;
        $log->template = $this->template();
        $log->result = $result ? 1 : 0;
        $log->error = !$result ? $error : '';
        return $log->save();
    }

    /**
     * Получение готового view
     * @return HtmlView
     */
    private function getView() {

        $view = new EmailView('layout.tpl');

        $view->addObject('template_name', $this->template());
        $view->addObject('wl', $this->wl ? $this->wl->view(['host', 'title', 'email', 'site_name']) : '');
        $view->addObject('logo', $this->logo ? $this->logo->view(['file_name']) : '');
        $view->addObject('favicon', $this->favicon ? $this->favicon->view(['file_name']) : '');
        $view->addObject('protocol', ProjectConfig::getInstance()->getKey('protocol'));

        if(!empty($this->params)) {
            foreach ($this->params as $key => $param) {
                $view->addObject($key, $param);
            }
        }

        return $view->__toString();
    }

    abstract function template();
    abstract function subject();

}
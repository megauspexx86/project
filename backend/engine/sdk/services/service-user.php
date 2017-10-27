<?php

namespace SDK\Services;

use Email\Objects\EmlConfirmRegistration;
use Email\Objects\EmlUserRemindPassword;
use Partner\Services\ServicePartnerAssociate;
use SDK\Lib\DateTime;
use SDK\Objects\CUserGeo;
use SDK\Objects\CUserLocation;
use SDK\Objects\CUserReferer;
use SMS\SmsRemindPassword;
use Vendor\Core\ActiveRecord;
use Vendor\Core\Cookie;
use Vendor\Core\Db\DbBridge;
use Vendor\Core\DbRedis;
use Vendor\Core\Error\Ex403;
use Vendor\Core\Error\Ex404;
use Vendor\Core\ExCommon;
use Vendor\Core\ProjectConfig;
use Vendor\Core\Request;
use Vendor\Core\Session;
use Vendor\Lib\RandomGenerator;
use Vendor\Lib\Validator\CRuleEquals;
use Vendor\Lib\Validator\CRuleNotEmail;
use Vendor\Lib\Validator\CRuleNotEmpty;
use Vendor\Lib\Validator\ExValidateFails;
use Vendor\Lib\Validator\FormValidator;
use SDK\Objects\CAuthorAnketa;
use SDK\Objects\CPreRegistrationUser;
use SDK\Objects\CUser;
use SDK\Objects\CUserSubject;


/**
 * Class ServiceUser
 * Функии пользователя
 */

class ServiceUser {

    /**
     * Получает пользователя, если его нет создает
     * @todo Сюда необходимо добавить еще получение текущего пользователя
     * @param array $hash
     * @param int $wl_id
     * @return CUser
     */
    public function forceGetUser(array $hash, $wl_id = 0) {

        if($user = CUser::findByEmail($hash['email'], $wl_id)) {
            return $user;
        }

        return $this->signup($hash);
    }

    /**
     * Сохранение нового пользователя
     * @param $hash
     * @return CUser
     */
    public function signup($hash) {

        try {

            DbBridge::getInstance()->startTransaction();

            $partner_id = 0;
            if(isset($hash['referal_id'])) {
                $partner_id = $hash['referal_id'];
                unset($hash['referal_id']);
            }

            $user = new CUser();
            $user->loadFromHash($hash);
            $user->role = CUser::ROLE_CUSTOMER;
            if(!isset($hash['password'])) {
                $hash['password'] = $this->autoPassword();
                $user->password = $hash['password'];
            }
            $user->save();

            $this->location($user);

            $this->autologinCode($user);

            if($pre_reg = CPreRegistrationUser::findByEmail($user->email)) {
                $pre_reg->user_id = $user->id;
                $pre_reg->save();
            }

            /**
             * @TODO не стоит использовать сервсисы компонентов в SDK
             */
            if($partner_id) {
                (new ServicePartnerAssociate())->link($user->id, $partner_id);
            }

            (new ServiceNewAccountTest($user))->account();

            DbBridge::getInstance()->commit();

            return $user;

        } catch(\Exception $e) {

            DbBridge::getInstance()->rollback();

            throw $e;
        }
    }

    /**
     * Сохраняет локацию пользователя
     * @param CUser $user
     */
    public function location(CUser $user) {

        if(Session::getInstance()->current_admin || Session::getInstance()->admin) {
            return false;
        }

        if(CUserGeo::findOne('owner_id = :oid', [':oid' => $user->id])) {
            return false;
        }

        if(!$location = $this->__location()) {
            return false;
        }

        $geo = new CUserGeo();
        $geo->owner_id = $user->id;
        $geo->ip = isset($location->ip) && !is_null($location->ip) ? $location->ip : 0;
        $geo->country_id = isset($location->country) && !is_null($location->country) ? $location->country->id : 0;
        $geo->region_id = isset($location->region) && !is_null($location->region) ? $location->region->id : 0;
        $geo->city_id = isset($location->city) && !is_null($location->city) ? $location->city->id : 0;

        if(!$geo->country_id && !$geo->region_id && !$geo->city_id) {
            return false;
        }

        $geo->save();
    }

    /**
     * Восстановление пароля
     * @param CUser $user
     */
    public function remind(CUser $user) {

        if($user->role == CUser::ROLE_CUSTOMER) {
            $password = $this->autoPassword();
            $user->password = $password;
            $user->save();

            $email = new EmlUserRemindPassword($user, $password);
            $email->send();
        }

        if($user->role == CUser::ROLE_AUTHOR) {
            if(strlen($user->phone) < 10 ) {
                throw new ExValidateFails(['incorrect_phone_length' => 'incorrect']);
            }

            $this->sendRemindSmsConfirmation($user);

        }

    }


    /**
     * Проверка кода при восстановлении пароля автором
     * @param $hash
     * @return mixed
     * @throws ExValidateFails
     */
    public function checkRemindCode($hash) {
        $user = CUser::findByEmailSmsCode($hash['email'], $hash['code']);

        if(!isset($user)) {
            throw new ExValidateFails(['invalid_code' => 'invalid']);
        }

        $this->_checkExpiredSms($user);

        $user->sms_pass_confirm = null;
        $user->sms_pass_date = null;
        $user->save();
        $this->autologinCode($user);
        return $user->autologin_code;

    }


    /**
     * Формирование ключа autologin_code для пользователя $user
     * @param CUser $user
     * @return bool
     */
    public function autologinCode(CUser $user) {

        if(!is_null($user->autologin_code)) {
            return true;
        }

        $user->autologin_code = md5($this->_random(20));
        $user->save();
    }


    /**
     * @param $code
     * @throws Ex404
     */
    public function autologin($code) {

        $user = CUser::findOne('autologin_code = :code', [':code' => $code]);
        if(!$user) {
            throw new Ex404();
        }

        $this->setCurrentUser($user);
        $this->_clearAultologinCode($user);

    }

    /**
     *
     * Получает анкету автора по id пользователя
     * @param $user_id
     * @return \Vendor\Core\ActiveRecord
     */
    public function authorAnketa($user_id) {

        $extra = [

            'fields' => [
                'author_anketa.kval' => 'kval',
                'author_anketa.degree' => 'degree',
                'author_anketa.burn_date' => 'burn_date',
                'author_anketa.rank' => 'rank'
            ],

            'join' => [
                'LEFT JOIN author_anketa ON author_anketa.user_id = users.id'
            ]
        ];

        return CUser::findOne("users.id = :user_id", [':user_id' => $user_id], $extra);

    }

    /**
     * Сохранение анкеты автора
     * @param CUser $user
     * @param $hash
     * @throws Ex403
     */
    public function saveUserProfile(CUser $user, $hash) {

        $files = isset($hash['files']) ? $hash['files'] : [];
        unset($hash['files']);

        $avatar = isset($hash['avatar']) ? $hash['avatar'] : [];
        unset($hash['avatar']);

        if(strpos($user->name, 'User') === 0 || strpos($user->name, 'Заказчик') === 0) {
            $validator = new FormValidator();
            $validator->addRule(new CRuleNotEmail('name'));
            $validator->validate($hash);

            $user->name = $hash['name'];
        }

        unset($hash['name']);

        $hash['phone'] = str_replace('+', '', $hash['phone']);
        $hash['phone_country_code'] = !empty($hash['phone']) ? str_replace('+', '', $hash['phone_country_code']) : '';

        if($user->role != CUser::ROLE_AUTHOR) {
            $user->phone = $hash['phone'];
            $user->phone_country_code = $hash['phone_country_code'];
        }

        unset ($hash['phone']);
        unset ($hash['phone_country_code']);
        $user->save();

        $user->country = $hash['country'];
        unset ($hash['country']);
        $user->city = $hash['city'];
        unset ($hash['city']);
        $user->fio = $hash['surname'] . ' ' . $hash['first_name'] . ' ' . $hash['father_name'];
        $user->skype = $hash['skype'];

        if(!empty($avatar)) {
            $user->avatar = $avatar['file_name'];
            $this->moveFile($avatar['file_name'], 'avatar_dir');
        }
        $user->save();
        //Session::getInstance()->user->name = $user->name;

        if($user->role == CUser::ROLE_AUTHOR) {
            $anketa = CAuthorAnketa::findOne('user_id=:user_id', ['user_id' => $user->id]) ? CAuthorAnketa::findOne('user_id=:user_id', ['user_id' => $user->id]) : new CAuthorAnketa();
            $hash['user_id'] = $user->id;
            $hash['burn_date'] = (new \DateTime($hash['burn_date']))->format('Y-m-d');

            $anketa->loadFromHash($hash);
            $anketa->save();

            $service_private_resource = new ServicePrivateResource($user);
            $service_private_resource ->saveFiles($files, ServicePrivateResource::REQUEST_DIPLOMA, 'profile_dir_d');
        }

    }

    public function saveNotifications(CUser $user, $hash) {
        $user->loadFromHash($hash);
        $user->save();
    }

    public function getAuthorProfile($author_id) {
        $extra = [

            'fields' => [
                'c.city_name' => 'city_name',
                'country.country_name' => 'country_name',
            ],

            'join' => [
                'LEFT JOIN city AS c ON c.id = users.city',
                'LEFT JOIN country ON country.id = users.country'
            ]
        ];

        $criteria = [
            "users.id = :author_id",
        ];

        $params = [':author_id' => $author_id];

        return CUser::findOne(join(" AND ", $criteria), $params, $extra);
    }

    public function getPerformedWorksByAuthor($author_id) {
        $extra = [

            'fields' => [
                'GROUP_CONCAT(s.subject_name)' => 'subject_name',
                's1.subject_name' => 'parent_subject_name'
            ],

            'join' => [
                'JOIN `subject` as s ON (s.id=user_subject.subject_id)',
                'JOIN `subject` as s1 ON (s1.id = s.parent_id)'
            ],
            'groupby' => 's1.subject_name'
        ];

        $criteria = [
            "user_subject.user_id = :author_id",
        ];

        $params = [':author_id' => $author_id];

        return CUserSubject::find(join(" AND ", $criteria), $params, $extra);
    }


    public function getUserBlocking($user_id) {
        $extra = [

            'fields' => [
                'ub.date_block_to' => 'date_block_to',
                'ub.action' => 'action',
                'ub.can_money_out' => 'can_money_out',
                'ub.can_money_in' => 'can_money_in',
                'ub.blocking_reason' => 'blocking_reason'
            ],

            'join' => [
                'LEFT JOIN `user_blocking` as ub ON (users.id=ub.user_id)',
            ],

            'orderby' => 'ub.id DESC'

        ];

        $criteria = [
            "users.id = :user_id",
        ];

        $params = [':user_id' => $user_id];

        return CUser::findOne(join(" AND ", $criteria), $params, $extra);
    }

    /**
     * Смена пароля из кабинета
     * @param $user_id
     * @param $hash
     * @throws ExValidateFails
     */
    public function changePassword($user_id, $hash) {

        $user = CUser::findById($user_id);

        $validator = new FormValidator();
        $validator->addRule(new CRuleNotEmpty('current_password'));
        $validator->addRule(new CRuleNotEmpty('password'));
        $validator->addRule(new CRuleNotEmpty('confirm_password'));
        $validator->addRule(new CRuleEquals('confirm_password', 'password'));
        $validator->validate($hash);

        if (md5($hash['current_password']) !== $user->password_md5) {
            throw new ExValidateFails(array('current_password' => array('CRuleInvalidPassword')), __CLASS__);
        }

        $password_hash['password'] = $hash['password'];

        $user->loadFromHash($password_hash);
        $user->save();

    }

    /**
     * Смена пароля при напоминании
     * @param $hash
     * @throws Ex404
     */
    public function remindChangePassword($hash) {
        $user = CUser::findById(Session::getInstance()->current_user->id);
        if(!$user) {
            throw new Ex404();
        }

        $password_hash['password'] = $hash['password'];
        $user->loadFromHash($password_hash);
        $user->save();
    }

    /**
     * Разлогинивает пользователя
     */
    public function logout() {
        Session::getInstance()->user = null;
        Session::getInstance()->current_user = null;
        Cookie::getInstance()->s = null;
        Cookie::getInstance()->t = null;
        Cookie::getInstance()->user = null;
    }

	public function checkCaptcha() {

		if (ProjectConfig::getInstance()->getKey('captcha', 'enabled')) {
			$key = sprintf('BROOT:%s:COUNTER', Request::getQueryVar('email'));
			$counter = intval(DbRedis::getInstance()->get($key));

			if ($counter >= 5) {
				$key_date = sprintf('BROOT:%s:DATE', Request::getQueryVar('email'));
				$last_login = DbRedis::getInstance()->get($key_date);
				if ((time() - DbRedis::getInstance()->get($key_date)) >= 18000) {
					DbRedis::getInstance()->delete($key);
					DbRedis::getInstance()->delete($key_date);
				} else {
					$response = Request::getQueryVar('g-recaptcha-response', 0);
					$recaptcha = new \ReCaptcha\ReCaptcha(RECAPTCHA_SECRET);
					$result = $recaptcha->verify($response, $_SERVER['REMOTE_ADDR']);
					if ($result->isSuccess() !== true) {
						throw new ExValidateFails(['captcha' => 'invalid']);
					}
				}
			}
		}
	}

	public function checkCountLoginAttempts() {

		if (ProjectConfig::getInstance()->getKey('captcha', 'enabled')) {
			$key = sprintf('BROOT:%s:COUNTER', Request::getQueryVar('email'));
			$counter = intval(DbRedis::getInstance()->get($key)) + 1;
			DbRedis::getInstance()->set($key, $counter);
			if ($counter >= 5) {
				DbRedis::getInstance()->set(sprintf('BROOT:%s:DATE', Request::getQueryVar('email')), (new \DateTime())->getTimestamp());
				return true;
			}
		}
	}

	public function deleteCountLoginAttempts() {

		if (ProjectConfig::getInstance()->getKey('captcha', 'enabled')) {
			DbRedis::getInstance()->delete(sprintf('BROOT:%s:COUNTER', Request::getQueryVar('email')));
			DbRedis::getInstance()->delete(sprintf('BROOT:%s:DATE', Request::getQueryVar('email')));
		}
	}

    /**
     * Авторизация пользователя
     *
     * @param $login
     * @param $password
     * @return bool
     */
    public function login($login, $password, $role_only = null) {

		$this->checkCaptcha();

    	$criteria = [
            'email = :login',
            'password_md5 = :passwd',
            'wl_id = :wl_id'
        ];

        $params = [
            ':login' => trim($login),
            ':passwd' => md5($password),
            ':wl_id' => WL
        ];

        if($role_only) {
            $criteria[] = 'role = :customer_role';
            $params[':customer_role'] = $role_only;
        }

        $user = CUser::findOne(join(' AND ', $criteria), $params);

        if(!$user) {
            throw new ExValidateFails(['not_found' => 'not_found']);
		}

		if($user->bet_ability == 2) {
			throw new ExValidateFails(['user_blocked' => 2]);
		}

        $this->setCurrentUser($user);

        return true;
    }

    /**
     *
     * Устанавливает сессию активного пользователя
     *
     * @param CUser $user
     */
    public function setCurrentUser(CUser $user) {

        Session::getInstance()->current_user = $user;

        $this->location($user);

        $this->_trackVisit($user);
    }

    /**
     * Подписка на рассылку
     * @param CUser $user
     */
    public function subscribe(ActiveRecord $user) {
        $user->subs_news_napishem  = 1;
        $user->save();
    }

	/** Определяем пользователь из СНГ(true), по данным user_geo, если пользователь отсутствует в user_geo, считаем что он из СНГ (true)
	 * @param $user_id
	 * @return bool
	 */
	public function userFromSng($user_id) {
		$user = CUser::findById($user_id);
		if ($user) {
			if ($user_geo = CUserGeo::findByOwnerId($user->id)) {
				if (in_array($user_geo->country_id, ProjectConfig::getInstance()->getKey('sng_countries'))) {
					return true;
				}
			} else {
				return true;
			}
		}
		return false;
	}
    /**
     * Очистка кода автологина
     * @param CUser $user
     */
    protected function _clearAultologinCode(CUser $user){
        $user->autologin_code = null;
        $user->save();
    }

    /**
     * Проверка истёк ли срок смс для восстановления пароля
     * @param CUser $user
     * @throws ExValidateFails
     */
    protected function _checkExpiredSms(CUser $user) {
        $now = new \DateTime();
        $sms_date = new \DateTime($user->sms_pass_date);

        if($sms_date->modify('+10 minutes') <= $now) {
            throw new ExValidateFails(['code_expired' => 'expired']);
        }
    }


    /**
     * Отправка смс автору при запросе на восстановление пароля
     * @param CUser $user
     */
    protected function sendRemindSmsConfirmation(CUser $user) {
        $this->_checkFrozenSms($user);

        $chars = array('b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n');
        $code = $chars[rand(0, 11)] . rand(10, 99) . $chars[rand(0, 11)] . rand(10, 99);
        $user->sms_pass_confirm = $code;
        $user->sms_pass_date = (new \DateTime())->format('Y-m-d H:i:s');
        $user->save();

        $sms = new SmsRemindPassword($user, $code);
        $sms->send();
    }

    /**
     * Проверка на возможность отправки смс
     * @param CUser $user
     * @throws ExValidateFails
     */
    protected function _checkFrozenSms(CUser $user) {
        $expired_date = (new \DateTime($user->sms_pass_date))->modify('+10 minutes');
        $now = (new \DateTime());

        if($user->sms_pass_date && $now <= $expired_date) {
            $interval = $now->diff($expired_date);
            throw new ExValidateFails(['retry_in' => $interval->format('%i')]);
        }
    }

    /**
     * Выставляет автоматический пароль
     * @return string
     */
    protected function autoPassword() {
        return $this->_random(8);
    }

    /**
     * Формирование рандомов для нужд объекта пользователь
     * @param $length
     * @return string
     */
    protected function _random($length) {
        return RandomGenerator::makePassword(8);
    }


    /**
     * Действия в старом кабинете
     * @param $command
     * @param $params
     * @return mixed
     */
    protected function _run($command) {

        $url = ProjectConfig::getInstance()->getKey('settings', 'account_url');
        $request = curl_init();

        curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($request, CURLOPT_URL, sprintf('%s%s', $url, $command));
        curl_setopt($request, CURLOPT_POST, true);
        curl_setopt($request, CURLOPT_SSL_VERIFYPEER, false);
        $result = json_decode(curl_exec($request));
        curl_close($request);

        return $result;
    }


    /**
     * Перемещает файл в папку с файлами
     *
     * @param $name
     */

    protected function moveFile($name, $dir) {
        rename(TMP_DIR.'/user_files/'.$name, ProjectConfig::getInstance()->getKey('uploads', $dir).'/'.$name);
    }

    /**
     * Отслеживание и сохранение параметров визита пользователя
     *   - Дата и время визита
     *   - Сохранение локации пользователя (только для PRODUCTION)
     *
     * @param $user
     * @return bool
     */
    protected function _trackVisit(CUser $user) {

        if(Session::getInstance()->current_admin) {
            return false;
        }

        $user->last_visit = (new \DateTime())->format('Y-m-d H:i:s');
        $user->save();

        return true;

    }

    /**
     * Получение с внешнего API информации о локации пользователя
     * @return mixed
     */
    protected function __location() {
        $geo = new ServiceGeo();
        return $geo->info();
    }

}

?>
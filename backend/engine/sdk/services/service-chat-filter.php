<?php

namespace SDK\Services;

use SDK\Objects\CChatRuleExc;
use SDK\Objects\CChatRules;
use SDK\Objects\CChatWary;
use SDK\Objects\CUser;
use Vendor\Core\ExCommon;
use Vendor\Core\ProjectConfig;

class ServiceChatFilter {

	protected $__user;

	public function __construct($user) {
		$this->__user = $user;
	}

	public function onMessageWarnCheck($message) {

		$rules = CChatRules::find('status = :status', [':status' => 'accept'], ['orderby' => 'priority ASC, precision_percent DESC']);

		try {
			foreach ($rules as $rule) {
				switch ($rule->type) {
					case CChatRules::TYPE_FIND_WORD:
						$this->checkWarnWord($rule, $message);
						break;
					case CChatRules::TYPE_FIND_REPEATS:
						$this->checkFindRepeats($rule, $message);
						break;
				}
			}

			return false;
		} catch (ExCommon $e) {
				return $this->onTimeBlockCheater($message, $rule);
		}
	}

	public function onTimeBlockCheater($message, $rule) {

		$user = $this->__user;
		$hide_message = false;

		$blocking_rules_ids = CChatRules::find('precision_percent >= :precision_percent and status = :status and blocking = :blocking', [':precision_percent' => ProjectConfig::getInstance()->getKey('filter_chat', 'block_percent'), ':status' =>'accept', ':blocking' => 'auto'])->id;

		$fix_hide_rules_ids = CChatRules::find('action = :action and status = :status and blocking = :blocking', [':action' => 'hide', ':status' => 'accept', ':blocking' => 'auto'])->id;

		// действия по трем сообщениям
		if (!empty($blocking_rules_ids) and in_array($rule->id,$blocking_rules_ids) and $user->role == CUser::ROLE_AUTHOR) {
			$wary_date = new \DateTime('-' . ProjectConfig::getInstance()->getKey('filter_chat', 'wary_time') . ' hours');
			$params = array(':user_id' => $user->id, ':status' => 'new', ':blocking_rules_ids' => $blocking_rules_ids, ':date' => $wary_date->format('Y-m-d H:i:s'));
			$warys = CChatWary::find('user_id = :user_id and status = :status and rule_id in(:blocking_rules_ids) and date >= :date', $params);

			if ($warys->getCount() >= ProjectConfig::getInstance()->getKey('filter_chat', 'wary_count')) {

				if ($user->bet_ability == CUser::USER_ACTIVE) {
					$hide_message = true;
					// временный функционал

					/*$mail = new View('block-message-author');
					$mail->setTemplate('/email.xslt');
					$mail->addObject('rules', CChatRules::find('id in (?)',array($warys->rule_ids),['orderby'=>'id DESC']));
					$mail->addObject('message', $message);
					$mail->addObject('user', $user);
					$role =  $user->role == CUser::ROLE_AUTHOR ? 'авторов' : 'заказчиков';
					MyApplication::getInstance()->sendMail('margarita.m@napishem.com', 'Блокировка ' . $role, $mail->toHtml());*/
					// временный функционал
					//ServiceBlocking::getInstance()->onTimeBlockUser($user->getId(), null, null, 1, CUserBlocking::BLOCK_REASON_BREAKING_OF_RULES);
				}
			}
		}
		// действия если нарушено правило, скрывающее сообщение
		if (!empty($fix_hide_rules_ids) and in_array($rule->id,$fix_hide_rules_ids)) {
			$hide_message = true;
		}// действия если нарушено правило, блокирующее пользователя уточнить актуальность доделать письма
		/*if (!empty($fix_block_rules_ids) and in_array($rule->getId(),$fix_block_rules_ids)) {
			if ($user->getBetAbility() == CUser::USER_ACTIVE ) {
				$hide_message = true;
				// временный функционал
				$mail = new View('block-message-author-fix');
				$mail->setTemplate('/email.xslt');
				$mail->addObject('rule', $rule);
				$mail->addObject('message', $message);
				$mail->addObject('user', $user);
				$role = $user->getRole() == CUser::ROLE_AUTHOR ? 'авторов' : 'заказчиков';
				MyApplication::getInstance()->sendMail('margarita.m@napishem.com', 'Блокировка ' . $role, $mail->toHtml());
				// временный функционал
				//ServiceBlocking::getInstance()->onTimeBlockUser($user->getId(), null, null, 1, CUserBlocking::BLOCK_REASON_BREAKING_OF_RULES);
			}
		}*/
		return $hide_message;
	}
	public function onViewedOrderMessages($sender_id, $order_id, $user_id) {
		(new ServiceOnline())->markMessageAsViewed($sender_id, $order_id, $user_id);
	}

	// метод доработан
	public function checkWarnWord($rule, $message) {
		if($this->checkWarnText($rule, $message->text)){

			$wary = new CChatWary();
			$wary->user_id = $message->owner_id;
			$wary->message_id = $message->id;
			$wary->order_id = $message->order_id;
			$wary->recipient_id = $message->author_id;
			$wary->rule_id = $rule->id;
			$wary->date = date('Y-m-d H:i:s');
			$wary->status = 'new';
			$wary->save();
			throw new ExCommon('111');
		}
	}
	public function checkWarnText($rule, $text) {

		$needle = trim(mb_strtolower($rule->rule, 'UTF-8'));
		$haystack = trim(mb_strtolower($text, 'UTF-8'));
		$pos = strpos($haystack, $needle);

		while ($pos !== false) {
			$pos = strpos($haystack, $needle);
			$excs = CChatRuleExc::find('rule_id = :rule_id', [':rule_id' => $rule->id]);

			if(!$excs->getCount()){
				return true;
			}
			foreach ($excs as $exc) {
				$exc_needle = trim(mb_strtolower($exc->exc, 'UTF-8'));
				$exc_haystack = trim(mb_strtolower($haystack, 'UTF-8'));
				$exc_pos = strpos($exc_haystack, $exc_needle);

				if (!(!($exc_pos === false) and $pos >= $exc_pos and $pos <= ($exc_pos + strlen($exc->exc)))) {
					return true;
				}
			}

			$haystack = self::StrReplaceOnce($needle, '', $haystack);
			$pos = strpos($haystack, $needle);
		}

		return false;
	}

	public function StrReplaceOnce($search, $replace, $text) {
		$pos = strpos($text, $search);
		return $pos !== false ? substr_replace($text, $replace, $pos, strlen($search)) : $text;
	}

	public function checkFindRepeats($rule, $message) {

		//метод будет усовершенствован с учетом необходимости
		$needle = trim(mb_strtolower($rule->getRule(),'UTF-8'));

		$haystack = trim(mb_strtolower($message->getText(),'UTF-8'));
		$pos = substr_count($haystack, $needle);
		if($pos >= $rule->getRepeatCount()){
			$wary = new CChatWary();
			$wary->user_id($message->getOwnerId());
			$wary->message_id($message->getId());
			$wary->order_id($message->getOrderId());
			$wary->recipient_id($message->getAuthorId());
			$wary->rule_id($rule->getId());
			$wary->date(date('Y-m-d H:i:s'));
			$wary->status('new');
			$wary->save();

			throw new ExCommon(__CLASS__);
		}
	}

}

?>
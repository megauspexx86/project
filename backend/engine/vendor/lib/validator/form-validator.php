<?php

namespace Vendor\Lib\Validator;

class FormValidator {

	protected $rules;
	
	function __construct() {
		$this->rules = array();
	}
	
	public function addRule(IValidationRule $rule) {
		$this->rules[] = $rule;
	}
	
	public function validate(array $values) {
		$errors = array();
		foreach($this->rules as $rule) {
			try {
				$rule->validate($values);
			} catch(ExValidateFails $e) {
				$errors[] = $e->getErrors();
			}
		}

		if($errors) {
			$final_errors = array();
			foreach($errors as $error) {
				foreach($error as $key => $error_code) {

					// В итоговый массив ошибок попадет только первая ошибка поля
					if(!isset($final_errors[$key])) {
						$final_errors[$key] = $error_code;
					}
				}
			}
			throw new ExValidateFails($final_errors, $this);
		}
	}
}

?>

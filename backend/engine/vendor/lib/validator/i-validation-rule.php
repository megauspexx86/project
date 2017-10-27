<?php

namespace Vendor\Lib\Validator;


interface IValidationRule {
    function validate(array $values);
}

?>
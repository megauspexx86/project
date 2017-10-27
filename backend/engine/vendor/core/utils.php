<?php

namespace Vendor\Core;

class Utils {

    static public function value2dom($value, $root, $attrs = array()) {

        switch(gettype($value)) {
            case 'double':
            case 'integer':
            case 'string':
                return $root->appendChild(new \DOMText($value));
                break;
            case 'object':
                return $value->toDomDocument($root);
                break;
            case 'boolean':
                return $root->appendChild(new \DOMText(intval($value)));
                break;
            case 'array':
                /*
                    <array>
                        <e>vasdvasdv</e>
                        <e>asdcasdc</e>
                        <e><object/></e>
                    </array>
                */
                foreach($value as $k => $v) {
                    if(is_numeric($k) || empty($k)) {
                        $name = "e";
                        $attrs = array('index' => $k);
                    } else {
                        $name = $k;
                        $attrs = array();
                    }


                    $dom_array = $root->appendChild(new \DomElement($name));
                    foreach ($attrs as $attr => $attr_value) {
                        $dom_array->setAttribute($attr, $attr_value);
                    }

                    Utils::value2dom($v, $dom_array, $attrs);
                }
                return $root;
                break;
            case 'NULL':
                return $root->appendChild(new \DOMText(''));
                break;
        }
    }

    static public function transliteration($value, $separator = '-') {

        $from_str = array (
            'а|А|A','б|Б|B','в|В|V','г|Г|G','д|Д|D','е|Е|E','ё|Ё','ж|Ж|J','з|З|Z','и|И|I','й|Й','к|К|K','л|Л|L','м|М|M','н|Н|N','о|О|O',
            'п|П|P','р|Р|R','с|С|S','т|Т|T','у|У|U','ф|Ф|F','х|Х|H','ц|Ц|C','ч|Ч','ш|Ш','щ|Щ','ъ|Ъ','ы|Ы|Y','ь|Ь','э|Э','ю|Ю','я|Я',
            '\s'
        );

        $to_str = array (
            'a','b','v','g','d','e','e','j','z','i','i','k','l','m','n','o',
            'p','r','s','t','u','f','h','c','ch','sh','sch','','y','','e','ju','ya',
            '-'
        );

        foreach($from_str as $i=>$v) {
            $value = mb_ereg_replace($from_str[$i], $to_str[$i], $value);
        }

        return preg_replace("/(-){2,}/", $separator, preg_replace("/[^a-z0-9]/", $separator, $value));
    }

}

?>
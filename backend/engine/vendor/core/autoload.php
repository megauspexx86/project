<?php

class Autoload {

    private $_dir;

    public function __construct($dir) {

        if(!file_exists($dir)) {
            throw new Exception('directory "' . $dir . '" not found');
        }

        $this->_dir = $dir;

        spl_autoload_register(array($this, 'loader'), true, true);
    }

    private function loader($className) {

        $class_path = explode("\\", $className);

        $class = array_pop($class_path);

        $search = array(
            'A', 'B', 'C', 'D', 'E',
            'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O',
            'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z'
        );

        $replace = array(
            '-a', '-b', '-c', '-d', '-e',
            '-f', '-g', '-h', '-i', '-j',
            '-k', '-l', '-m', '-n', '-o',
            '-p', '-q', '-r', '-s', '-t',
            '-u', '-v', '-w', '-x', '-y', '-z'
        );

        $name = substr(str_replace($search, $replace, $class), 1);

        $path = sprintf("%s/%s/%s.php", $this->_dir, strtolower(join("/", $class_path)), $name);
        if(!file_exists($path)) {
            return false;
        }

        require_once($path);
    }
}

?>
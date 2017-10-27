<?php

namespace Vendor\Core;

class HtmlView extends View {

    protected $name;
    protected $html;
    protected $processor;

    public function __construct($name) {

        $this->name = $name;

        $this->processor = new \Smarty();

        $this->processor->setTemplateDir($this->_getTemplateDir());
        $this->processor->setCompileDir($this->_getCompileDir());
        $this->processor->setCacheDir($this->_getCacheDir());
    }

    public function setDelimiter($left = '{', $right = '}') {
        $this->processor->left_delimiter = $left;
        $this->processor->right_delimiter = $right;
    }

    protected function _getTemplateDir() {
        return TEMPLATE_DIR;
    }

    /**
     * Директория для сохранения скомпилированных шаблонов
     * @return string
     */
    protected function _getCompileDir() {
        return TMP_DIR . '/templates/compile/';
    }

    /**
     * Директория для сохранения кэша шаблонов
     * @return string
     */
    protected function _getCacheDir() {
        return TMP_DIR . '/templates/cache/';
    }

    protected function render() {

        $objects = [];

        foreach($this->objects as $name => $object) {
            $objects[$name] = is_object($object) ? $object->render() : $object;
        }

        $this->processor->assign($objects);
        $this->html = $this->processor->fetch($this->name);
    }

    public function getContentType() {
        return 'text/html';
    }

    /**
     * @return String
     */
    public function __toString() {

        if (!$this->html) {
            $this->render();
        }

        return $this->html;
    }

}
?>
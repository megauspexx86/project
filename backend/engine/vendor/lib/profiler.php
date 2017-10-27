<?php

namespace Vendor\Lib;

use Vendor\Core\Log;
use Vendor\Core\ProjectConfig;

class Profiler {

    protected $status = false;
    protected $name;
    protected $session_name;

    public function __construct($name, $admin_session = 'admin') {
        $this->name = $name;
        $this->session_name = $admin_session;
    }

    public function start() {

        if(PROFILING_MODE === 0) {
            return false;
        }

        if($this->status) {
            return false;
        }

        if(!isset($_SESSION[$this->session_name]) || !$_SESSION[$this->session_name]) {
            return false;
        }

        $this->status = true;
        return xhprof_enable(XHPROF_FLAGS_CPU + XHPROF_FLAGS_MEMORY);
    }

    public function end() {
        if(!$this->status) {
            return false;
        }
        $data = xhprof_disable();
        $xhprof_runs = new \XHProfRuns_Default();
        $run_id = $xhprof_runs->save_run($data, $this->name);
        $this->_print($run_id);
    }

    /**
     * Логгирование информации о результатах профилирования
     * @param $id
     */
    protected function _print($id) {
        $url = str_replace(';', '.' , urldecode($_SERVER['REQUEST_URI'])). ';';
        $date = (new \DateTime())->format('Y-m-d H:i:s') . ';';
        $link = sprintf("%s?run=%s&source=%s", ProjectConfig::getInstance()->getKey('settings', 'profiling_url'), $id, $this->name) . ';';

        $log = new Log('profiler.log');
        $log->print_r(['result' => [
            'url' => $url,
            'date' => $date,
            'link' => $link,
        ]]);
    }
}

?>
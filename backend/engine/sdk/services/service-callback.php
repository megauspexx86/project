<?php

namespace SDK\Services;


class ServiceCallback {

    const MODE_CALLBACK = 'CALLBACK'; // Сервис работает в режиме обратного звонка
    const MODE_BONUS = 'BONUS'; // Сервис работает в режиме предоставления бонуса

    /**
     * Получает режим работы сервиса обратный звонок
     */
    static public function mode() {

        if (isset($_COOKIE['__CLOSE_CALLBACK__'])) {
            return self::MODE_BONUS;
        }

        $hash = (new ServiceSettings())->getHash(['callback_mon_from', 'callback_tu_from', 'callback_wen_from', 'callback_wen_from', 'callback_thu_from', 'callback_fri_from', 'callback_sat_from', 'callback_sun_from', 'callback_mon_to', 'callback_tu_to', 'callback_wen_to', 'callback_thu_to', 'callback_fri_to', 'callback_sat_to', 'callback_sun_to']);

        $call_back_days = array_values($hash);

        if ($call_back_days[date("N", time()) - 1] == '' || $call_back_days[date("N", time()) + 6] == '') {
            return self::MODE_BONUS;
        }

        $a = date("N", time());
        $time = [$call_back_days[$a - 1], $call_back_days[$a + 6]];
        $current_time = time();

        foreach ($time as $t) {
            list($start, $end) = explode("-", $t);
            if ($current_time >= strtotime(date(sprintf("Y-m-d %s:00", $start), time())) && $current_time <= strtotime(date(sprintf("Y-m-d %s:59", $end), time()))) {
                return self::MODE_CALLBACK;
            }
        }

        return self::MODE_BONUS;
    }
}


?>
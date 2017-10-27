<?php

/**
 * Конфигурация среды PRODUCTION
 *
 * При внесении новой настройки читать инструкцию global.php
 */

$global = require_once('global.php');

$config = [

    /**
     * Общие настройки приложения
     */
    'common' => [

        /**
         * Страница анкеты пользователя в старом ЛК
         */
        'settings_page' => 'https://a.napishem.ru/anketa.html?flag=1',

        /**
         * Техничекая страница, на которую будет переведен пользователь после успешного создания заказа
         * через API с регистрацией нового пользователя
         */
        'success_create_url_new_user' => 'http://napishem.ru/zakaz-razmeschen-%s.html?token=%s',

        /**
         * Техничекая страница, на которую будет переведен ранее зарегистрированный пользователь
         * после успешного создания заказа через API
         */
        'success_create_url_old_user' => 'http://napishem.ru/order-autorization/?code=%s&email=%s',


        /**
         * Проброс пользователя на выход из аккаунта при создании заказа через API для дальнейшего редиректа на
         *  - success_create_url_new_user
         *  - success_create_url_old_user
         */
        'success_create_url' => 'http://a.napishem.ru/switch/?to=%s',


        /**
         * Адрес CSS для партнерских компонентов
         */
        'css' => 'https://partner.napishem.ru/widget.css'
    ],

    /**
     * URL которые используются на проекте, название settings из старых версий конфигов
     */
    'settings' => [

        /**
         * Главная страница основого сайта
         */
        'base_url' => 'https://www.napishem.ru',

        /**
         * Адрес API проекта
         */
        'api_url' => 'https://api2.napishem.ru',

        /**
         * URL онлайн-сервиса
         */
        "online_url" => "https://online.napishem.ru",

        /**
         * Главная страница поддомена promo
         */
        'promo_url' => 'https://promo.napishem.ru',

        /**
         * Главная страница поддомена отзывов
         */
        'review_url' => 'https://otzyvy.napishem.ru',

        /**
         * Главная страница поддомена для авторов
         */
        'author_url' => 'https://author.napishem.ru',

        /**
         * Адрес старого личного кабинета
         */
        'account_url' => 'https://a.napishem.ru',

        /**
         * Адрес нового личного кабинета
         */
        'new_account_url' => 'https://account.napishem.ru',

        /**
         * Главная страница партнерской программы
         */
        'partner_url' => "https://partner.napishem.ru",

        /**
         * Адрес URL для доступа к аватарам
         */
        'avatar_path' => 'https://napishem.ru/work-data/avatars',

        /**
         * Адрес директории для изображений в письмах
         */
        'mail_images_url' => 'https://img.napishem.ru/mail',

        /**
         * Адрес зеркала сайта
         */
        'mirror_url' => 'http://napishem.pro',
		
		/**
         * Адрес для отправки push notification
         */
		'events_url' => 'https://events.napishem.ru',

        /**
         * Урл системы профилирования
         */
        'profiling_url' => 'https://xhprof.napishem.ru/index.php',

        /**
         * URL обработчика входящих сообщений от ботов (webhook)
         */
        'bot_url' => 'https://bot.napishem.ru',

        /**
         * Адрес новой панели управления
         */
        'admin_url' => 'https://admin.napishem.ru',


        /**
         * Директория доступа к консольным скриптам
         */
        'console_scripts_dir' => '/home/anton/www/napishem_new/console'
    ],

    /**
     * Пути для загрузки пользовательских файлов
     */
    'uploads' => [

        /**
         * Путь для загрузки аватаров пользователей
         */
        'avatar_dir' => '/home/anton/www/napishem.ru/work-data/avatars',

        /**
         * Путь для загрузки файлов заказов
         */
        'user_file_dir' => '/home/anton/www/napishem.ru/work-data/attaches',

        /**
         * Загрузка пользовательских файлов для статики партнерской программы (WL)
         */
        'partner_file_dir' => '/home/anton/www/napishem_new/account/static/assets/images/white_label',
    ],

    /**
     * Активация внешних служб: Счетчики яндекс метрики, google analytics, tagmanager, livetex etc
     */
    'external_service' => [

        /**
         * Счетчик статистки яндекс метрики И google analytics
         */
        'yandex_metrika' => 1,

        /**
         * Чат поддержки на страницах сайта
         */
        'support_chat' => 1,

        /**
         * Диалог "Перезвонить мне"
         */
        'callback' => 1,

        /**
         * Сервис giftd
         */
        'giftd' => 1,

        /**
         * Активация google tag manager
         */
        'google_tag_manager' => 1,

        /**
         * Активация facebook трекера
         */
        'facebook_pixel' => 1
    ],

    /**
     * Настройки проекта партнерской программы
     */
    'partner' => [

        /**
         * Пользователи которым доступно создание WL
         */
        'wl_ids' => [222108, 102914]
    ],

    /**
     * Активация отправки SMS
     */
    "sms" => true,

	'filter_chat' => [
		'min_count' => 10, /* минимальное количество срабатывания правила для выставления веса*/
		'wary_count' => 3, /* количество нарушений для наступления блокировки автора*/
		'wary_time' => 3, /* период, часов, для учета количества нарушений*/
		'block_percent' => 80 /*процент точности правила для проведения блокировки*/
	],

    /**
     * Настройки ботов мессенджеров
     */
    'messenger' =>[

        /**
         * Имя телеграм бота
         */
        'telegram_botname' => 'napishembot'
    ]
];

return array_replace_recursive($global, $config);

?>
<?php

/**
 * Конфигурация среды DEV
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
        'settings_page' => 'https://a.napdev.ru/anketa.html?flag=1',

        /**
         * Техничекая страница, на которую будет переведен пользователь после успешного создания заказа
         * через API с регистрацией нового пользователя
         */
        'success_create_url_new_user' => 'http://napdev.ru/zakaz-razmeschen-%s.html?token=%s',

        /**
         * Техничекая страница, на которую будет переведен ранее зарегистрированный пользователь
         * после успешного создания заказа через API
         */
        'success_create_url_old_user' => 'http://napdev.ru/order-autorization/?code=%s&email=%s',


        /**
         * Проброс пользователя на выход из аккаунта при создании заказа через API для дальнейшего редиректа на
         *  - success_create_url_new_user
         *  - success_create_url_old_user
         */
        'success_create_url' => 'http://a.napdev.ru/switch/?to=%s',


        /**
         * Адрес CSS для партнерских компонентов
         */
        'css' => 'https://partner.napdev.ru/widget.css'
    ],

    /**
     * URL которые используются на проекте, название settings из старых версий конфигов
     */
    'settings' => [

        /**
         * Главная страница основого сайта
         */
        'base_url' => 'https://napdev.ru',

        /**
         * Адрес API проекта
         */
        'api_url' => 'https://api.napdev.ru',

        /**
         * URL онлайн-сервиса
         */
        "online_url" => "https://online.napdev.ru",

        /**
         * Главная страница поддомена promo
         */
        'promo_url' => 'https://promo.napdev.ru',

        /**
         * Главная страница поддомена отзывов
         */
        'review_url' => 'https://otzyvy.napdev.ru',

        /**
         * Главная страница поддомена для авторов
         */
        'author_url' => 'https://author.napdev.ru',

        /**
         * Адрес старого личного кабинета
         */
        'account_url' => 'https://a.napdev.ru',

        /**
         * Адрес нового личного кабинета
         */
        'new_account_url' => 'https://account.napdev.ru',

        /**
         * Главная страница партнерской программы
         */
        'partner_url' => "https://partner.napdev.ru",

        /**
         * Адрес URL для доступа к аватарам
         */
        'avatar_path' => 'https://napdev.ru/work-data/avatars',

        /**
         * Адрес директории для изображений в письмах
         */
        'mail_images_url' => 'https://napdev.ru/images/mail',

        /**
         * Адрес зеркала сайта
         */
        'mirror_url' => 'https://partnerdev.ru',
		
		/**
         * Адрес для отправки push notification
         */
		'events_url' => 'https://events.napdev.ru',

        /**
         * Урл системы профилирования
         */
        'profiling_url' => 'https://xhprof.napdev.ru/index.php',

        /**
         * URL обработчика входящих сообщений от ботов (webhook)
         */
        'bot_url' => 'https://bot.napdev.ru',

        /**
         * Адрес новой панели управления
         */
        'admin_url' => 'https://admin.napdev.ru',

        /**
         * Директория доступа к консольным скриптам
         */
        'console_scripts_dir' => '/var/www/napishem_new/console'
    ],

    /**
     * Пути для загрузки пользовательских файлов
     */
    'uploads' => [

        /**
         * Путь для загрузки аватаров пользователей
         */
        'avatar_dir' => '/var/www/napishem/work-data/avatars',

        /**
         * Путь для загрузки файлов заказов
         */
        'user_file_dir' => '/var/www/napishem/work-data/attaches',

        /**
         * Загрузка пользовательских файлов для статики партнерской программы (WL)
         */
        'partner_file_dir' => '/var/www/napishem_new/account/static/assets/images/white_label',
    ],

    /**
     * Активация внешних служб: Счетчики яндекс метрики, google analytics, tagmanager, livetex etc
     */
    'external_service' => [

        /**
         * Счетчик статистки яндекс метрики И google analytics
         */
        'yandex_metrika' => 0,

        /**
         * Чат поддержки на страницах сайта
         */
        'support_chat' => 0,

        /**
         * Диалог "Перезвонить мне"
         */
        'callback' => 0,

        /**
         * Сервис giftd
         */
        'giftd' => 0,

        /**
         * Активация google tag manager
         */
        'google_tag_manager' => 0,

        /**
         * Активация facebook трекера
         */
        'facebook_pixel' => 0
    ],

    /**
     * Настройки проекта партнерской программы
     */
    'partner' => [

        /**
         * Пользователи которым доступно создание WL
         */
        'wl_ids' => [195235, 195107]
    ],

    /**
     * Активация отправки SMS
     */
    "sms" => false,

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
        'telegram_botname' => 'napishemdevbot'
    ]
];

return array_replace_recursive($global, $config);

?>
<?php

/**
 * Конфигурация среды Local
 *
 * При внесении новой настройки читать инструкцию global.php
 */

$global = require_once('global.php');

$config = [

    /**
     * Настройки собранных front-end скриптов
     */
    'bundles' => [

        /**
         * Frontend кабинета заказчика
         */
        "customer" => "http://account.napishem.lc:3001/js/bundle.customer.js",

        /**
         * Кабинет партнера
         */
        'partner' => 'http://account.napishem.lc:3004/js/bundle.partner.js',

        /**
         * JS панели управления
         */
        'admin' => 'http://admin.napishem.lc:3001/js/bundle.js',

    ],

    /**
     * Общие настройки приложения
     */
    'common' => [

        /**
         * Страница анкеты пользователя в старом ЛК
         */
        'settings_page' => 'http://a.napishem.lc/anketa.html?flag=1',

        /**
         * Техничекая страница, на которую будет переведен пользователь после успешного создания заказа
         * через API с регистрацией нового пользователя
         */
        'success_create_url_new_user' => 'http://napishem.lc/zakaz-razmeschen-%s.html?token=%s',

        /**
         * Техничекая страница, на которую будет переведен ранее зарегистрированный пользователь
         * после успешного создания заказа через API
         */
        'success_create_url_old_user' => 'http://napishem.lc/order-autorization/?code=%s&email=%s',


        /**
         * Проброс пользователя на выход из аккаунта при создании заказа через API для дальнейшего редиректа на
         *  - success_create_url_new_user
         *  - success_create_url_old_user
         */
        'success_create_url' => 'http://a.napishem.lc/switch/?to=%s',

    ],

    /**
     * URL которые используются на проекте, название settings из старых версий конфигов
     */
    'settings' => [

        /**
         * Главная страница основого сайта
         */
        'base_url' => 'http://napishem.lc',

        /**
         * Адрес API проекта
         */
        'api_url' => 'http://api.napishem.lc',

        /**
         * URL онлайн-сервиса
         */
        "online_url" => "http://online.napishem.lc",

        /**
         * Главная страница поддомена promo
         */
        'promo_url' => 'http://promo.napishem.lc',

        /**
         * Адрес зеркала сайта
         */
        'mirror_url' => 'https://www.napishem.ru',

        /**
         * Главная страница поддомена отзывов
         */
        'review_url' => 'http://otzyvy.napishem.lc',

        /**
         * Главная страница поддомена для авторов
         */
        'author_url' => 'http://author.napishem.lc',

        /**
         * Адрес старого личного кабинета
         */
        'account_url' => 'http://a.napishem.lc',

        /**
         * Адрес нового личного кабинета
         */
        'new_account_url' => 'http://account.napishem.lc',

        /**
         * Главная страница партнерской программы
         */
        'partner_url' => "http://partner.napishem.lc",

        /**
         * Адрес URL для доступа к аватарам
         */
        'avatar_path' => 'http://napishem.lc/work-data/avatars',

        /**
         * Адрес директории для изображений в письмах
         */
        'mail_images_url' => 'http://napishem.lc/images/mail',

        /**
         * Адрес для отправки push notification
         */
        'events_url' => 'http://events.napishem.lc',

        /**
         * URL обработчика входящих сообщений от ботов (webhook)
         */
        'bot_url' => 'http://bot.napishem.lc',

        /**
         * Адрес новой панели управления
         */
        'admin_url' => 'http://admin.napishem.lc',

        'public_assets' => '/dev',
    ],

    /**
     * Пути для загрузки пользовательских файлов
     */
    'uploads' => [

        /**
         * Путь для загрузки аватаров пользователей
         */
        'avatar_dir' => '/vagrant/303/work-data/avatars',

        /**
         * Путь для загрузки файлов заказов
         */
        'user_file_dir' => '/vagrant/303/work-data/attaches',

        /**
         * Загрузка пользовательских файлов для статики партнерской программы (WL)
         */
        'partner_file_dir' => '/home/anton/server/www/napishem/account/static/assets/images/white_label',
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
     * Протокол на котором работает проект
     */
    "protocol" => "http",


    /**
     * Настройки проекта партнерской программы
     */
    'partner' => [

        /**
         * Пользователи которым доступно создание WL
         */
        'wl_ids' => [195235, 195107, 195539]
    ],


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
        'telegram_botname' => 'apoltestbot'
    ]
];
return  array_replace_recursive($global, $config);

?>
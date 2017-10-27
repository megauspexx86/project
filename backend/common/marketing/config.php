<?php

/**
 * Конфиг для программ по маркетингу
 */

return [

    /**
     * Блок для значений проводимых акций и скидок
     */
    'marketing' => [

        /**
         * Блок для скидок на второй и третий заказы
         * https://redmine.napdev.ru/issues/10525
         */
        'second_third_orders_discounts' => [

            /**
             * Код скидки на второй заказ
             */
            'second_order_discount' => 'zakaz2',

            /**
             * Код скидки на третий заказ
             */
            'third_order_discount' => 'skidka3',

            /**
             * Интервал создания заказа
             */
            'order_create_date_from' => '2017-11-01 00:00:00',

            'order_create_date_to' => '2017-11-30 23:59:59',


            /**
             * Интервал оплаты заказа
             */
            'order_pay_date_from' => '2017-11-01 00:00:00',

            'order_pay_date_to' => '2017-11-30 23:59:59',

        ],

        /**
         * Скидки для карточной игры
         * https://redmine.napdev.ru/issues/10383
         */
        'game_discounts' => ['happy5', 'day7', 'napishem10'],
    ]
];
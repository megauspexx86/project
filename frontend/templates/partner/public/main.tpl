<main class="main">
    <section id="conditions" class="section">
        <div class="wrapper">
            <h2 class="h2">Для вас самые лучшие условия</h2>
            <div class="conditions">
                <div class="conditions__inner">
                    <div class="conditions__item">
                        <div class="conditions__img" data-condImg='1'>
                        </div>
                        <p class="text">25% Мы отдадим за первый заказ</p>
                    </div>
                    <div class="conditions__item">
                        <div class="conditions__img" data-condImg='2'>
                        </div>
                        <p class="text">15% Вы получите за ребиллы</p>
                    </div>
                    <div class="conditions__item">
                        <div class="conditions__img" data-condImg='3'>
                        </div>
                        <p class="text">Срок ребиллов </br>9 месяцев</p>
                    </div>
                </div>
                <div class="conditions__inner">
                    <div class="conditions__item">
                        <div class="conditions__img" data-condImg='4'>
                        </div>
                        <p class="text">Трафик монетизируется круглые сутки</p>
                    </div>
                    <div class="conditions__item">
                        <div class="conditions__img" data-condImg='5'>
                        </div>
                        <p class="text">Прозрачная статистика</p>
                    </div>
                    <div class="conditions__item">
                        <div class="conditions__img" data-condImg='6'>
                        </div>
                        <p class="text">Большой выбор промо-материалов</p>
                    </div>
                </div>
                <div class="conditions__inner">
                    <div class="conditions__item">
                        <div class="conditions__img" data-condImg='7'>
                        </div>
                        <p class="text">Выплаты любым удобным способом для партнера</p>
                    </div>
                    <div class="conditions__item">
                        <div class="conditions__img" data-condImg='8'>
                        </div>
                        <p class="text">У вас будет личный менеджер</p>
                    </div>
                    <div class="conditions__item">
                        <div class="conditions__img" data-condImg='9'>
                        </div>
                        <p class="text">Бесплатное обучение заработку для новичков</p>
                    </div>
                </div>
            </div>
            {if not $logged}
                <button class="button become-a-partner">Стать партнером</button>
            {else}
                <button class="button become-a-partner become-a-partner-logged">Стать партнером</button>
            {/if}
        </div>
    </section>
    <section class="section">
        <h2 class="h2">Как работает наша программа?</h2>
        <div class="steps">
            <div class="steps__step">
                <div class="steps__descr steps__descr--left">Вы регистрируетесь </br>в системе</div>
                <div class="steps__number">1</div>
            </div>
            <div class="steps__step steps__step--right">
                <div class="steps__descr">Размещаете наши </br>промо-материалы</div>
                <div class="steps__number">2</div>
            </div>
            <div class="steps__step">
                <div class="steps__descr steps__descr--left">От вас приходят </br>новые заказчики</div>
                <div class="steps__number">3</div>
            </div>
            <div class="steps__step steps__step--right">
                <div class="steps__descr">Клиенты оплачивают работу </br>и радуются выгодной покупке :)</div>
                <div class="steps__number">4</div>
            </div>
            <div class="steps__step">
                <div class="steps__descr steps__descr--left">Вы получаете прибыль </br>со всех заказов в течение 9 месяцев</div>
                <div class="steps__number">5</div>
            </div>
        </div>
        {if not $logged}
            <button class="button become-a-partner">Присоединиться</button>
        {else}
            <button class="button become-a-partner become-a-partner-logged">Присоединиться</button>
        {/if}

    </section>
    <section class="ribbon">
        <div class="ribbon__inner">
            <p class="ribbon__text ribbon__text--mr20">
                Мы открыты для каждого!</br>
                Нам не важно у вас страница в VK или крупный портал
            </p>
            {if not $logged}
                <button class="button button--ribbon become-a-partner">Начать зарабатывать</button>
            {else}
                <button class="button button--ribbon become-a-partner-logged">Начать зарабатывать</button>
            {/if}

        </div>
    </section>
    <section id="benefits" class="section">
        <div class="wrapper">
            <h2 class="h2">Почему с нами выгодно работать?</h2>
            <div class="benefits">

                <div class="benefits__inner">
                    <div class="benefits__item">
                        <div class="benefits__item-top">
                            58%
                        </div>
                        <p class="text">Средняя
                            </br>конверсия оплаты</p>
                    </div>
                    <div class="benefits__item">
                        <div class="benefits__item-top">
                            40%
                        </div>
                        <p class="text">Заказывают работы
                            </br>повторно</p>
                    </div>

                </div>


                <div class="benefits__inner">
                    <div class="benefits__item">
                        <div class="benefits__item-top">
                            5
                            <span>заказов</span>
                        </div>
                        <p class="text">1 студент в среднем
                            </br>делает на Напишем</p>
                    </div>
                    <div class="benefits__item">
                        <div class="benefits__item-top benefits__item-top--arrow">
                            1000
                            <span>заказов</span>
                        </div>
                        <p class="text">Поступает на сайт
                            </br>ежедневно</p>
                    </div>
                </div>

                <div class="benefits__inner">
                    <div class="benefits__item">
                        <div class="benefits__item-top">
                            2980
                            <span>руб.</span>
                        </div>
                        <p class="text">Средняя стоимость
                            </br>одной работы</p>
                    </div>

                    <div class="benefits__item">
                        <div class="benefits__item-top">
                            9
                            <span>лет</span>
                        </div>
                        <p class="text">Мы работаем
                            </br>на рынке</p>
                    </div>
                </div>

            </div>
        </div>
        {if not $logged}
            <button class="button become-a-partner">Стать партнером</button>
        {else}
            <button class="button become-a-partner-logged">Стать партнером</button>
        {/if}

    </section>
    <section class="section section--mob-hidden">
        <div class="wrapper">
            <h2 class="h2">Сколько я заработаю?</h2>
            <div class="money">
                <div class="money__text-wrapper">
                    <p class="money__text">Ваш заработок - это процент от стоимости работы.</p>
                    <p class="money__text">Чем больше количество и стоимость работ - тем больше ваш доход.</p>
                </div>
                <div class="slider__wrapper">

                    <ul class="slider__list">
                        <li class="slider__item">0</li>
                        <li class="slider__item">10 000</li>
                        <li class="slider__item">20 000</li>
                        <li class="slider__item">30 000</li>
                        <li class="slider__item">40 000</li>
                        <li class="slider__item">50 000</li>
                        <li class="slider__item">100 000</li>
                        <li class="slider__item">>200 000</li>
                    </ul>
                    <div id="slider">
                    </div>
                    <div class="slider__note">визиты на Напишем</div>
                </div>


                <div class="money__detail">
                    <div class="money__detail-col">
                        <div class="money__detail-col-inner">
                            <div class="money__detail-text money__detail-text--gray">Лиды:</div>
                            <div class="money__detail-text money__detail-text--gray">Заказы:</div>
                        </div>
                        <div class="money__detail-col-inner">
                            <div class="money__detail-text"><span id="money-leads">500</span> чел.</div>
                            <div class="money__detail-text"><span id="money-orders">600</span> зак.</div>
                        </div>
                    </div>
                    <div class="money__detail-col">
                        <div class="money__detail-col-inner">
                            <div class="money__detail-text money__detail-text--gray">Оплаты:</div>
                            <div class="money__detail-text money__detail-text--gray">Сумма оплат:</div>
                        </div>
                        <div class="money__detail-col-inner">
                            <div class="money__detail-text"><span id="money-payment">960</span> зак.</div>
                            <div class="money__detail-text"><span id="money-sum">1 080 000</span> руб.</div>
                        </div>
                    </div>
                    <div class="money__detail-col">
                        <div class="money__detail-col-inner">
                            <div class="money__detail-text money__detail-text--gray"></div>
                            <div class="money__detail-text money__detail-text--gray">Ваш доход:</div>
                        </div>
                        <div class="money__detail-col-inner">
                            <div class="money__detail-text"><span></span></div>
                            <div class="money__detail-text money__detail-text--big-blue"><span id="money-revenue">600 000</span> руб.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="section  section--gray">
        <div class="wrapper">
            <h2 class="h2">Топ партнеров за неделю</h2>
            <div class="top">
                <div class="top__item">
                    <span class="top__number">1</span>
                    <p class="top__text">Евгений</p>
                    <p class="top__text">110 370 руб.</p>
                </div>
                <div class="top__item">
                    <span class="top__number" data-bgc="gray">2</span>
                    <p class="top__text">Марина</p>
                    <p class="top__text">87 650 руб.</p>
                </div>
                <div class="top__item">
                    <span class="top__number" data-bgc="green">3</span>
                    <p class="top__text">Айнур</p>
                    <p class="top__text">62 340 руб.</p>
                </div>
            </div>
            {if not $logged}
                <button class="button become-a-partner">Начать зарабатывать</button>
            {else}
                <button class="button become-a-partner-logged">Начать зарабатывать</button>
            {/if}

        </div>
    </section>
    <section class="section  section--gray">
        <div class="wrapper">
            <h2 class="h2">Промо-материалы</h2>

            <ul class="promo-mat__list">
                <div class="promo-mat__inner">
                    <li class="promo-mat__item">
                        <div class="promo-mat__img" data-promo-mat="1"></div>
                        <div class="promo-mat__text">Формы заказа</div>
                    </li>
                    <li class="promo-mat__item">
                        <div class="promo-mat__img" data-promo-mat="2"></div>
                        <div class="promo-mat__text">Баннеры</div>
                    </li>
                </div>
                <div class="promo-mat__inner">
                    <li class="promo-mat__item">
                        <div class="promo-mat__img" data-promo-mat="3"></div>
                        <div class="promo-mat__text">Реферальная ссылка</div>
                    </li>
                    <li class="promo-mat__item">
                        <div class="promo-mat__img" data-promo-mat="4"></div>
                        <div class="promo-mat__text">Готовые страницы</div>
                    </li>
                </div>
            </ul>
            {if not $logged}
                <button class="button become-a-partner">Посмотреть подробнее</button>
            {else}
                <button class="button become-a-partner-logged">Посмотреть подробнее</button>
            {/if}
        </div>
    </section>

    <section id="reviews" class="section section--gray">

        <h2 class="h2">Отзывы партнеров</h2>
        <div class="reviews">
            <div class="reviews__item">
                <div class="reviews__inner">
                    <div class="reviews__head">
                        <img src="/resources/img/review1.jpg" alt="avatar" class="reviews__img">
                        <span class="reviews__name">Артем</span>
                    </div>
                    <p class="reviews__text">
                        Партнерка просто шикарная. Оптимальная для всех веб-мастеров. Саппорт шустрый, обращайтесь хоть каждый час, не заставят ждать ответ. Конверсия большая. Доходы в этом месяце выросли в разы. Удалось заработать 23 тыс. Выплатили без задержек. Кто не верит, могу прислать скрин статистики.</p>
                    <p class="reviews__date">23.09.2016</p>
                </div>
            </div>
            <div class="reviews__item">
                <div class="reviews__inner">
                    <div class="reviews__head">
                        <img src="/resources/img/review3.jpg" alt="avatar" class="reviews__img">
                        <span class="reviews__name">Ольга</span>
                    </div>
                    <p class="reviews__text">
                        Первая партнерка, с которой я начала сотрудничать. Работаю около месяца. Только положительные эмоции. Первые 7.500 вывела без проблем. В общем система, которую не стыдно порекомендовать.</p>
                    <p class="reviews__date">03.11.2016</p>
                </div>
            </div>
            <div class="reviews__item">
                <div class="reviews__inner">
                    <div class="reviews__head">
                        <img src="/resources/img/review2.jpg" alt="avatar" class="reviews__img">
                        <span class="reviews__name">Дмитрий</span>
                    </div>
                    <p class="reviews__text">
                        Партнерка на уровне. Для меня стала основной. Конверт радует, выплаты получаю стабильно. Отношение честное. Это радует. Отдельное спасибо менеджеру, в случае чего подскажет и направит)). Продолжаю сотрудничать.</p>
                    <p class="reviews__date">14.12.2016</p>
                </div>
            </div>
        </div>
    </section>
    <section class="ribbon ribbon--blue">
        <div class="wrapper">
            <p class="ribbon__text ribbon__text--pb40">
                Присоединяйтесь прямо сейчас! Регистрация - простейшая процедура.</br>
                Начните собственный бизнес всего за 5 минут!
            </p>
            {if not $logged}
                <button class="button button--ribbon button--ribbon-blue become-a-partner">Посмотреть подробнее</button>
            {else}
                <button class="button button--ribbon button--ribbon-blue become-a-partner-logged">Посмотреть подробнее</button>
            {/if}

        </div>
    </section>
</main>
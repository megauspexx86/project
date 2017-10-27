<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
<header class="header">
    <div class="header__fixed">
        <div class="wrapper">
            <div class="header__navbar">
                <a href="#main-inner" data-scroll class="header__logo">
                    <img src="{$config['settings']['public_assets']}/img/Logo.svg" width="110" alt="napishem.com">
                </a>
                <nav class="header__nav">
                    <a data-scroll href="#benefits" class="header__nav-item">Преимущества</a>
                    <a data-scroll href="#conditions" class="header__nav-item">Условия</a>
                    <a data-scroll href="#reviews" class="header__nav-item">Отзывы</a>
                </nav>
                <div class="header__contacts">
                    <a href="tel:88005002849" class="header__contacts-tel">
                        8-800-500-28-49
                    </a>
                    <a href="mailto:partnerka@napishem.com" class="header__contacts-email">
                        partnerka@napishem.com
                    </a>
                </div>
                <div class="header__login">
                    {if not $logged}
                        <span>Вход</span>
                        <button class="button button--small become-a-partner">Стать партнером</button>
                    {else}
                        <button class="button button--small become-a-partner-logged">Стать партнером</button>
                    {/if}

                </div>
            </div>
        </div>
    </div>
    <div class="header__main">
        <div class="wrapper wrapper--header">
            <div class="header__main-inner" id="main-inner">
                <h1 class="h1">Партнерская программа </br>
                    по монетизации студенческого трафика</h1>
                <p class="text text--header">Начните <br>зарабатывать <br>с биржей Напишем <br>прямо сейчас</p>
            </div>
            {if not $logged}
                <button class="button button--in-header become-a-partner">Начать зарабатывать</button>
            {else}
                <button class="button button--in-header become-a-partner-logged">Начать зарабатывать</button>
            {/if}


        </div>
        <div class="wrapper">
</header>
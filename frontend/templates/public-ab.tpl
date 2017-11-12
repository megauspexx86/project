<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=1170">
    <title></title>

    <link rel="stylesheet" href="{$config['settings']['public_assets']}/css/main.min.css">
    <link rel="stylesheet" href="{$config['settings']['public_assets']}/css/magnific-popup.min.css">

    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&amp;subset=cyrillic" rel="stylesheet">
<!--Пример подключения калькулятора окон на произвольной странице-->
	
	<title>Расчет стоимости окон онлайн</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <!--Пользовательские стили калькулятора. Если css не задан, будут использованы стили по умолчанию-->
    <!--<link href="http://your-domain.ru/path-to-css/calc.css" rel="stylesheet">-->
    <!--или, если путь относительный-->
    <link href="{$config['settings']['public_assets']}/css/calc.css" rel="stylesheet">
    <!--ВАЖНО: путь к файлу стилей (если он задан) нужно продублировать в переменной $lwc.css файла lwc-design.js-->

    <!--Пользовательский дизайн калькулятора. Если не задан, будет использован дизайн по умолчанию-->
    <!--Здесь же, задаются доступные системы профилей, особенности стеклопакетов и фурнитуры-->
    <!--<script src="http://your-domain.ru/path-to-js/lwc-design.js"></script>-->
    <!--или, если путь относительный-->
    <script src="{$config['settings']['public_assets']}/js/wind/lwc-design-user-css-sill-list.js"></script>

    <!--Прайс калькулятора. Если не задан, будет использован прайс по умолчанию-->
    <!--<script src="http://your-domain.ru/path-to-js/lwc-price.js"></script>-->
    <!--или, если путь относительный-->
    <script src="{$config['settings']['public_assets']}/js/wind/lwc-price-sill-list.js"></script>

    <!--Основной скрипт калькулятора-->
	<script src="{$config['settings']['public_assets']}/js/wind/lightcalc.js"></script>

    <style>
        .lwcdiv{ margin-left: 14px;}


    </style>
	
</head>
<body>

<header class="header">
<!--В этом элементе управления будет размещен калькулятор-->
<!--Если изменяете имя id="lwcdiv", новое имя нужно указать в файле lwc-design.js-->
<!--Если div не создавать, скрипт добавит новый элемент и поместит его в конце страницы-->
<div id="lwcdiv">

</div>




</header>
<section class="content">
    <div class="container">
        <div class="content__inner">
            <div class="sidebar-wrapper">
                <a href="#personal-order" class="create-button">Создать индивидуальный заказ</a>
                <div class="sidebar">
                    <div class="sidebar__header">Выбор параметров</div>
                    <div class="sidebar__block">
                        <span class="sidebar__title">Ширина проёма</span>
                        <div class="sidebar__inner">

                            <input type="text" id="width-min" class="sidebar__input">
                            <label for="amount-min" class="sidebar__label">мм</label>
                        </div>
                        <div id="slider-range" class="sidebar__range"></div>
                    </div>
                    <div class="sidebar__block">
                        <span class="sidebar__title">Производители</span>
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="firm-1">
                            <label for="firm-1">Salamander</label>
                        </div>
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="firm-2">
                            <label for="firm-2">Rehau</label>
                        </div>
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="firm-3">
                            <label for="firm-3">KBE</label>
                        </div>
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="firm-4">
                            <label for="firm-4">Dexen</label>
                        </div>
                        <a href="#" class="sidebar__show-all">Показать все</a>
                        <div class="sidebar__hidden-labels">
                            <div class="sidebar__label-wrapper">
                                <input type="checkbox" class="sidebar__checkbox" id="firm-5">
                                <label for="firm-5">Gutwerk</label>
                            </div>
                            <div class="sidebar__label-wrapper">
                                <input type="checkbox" class="sidebar__checkbox" id="firm-6">
                                <label for="firm-6">Laoumann</label>
                            </div>
                            <div class="sidebar__label-wrapper">
                                <input type="checkbox" class="sidebar__checkbox" id="firm-7">
                                <label for="firm-7">Enwin</label>
                            </div>
                        </div>
                    </div>
                    <div class="sidebar__block">
                        <span class="sidebar__title">Количество камер профиля</span>
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="three">
                            <label for="three">3</label>
                        </div>
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="four">
                            <label for="four">4</label>
                        </div>
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="five">
                            <label for="five">5</label>
                        </div>
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="six">
                            <label for="six">6</label>
                        </div>
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="seven">
                            <label for="seven">7</label>
                        </div>
                    </div>
                    <div class="sidebar__block">
                        <span class="sidebar__title">Количество камер стеклопакета</span>
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="odna">
                            <label for="odna">однокамерный</label>
                        </div>
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="dve">
                            <label for="dve">двухкамерный</label>
                        </div>
                    </div>
                    <div class="sidebar__block">
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="laminat">
                            <label for="laminat">Ламинация</label>
                        </div>
                    </div>
                    <div class="sidebar__block">
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="energo">
                            <label for="energo">Энергосберегающий стеклопакет</label>
                        </div>
                    </div>
                    <div class="sidebar__block">
                        <div class="sidebar__label-wrapper">
                            <input type="checkbox" class="sidebar__checkbox" id="dostavka">
                            <label for="dostavka">С доставкой по Беларуси</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content__body">
                <div class="content__filter">
                    <select name="type" class="content__filter-select">
                        <option value="1">Популярные</option>
                        <option value="2">Дешевые</option>
                        <option value="3">Дорогие</option>
                        <option value="4">Рейтинговые</option>
                        <option value="5">Новые</option>
                    </select>
                </div>
                <ul class="content__list">
                    <li class="content__item">
                        <div class="content__item-number">1</div>
                        <div class="content__image-wrapper">
                            <img src="img/image-1.png" alt="" class="content__item-image">
                        </div>
                        <div class="content__item-inner">
                            <p class="content__item-title">KBE Эксперт 1320x1430 Г+П/О СП2</p>
                            <p class="content__item-description">5-камерный профиль, ширина: 70 мм, стеклопакет двухкамерный</p>
                            <div class="content__item-bottom">
                                <a href="#" class="content__item-recalls">5 отзывов</a>
                            </div>
                        </div>
                        <div class="content__price">от 262,00 р.</div>
                        <a href="#" class="content__item-button">1 предложение</a>
                    </li>
                    <li class="content__item">
                        <div class="content__item-number">2</div>
                        <div class="content__image-wrapper">
                            <img src="img/image-1.png" alt="" class="content__item-image">
                        </div>
                        <div class="content__item-inner">
                            <p class="content__item-title">KBE Эксперт 1320x1430 Г+П/О СП2</p>
                            <p class="content__item-description">5-камерный профиль, ширина: 70 мм, стеклопакет двухкамерный</p>
                            <div class="content__item-bottom">
                                <a href="#" class="content__item-recalls">5 отзывов</a>
                            </div>
                        </div>
                        <div class="content__price">от 262,00 р.</div>
                        <a href="#" class="content__item-button">2 предложения</a>
                    </li>
                    <li class="content__item">
                        <div class="content__item-number">3</div>
                        <div class="content__image-wrapper">
                            <img src="img/image-1.png" alt="" class="content__item-image">
                        </div>
                        <div class="content__item-inner">
                            <p class="content__item-title">KBE Эксперт 1320x1430 Г+П/О СП2</p>
                            <p class="content__item-description">5-камерный профиль, ширина: 70 мм, стеклопакет двухкамерный</p>
                            <div class="content__item-bottom">
                                <a href="#" class="content__item-recalls">5 отзывов</a>
                            </div>
                        </div>
                        <div class="content__price">от 262,00 р.</div>
                        <a href="#" class="content__item-button">3 предложения</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>
<div class="hidden">
    <form action="" id="personal-order" class="personal-order">
        <p class="personal-order__title">Начните получать предложения<br> уже через 5 минут после заполнения формы</p>
        <div class="personal-order__steps">
            <div class="personal-order__step personal-order__step_active">
                <ul class="types" id="types">
                    <li class="types__item">
                        <a href="#" class="types__link">Одностворчатые</a>
                        <ul class="subtype">
                            <li class="subtype__item">
                                <a href="#" class="subtype__link subtype__link_active">Одностворчатое глухое</a>
                            </li>
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Одностворчатое поворотное</a>
                            </li>
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Одностворчатое поворотно-откидное</a>
                            </li>
                        </ul>
                    </li>
                    <li class="types__item">
                        <a href="#" class="types__link">Двухстворчатые</a>
                        <ul class="subtype">
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Двустворчатое глухое</a>
                            </li>
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Двухстворчатое с одной поворотно-откидной</a>
                            </li>
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Двухстворчатое с одной поворотно-откидными и одной поворотной</a>
                            </li>
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Двухстворчатое с двумя поворотно-откидными</a>
                            </li>
                        </ul>
                    </li>
                    <li class="types__item">
                        <a href="#" class="types__link">ТРЕХСТВОРЧАТЫЕ</a>
                        <ul class="subtype">
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Трехстворчатое глухое</a>
                            </li>
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Трехстворчатое с одной поворотно-откидной</a>
                            </li>
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Трехстворчатое с одной поворотно-откидной и одной поворотной</a>
                            </li>
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Трехстворчатое с двумя поворотно откидными</a>
                            </li>
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Трехстворчатое с двумя поворотно-откидными и одной поворотной</a>
                            </li>
                            <li class="subtype__item">
                                <a href="#" class="subtype__link">Трехстворчатое с тремя поворотно-откидными</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="photos">
                    <div class="photos__block photos__block_active">
                        <img src="{$config['settings']['public_assets']}/img/1.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/2.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/3.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/4.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/5.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/6.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/7.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/8.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/9.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/10.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/11.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/12.png" alt="" class="photo">
                    </div>
                    <div class="photos__block">
                        <img src="{$config['settings']['public_assets']}/img/13.png" alt="" class="photo">
                    </div>
                </div>
            </div>
        </div>
        <div class="personal-order__buttons-wrapper">
            <a href="#" class="personal-order__button">Предыдущий шаг</a>
            <a href="#" class="personal-order__button">Слудующий шаг</a>
        </div>
    </form>
</div>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="{$config['settings']['public_assets']}/js/jquery.magnific-popup.min.js"></script>

<script src="{$config['settings']['public_assets']}/js/common.min.js"></script>
<script src="{$config['settings']['public_assets']}/js/scripts.min.js"></script>
</body>
</html>
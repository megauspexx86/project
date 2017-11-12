// настройки внешнего вида калькулятора и описание элементов
var $lwc;
(function ($lwc) {

    // путь к пользовательскому файлу стилей. Там можно задать свои цвета, шрифты и эффекты
    $lwc.css = "css/calc-user-css.css";    

    // id элемента <div>, в котором будет размещен калькулятор
    $lwc.divname = "lwcdiv";

    // системы профилей (система по умолчанию имеет свойство "byDef")
    $lwc.profiles = {
        fav: {name: "Фаворит 71 мм"},
        bau: {name: "Баутек 71 мм", byDef: true},
        grain: {name: "Grain Prestige 70 мм"}
    };

    // доступные цвета
    $lwc.colors = {
        whwh: {name: "Белый/Белый", byDef: true},
        whclr: {name: "Белый/Цвет"},
        clrclr: {name: "Цвет/Цвет"}
    };

    // доступные стеклопакеты
    $lwc.glasses = {
        spo24: {name: "Однокамерный 24 мм", byDef: true},
        spd32: {name: "Двухкамерный 32 мм"},
        spd40: {name: "Двухкамерный 40 мм"},
        snd32: {name: "Сэндвич 32 мм"}
    };

    // особенности стекол
    $lwc.glasstypes = {
        ordinary: {name: "Обычное", byDef: true},
        energo: {name: "Энергосберегающее"},
        reflective: {name: "Солнцеотражающее"},
        energoreflective: {name: "Энерго+зеркало"},
        armored: {name: "Бронированное"}
    };

    // вариатны ограничителей открывания
    $lwc.limiters = {none: "Нет", ordinary: "Обычный", discrete: "Дискретный"};

    // дополнительные опции (если "byDef", то по умолчанию включено)
    // если опция имеет свойство "values", то при включении доступен выбор из списка
    $lwc.ext = {
		sill: {name: "Подоконник", values: {
            1: {name: "нет"},
			200: {name: "200"},
            300: {name: "300", byDef: true},
            400: {name: "400"},
			500: {name: "500"}
            }
		},
		limiter: {name: "Ограничитель открывания", values: {
            1: {name: $lwc.limiters.none},
            2: {name: $lwc.limiters.ordinary, byDef: true},
            3: {name: $lwc.limiters.discrete}
            }
        },
        ventilation: {name: "Микропроветривание"},
        mosquito: {name: "Москитная сетка"},
        otliv: {name: "Водоотлив"}
    };

    // варианты открывания
    $lwc.opentypes = {
        deaf: "глухая",
        rotary: "поворотная",
        rotaryfolding: "поворотно-откидная",
        folding: "откидная"
    };

    // типы домов
    $lwc.houses = {
        panel: "Панельный",
        brick: "Кирпичный",
        wooden: "Деревянный"
    };

    // типы (конфигурации) окон. три группы по три элемента в каждой
    // групп и элементов можно сделать сколько угодно, но потребуется изменить css, чтобы не поползла разметка
    // привязка иконок и изображений окон - через свойства pos, w, h. картинки: menu-icons.png и wnd-icons.png
    $lwc.wintypes = {
        1: {
            1: {
                width: 100 * 1 + 54 * 2,
                top: 30,
                w: 100,
                icon: {pos: "6px -5px;"},
                wnd_top: [],
                wnd_left: [
                    {type: $lwc.opentypes.deaf, pos: "0 -600px;", w: "100px;", h: "200px;"},
                    {type: $lwc.opentypes.rotary, pos: "-100px 0;", w: "100px;", h: "200px;", byDef: true},
                    {type: $lwc.opentypes.rotaryfolding, pos: "-100px -400px;", w: "100px;", h: "200px;"}
                ],
                wnd_cntr: [],
                wnd_right: []
            },
            2: {
                width: 100 * 2 + 54 * 2,
                top: 30,
                w: 100,
                icon: {pos: "6px -61px;"},
                wnd_top: [],
                wnd_left: [
                    {type: $lwc.opentypes.deaf, pos: "0 -600px;", w: "100px;", h: "200px;", byDef: true},
                    {type: $lwc.opentypes.rotary, pos: "", w: "100px;", h: "200px;"},
                    {type: $lwc.opentypes.rotaryfolding, pos: "0 -400px;", w: "100px;", h: "200px;"}
                ],
                wnd_cntr: [
                    {type: $lwc.opentypes.deaf, pos: "0 -600px;", w: "100px;", h: "200px;"},
                    {type: $lwc.opentypes.rotary, pos: "-100px 0;", w: "100px;", h: "200px;", byDef: true},
                    {type: $lwc.opentypes.rotaryfolding, pos: "-100px -400px;", w: "100px;", h: "200px;"}
                ],
                wnd_right: []
            },
            3: {
                width: 100 * 3 + 54 * 2,
                top: 30,
                w: 100,
                icon: {pos: "6px -117px;"},
                wnd_top: [],
                wnd_left: [
                    {type: $lwc.opentypes.deaf, pos: "0 -600px;", w: "100px;", h: "200px;", byDef: true},
                    {type: $lwc.opentypes.rotary, pos: "", w: "100px;", h: "200px;"},
                    {type: $lwc.opentypes.rotaryfolding, pos: "0 -400px;", w: "100px;", h: "200px;"}
                ],
                wnd_cntr: [
                    {type: $lwc.opentypes.deaf, pos: "0 -600px;", w: "100px;", h: "200px;"},
                    {type: $lwc.opentypes.rotary, pos: "-100px 0;", w: "100px;", h: "200px;", byDef: true},
                    {type: $lwc.opentypes.rotaryfolding, pos: "-100px -400px;", w: "100px;", h: "200px;"}
                ],
                wnd_right: [
                    {type: $lwc.opentypes.deaf, pos: "0 -600px;", w: "100px;", h: "200px;", byDef: true},
                    {type: $lwc.opentypes.rotary, pos: "-100px 0;", w: "100px;", h: "200px;"},
                    {type: $lwc.opentypes.rotaryfolding, pos: "-100px -400px;", w: "100px;", h: "200px;"}
                ]
            }
        },
        2: {
            1: {
                width: 95 * 1 + 54 * 2,
                top: 5,
                w: 95,
                icon: {pos: "-46px -5px;"},
                wnd_top: [
                    {type: $lwc.opentypes.deaf, pos: "-200px -540px;", w: "95px;", h: "80px;", byDef: true}
                ],
                wnd_left: [
                    {type: $lwc.opentypes.deaf, pos: "-100px -600px;", w: "95px;", h: "180px;"},                // leaf-m-0
                    {type: $lwc.opentypes.rotary, pos: "-295px 0;", w: "95px;", h: "180px;", byDef: true},    // leaf-m-1-r
                    {type: $lwc.opentypes.rotaryfolding, pos: "-295px -360px;", w: "95px;", h: "180px;"}
                ],      // leaf-m-3-r
                wnd_cntr: [],
                wnd_right: []
            },
            2: {
                width: 95 * 2 + 54 * 2,
                top: 5,
                w: 95,
                icon: {pos: "-46px -61px;"},
                wnd_top: [
                    {type: $lwc.opentypes.deaf, pos: "-295px -540px;", w: "190px;", h: "80px;", byDef: true}
                ],// leaf-f-2-0
                wnd_left: [
                    {type: $lwc.opentypes.deaf, pos: "-100px -600px;", w: "95px;", h: "180px;", byDef: true}, // d
                    {type: $lwc.opentypes.rotary, pos: "-200px 0;", w: "95px;", h: "180px;"},                   // leaf-m-1-l
                    {type: $lwc.opentypes.rotaryfolding, pos: "-295px -360px;", w: "95px;", h: "180px;"}
                ],      // leaf-m-3-r
                wnd_cntr: [
                    {type: $lwc.opentypes.deaf, pos: "-100px -600px;", w: "95px;", h: "180px;"},                // leaf-m-0
                    {type: $lwc.opentypes.rotary, pos: "-295px 0;", w: "95px;", h: "180px;", byDef: true},    // leaf-m-1-r
                    {type: $lwc.opentypes.rotaryfolding, pos: "-295px -360px;", w: "95px;", h: "180px;"}
                ],      // leaf-m-3-r
                wnd_right: []
            },
            3: {
                width: 95 * 3 + 54 * 2,
                top: 5,
                w: 95,
                icon: {pos: "-46px -117px;"},
                wnd_top: [
                    {type: $lwc.opentypes.deaf, pos: "-200px -700px;", w: "285px;", h: "80px;", byDef: true}
                ], // leaf-f-3-0
                wnd_left: [
                    {type: $lwc.opentypes.deaf, pos: "-100px -600px;", w: "95px;", h: "180px;", byDef: true},
                    {type: $lwc.opentypes.rotary, pos: "-200px 0;", w: "95px;", h: "180px;"},
                    {type: $lwc.opentypes.rotaryfolding, pos: "-200px -360px;", w: "95px;", h: "180px;"}
                ],       // leaf-m-3-l
                wnd_cntr: [
                    {type: $lwc.opentypes.deaf, pos: "-100px -600px;", w: "95px;", h: "180px;"},
                    {type: $lwc.opentypes.rotary, pos: "-295px 0;", w: "95px;", h: "180px;", byDef: true},
                    {type: $lwc.opentypes.rotaryfolding, pos: "-295px -360px;", w: "95px;", h: "180px;"}
                ],
                wnd_right: [
                    {type: $lwc.opentypes.deaf, pos: "-100px -600px;", w: "95px;", h: "180px;", byDef: true},
                    {type: $lwc.opentypes.rotary, pos: "-295px 0;", w: "95px;", h: "180px;"},
                    {type: $lwc.opentypes.rotaryfolding, pos: "-295px -360px;", w: "95px;", h: "180px;"}
                ]
            }
        },
        3: {
            1: {
                width: 95 * 2 + 54 * 2,
                top: 5,
                w: 95,
                icon: {pos: "-98px -61px;"},
                door: "left",
                wnd_top: [],
                wnd_left: [
                    {type: $lwc.opentypes.rotary, pos: "-390px 0;", w: "95px;", h: "270px;", byDef: true}
                ],   // leaf-d-1
                wnd_cntr: [
                    {type: $lwc.opentypes.deaf, pos: "-100px -600px;", w: "95px;", h: "180px;", byDef: true},
                    {type: $lwc.opentypes.rotary, pos: "-295px 0;", w: "95px;", h: "180px;"},
                    {type: $lwc.opentypes.rotaryfolding, pos: "-295px -360px;", w: "95px;", h: "180px;"}
                ],
                wnd_right: []
            },
            2: {
                width: 95 * 3 + 54 * 2,
                top: 5,
                w: 95,
                icon: {pos: "-98px -117px;"},
                door: "left",
                wnd_top: [],
                wnd_left: [
                    {type: $lwc.opentypes.rotary, pos: "-390px 0;", w: "95px;", h: "270px;", byDef: true}
                ],
                wnd_cntr: [
                    {type: $lwc.opentypes.deaf, pos: "-100px -600px;", w: "95px;", h: "180px;", byDef: true}
                ],
                wnd_right: [
                    {type: $lwc.opentypes.deaf, pos: "-100px -600px;", w: "95px;", h: "180px;"},
                    {type: $lwc.opentypes.rotary, pos: "-295px 0;", w: "95px;", h: "180px;", byDef: true},
                    {type: $lwc.opentypes.rotaryfolding, pos: "-295px -360px;", w: "95px;", h: "180px;"}
                ]
            },
            3: {
                width: 95 * 3 + 54 * 2,
                top: 5,
                w: 95,
                icon: {pos: "-98px -5px;"},
                door: "cntr",
                wnd_top: [],
                wnd_left: [],
                wnd_cntr: [],
                wnd_right: []
            }
        }
    };

    $lwc.divhtml = '<!-- lwc калькулятор --><div class="lwc-window"> <!-- левая часть --> <div class="lwc-w-left"> <!--графическое меню выбора типа изделия--> <fieldset> <ul class="lwc-menu-ul"> <li class="lwc-menu-li"> <span class="lwc-menu-blank"></span> <ul> <li><a id="type_1_1"><span class="bg"></span><span class="icon"></span>Одностворчатое окно</a></li> <li><a id="type_1_2" class="active selected"><span class="bg"></span><span class="icon"></span>Двухстворчатое окно</a></li> <li><a id="type_1_3"><span class="bg"></span><span class="icon"></span>Трехстворчатое окно</a></li> </ul> <span class="type-name">Обычное окно</span> </li> <li class="lwc-menu-li"> <span class="lwc-menu-blank"></span> <ul> <li><a id="type_2_1"><span class="bg"></span><span class="icon"></span>Одностворчатое окно с фрамугой</a></li> <li><a id="type_2_2" class="active"><span class="bg"></span><span class="icon"></span>Двухстворчатое окно с фрамугой</a></li> <li><a id="type_2_3"><span class="bg"></span><span class="icon"></span>Трехстворчатое окно с фрамугой</a></li> </ul> <span class="type-name">Окно с фрамугой</span> </li> <li class="lwc-menu-li"> <span class="lwc-menu-blank"></span> <ul> <li><a id="type_3_1"><span class="bg"></span><span class="icon"></span>Одностворчатый балконный блок</a></li> <li><a id="type_3_2" class="active"><span class="bg"></span><span class="icon"></span>Двухстворчатый балконный блок</a></li> </ul> <span class="type-name">Балконный блок</span> </li> </ul> </fieldset> <!--элементы управления со свойствами изделия--> <fieldset> <label for="lwc-profiles">Профиль:</label><select id="lwc-profiles"></select> </fieldset> <fieldset> <label for="lwc-clrs">Цвета сторон:</label><select id="lwc-clrs"></select> </fieldset> <fieldset> <label for="lwc-glasses">Стеклопакет:</label><select id="lwc-glasses"></select> </fieldset> <fieldset> <label for="lwc-glasstypes">Стекло:</label><select id="lwc-glasstypes"></select> </fieldset> <fieldset id="lwc-ext"> <label style=" top: 8px; ">Дополнительно:</label> <ul> <!-- <li><input type="checkbox" id="ext-1">Микропроветривание</li> <li><input type="checkbox" id="ext-2">Подоконник</li> <li><input type="checkbox" id="ext-3">Москитная сетка</li> <li><input type="checkbox" id="ext-4">Водоотлив</li> <li><input type="checkbox" id="ext-5"><span>Ограничит. открывания</span><select class="checked"><option selected>Обычный ограничитель</option><option>Дискретное открывание</option></select></li> --> </ul> </fieldset> </div> <!--средняя часть--> <div class="lwc-wnd"> <h3>Двухстворчатое окно</h3> <div class="leaf-box"> <div class="lwc-framuga"> <a href="#" id="wnd_top" class="leaf-f-2-0"></a> <span class="lwc-framuga-height"><label for="lwc-input-framuga-height">Высота фрамуги</label><input id="lwc-input-framuga-height" type="text" value="600"></span> </div> <div class="lwc-door"> <span class="lwc-door-height"><label for="lwc-input-door-height">Высота двери</label><input id="lwc-input-door-height" type="text" value="2000"></span> </div> <div class="lwc-window"> <a href="#" id="wnd_left"></a><label for="lwc-input-wnd-left">Ширина</label><br /><input id="lwc-input-wnd-left" type="text" value="700"> </div> <div class="lwc-window"> <a href="#" id="wnd_cntr"></a><label for="lwc-input-wnd-cntr">Ширина</label><br /><input id="lwc-input-wnd-cntr" type="text" value="700"> </div> <div class="lwc-window"> <a href="#" id="wnd_right" title="глухая"></a><label for="lwc-input-wnd-right">Ширина</label><br /><input id="lwc-input-wnd-right" type="text" value="700"> </div> <div class="lwc-wnd-height"> <label for="lwc-input-wnd-height">Высота окна</label><input id="lwc-input-wnd-height" type="text" value="1300"> </div> </div> </div> <!--правая часть--> <div class="lwc-w-right"> <h3>Монтажные работы</h3> <fieldset class="lwc-mnt"> <label for="lwc-mnt">Установка окна:</label> <select id="lwc-mnt"> <option value="1">Да</option> <option value="" selected>Нет</option> </select> </fieldset> <fieldset> <label for="lwc-otkos">Отделка откосов:</label> <select id="lwc-otkos"> <option value="1">Да</option> <option value="" selected>Нет</option> </select> </fieldset> <fieldset> <label for="lwc-houses">Тип дома:</label><select id="lwc-houses"></select> </fieldset> <fieldset class="lwc-dscnt"> <input type="checkbox" id="lwc-economy" checked><span></span> </fieldset> <fieldset class="lwc-price"> <div class="lwc-price"> Ориентировочная стоимость: <span id="lwc-price-sum">...</span> </div> <div> Экономия: <span id="lwc-economy-sum">...</span> </div> </fieldset> <a href="#" id="order-button" class="lwc-button">Заказать</a> </div> <div style="float:none;clear:both;"></div></div><!-- /calculator --><!-- order --><div class="lwc-order"> <form id="orderform"> <!-- params-4 --> <div class="params-4"> <h3>Параметры заказа</h3> <fieldset> <textarea name="params" id="order-params" readonly></textarea> </fieldset> <fieldset> <label for="order-comment" style="width:105px;">Комментарий к заказу:</label> <textarea name="comment" id="order-comment" class="input"></textarea> </fieldset> </div> <!-- params-5 --> <div class="params-5"> <h3>Вызов замерщика</h3> <fieldset> <p>Точная стоимость заказа может быть определена только после выезда замерщика. Выезд специалиста - БЕСПЛАТНЫЙ.</p> <p>Для оформления заявки заполните следующие данные:</p> </fieldset> <fieldset> <label for="order-name">Ф.И.О. (полностью) <span style="color:#ff0000;">*</span></label> <input type="text" name="name" id="order-name" value="" required> </fieldset> <fieldset style="height: 56px;"> <label for="order-address">Адрес замера <span style="color:#ff0000;">*</span></label> <textarea name="address" id="order-address" class="input" required></textarea> </fieldset> <fieldset> <label for="order-phone">Контактный телефон <span style="color:#ff0000;">*</span></label> <input type="text" name="phone" id="order-phone" value="" required> </fieldset> <fieldset> <label for="order-date">Желаемая дата</label> <input type="text" name="date" id="order-date" value="" class="datepicker"> </fieldset> <fieldset> <a href="#" id="send-button" class="submit-form lwc-button">Отправить</a> <a href="#" id="back-button" class="lwc-button">Назад</a> <span class="results"></span> </fieldset> </div> </form> <div class="exit"> <span class="message"></span><a href="#" class="lwc-button button-exit">ОК</a> </div></div><!-- /order -->';

})($lwc || ($lwc = {}));

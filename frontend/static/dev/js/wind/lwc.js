var $lwc;
(function ($lwc) {
    var $;

    function lightcalc() {
        exDt();
        var wintypes = {
            type_1_1: {
                width: 100 * 1 + 54 * 2,
                marginTop: 30,
                leaf_w: 100,
                wnd_top: 0,
                wnd_left: {'глухая': 'leaf-b-0', 'поворотная': 'leaf-b-1-r', 'поворотно-откидная': 'leaf-b-3-r'},
                wnd_cntr: 0,
                wnd_right: 0,
                byDef: {1: 'поворотная'}
            },
            type_1_2: {
                width: 100 * 2 + 54 * 2,
                marginTop: 30,
                leaf_w: 100,
                wnd_top: 0,
                wnd_left: {'глухая': 'leaf-b-0', 'поворотная': 'leaf-b-1-l', 'поворотно-откидная': 'leaf-b-3-l'},
                wnd_cntr: {'глухая': 'leaf-b-0', 'поворотная': 'leaf-b-1-r', 'поворотно-откидная': 'leaf-b-3-r'},
                wnd_right: 0,
                byDef: {1: 'глухая', 2: 'поворотная'}
            },
            type_1_3: {
                width: 100 * 3 + 54 * 2,
                marginTop: 30,
                leaf_w: 100,
                wnd_top: 0,
                wnd_left: {'глухая': 'leaf-b-0', 'поворотная': 'leaf-b-1-l', 'поворотно-откидная': 'leaf-b-3-l'},
                wnd_cntr: {'глухая': 'leaf-b-0', 'поворотная': 'leaf-b-1-r', 'поворотно-откидная': 'leaf-b-3-r'},
                wnd_right: {'глухая': 'leaf-b-0', 'поворотная': 'leaf-b-1-r', 'поворотно-откидная': 'leaf-b-3-r'},
                byDef: {1: 'глухая', 2: 'поворотная', 3: 'глухая'}
            },
            type_2_1: {
                width: 95 * 1 + 54 * 2,
                marginTop: 5,
                leaf_w: 95,
                wnd_top: {'глухая': 'leaf-f-1-0'},
                wnd_left: {'глухая': 'leaf-m-0', 'поворотная': 'leaf-m-1-r', 'поворотно-откидная': 'leaf-m-3-r'},
                wnd_cntr: 0,
                wnd_right: 0,
                byDef: {0: 'глухая', 1: 'поворотная'}
            },
            type_2_2: {
                width: 95 * 2 + 54 * 2,
                marginTop: 5,
                leaf_w: 95,
                wnd_top: {'глухая': 'leaf-f-2-0'},
                wnd_left: {'глухая': 'leaf-m-0', 'поворотная': 'leaf-m-1-l', 'поворотно-откидная': 'leaf-m-3-l'},
                wnd_cntr: {'глухая': 'leaf-m-0', 'поворотная': 'leaf-m-1-r', 'поворотно-откидная': 'leaf-m-3-r'},
                wnd_right: 0,
                byDef: {0: 'глухая', 1: 'глухая', 2: 'поворотная'}
            },
            type_2_3: {
                width: 95 * 3 + 54 * 2,
                marginTop: 5,
                leaf_w: 95,
                wnd_top: {'глухая': 'leaf-f-3-0'},
                wnd_left: {'глухая': 'leaf-m-0', 'поворотная': 'leaf-m-1-l', 'поворотно-откидная': 'leaf-m-3-l'},
                wnd_cntr: {'глухая': 'leaf-m-0', 'поворотная': 'leaf-m-1-r', 'поворотно-откидная': 'leaf-m-3-r'},
                wnd_right: {'глухая': 'leaf-m-0', 'поворотная': 'leaf-m-1-r', 'поворотно-откидная': 'leaf-m-3-r'},
                byDef: {0: 'глухая', 1: 'глухая', 2: 'поворотная', 3: 'глухая'}
            },
            type_3_1: {
                width: 95 * 2 + 54 * 2,
                leaf_w: 95,
                wnd_top: 0,
                wnd_left: {'поворотная': 'leaf-d-1'},
                wnd_cntr: {'глухая': 'leaf-m-0', 'поворотная': 'leaf-m-1-r', 'поворотно-откидная': 'leaf-m-3-r'},
                wnd_right: 0,
                byDef: {1: 'поворотная', 2: 'глухая'}
            },
            type_3_2: {
                width: 95 * 3 + 54 * 2,
                leaf_w: 95,
                wnd_top: 0,
                wnd_left: {'поворотная': 'leaf-d-1'},
                wnd_cntr: {'глухая': 'leaf-m-0'},
                wnd_right: {'глухая': 'leaf-m-0', 'поворотная': 'leaf-m-1-r', 'поворотно-откидная': 'leaf-m-3-r'},
                byDef: {1: 'поворотная', 2: 'глухая', 3: 'поворотная'}
            }
        };
        if ($('.lwc-window').length) {
            generate($('.lwc-menu-ul a.selected').attr('id'));
            calculate();
        }
        $('.leaf-box a').click(function () {
            var leaf = $(this).attr('id'), type = $('.lwc-menu-li a.selected').attr('id'), title = $(this).attr('title'), variant = wintypes[type][leaf], variants = null, next = null, nextleaf = null, newvariants = null;
            $.each(variant, function (tit, val) {
                if (tit == title)next = variants + 2;
                variants++
            });
            if (variants > 1) {
                if (next > variants)next = 1;
                $.each(variant, function (tit, val) {
                    newvariants++;
                    if (newvariants == next)nextleaf = tit;
                });
                $(this).attr('title', nextleaf).attr('class', wintypes[type][leaf][nextleaf])
            }
            calculate();
            return false
        });
        $('.lwc-menu-li li .active').each(function () {
            $(this).closest('.lwc-menu-li').find('.lwc-menu-blank').html($(this).closest('li').html());
            $(this).closest('li').hide()
        });
        $('.lwc-menu-li .lwc-menu-blank').click(function () {
            $(this).closest('.lwc-menu-ul').find('.selected').removeClass('selected');
            $(this).find('a').addClass('selected');
            $(this).closest('.lwc-menu-li').find('ul').toggle();
            $('.lwc-wnd h3').text($(this).find('a').text());
            generate($(this).find('a').attr('id'));
            calculate()
        });
        $('.lwc-menu-li').hover(function () {
            $(this).find('ul').stop().fadeTo("fast", 1).show()
        }, function () {
            $(this).find('ul').stop().fadeTo("slow", 0).hide()
        });
        $('.lwc-menu-li li a').click(function () {
            var t = $(this);
            t.closest('ul').find('li').each(function () {
                $(this).show()
            });
            t.closest('ul').find('.active').removeClass('active');
            t.closest('.lwc-menu-ul').find('.selected').removeClass('selected');
            t.addClass('active selected');
            t.closest('.lwc-menu-li').find('.lwc-menu-blank').html($(this).closest('li').html());
            t.closest('.lwc-menu-li').find('ul').stop().fadeTo("fast", 0).hide();
            $('.lwc-menu-li li .active').each(function () {
                $(this).closest('.lwc-menu-li').find('.lwc-menu-blank').html($(this).closest('li').html());
                $(this).closest('li').hide()
            });
            $('.lwc-wnd h3').text($(this).text());
            generate(t.attr('id'));
            calculate();
        });
        $('.lwc-window select').change(calculate);
        $('.lwc-window input[type=checkbox]').change(calculate);
        $('.leaf-box input').keydown(function (evt) {
            $(this).attr('maxlength', 4);
            if (evt.keyCode == 46 || evt.keyCode == 8 || evt.keyCode == 9 || evt.keyCode == 27 || (evt.keyCode == 65 && evt.ctrlKey === true) || (evt.keyCode >= 35 && evt.keyCode <= 39)) {
            } else {
                if ((evt.keyCode < 48 || evt.keyCode > 57) && (evt.keyCode < 96 || evt.keyCode > 105)) {
                    evt.preventDefault();
                }
            }
        }).keyup(function () {
            var t = $(this);
            if (t.val() >= 500 && t.val() <= 2200) {
                t.removeClass('err');
                calculate()
            } else {
                t.addClass('err')
            }
        }).change(function () {
            var t = $(this);
            if (t.val() < 500)t.val('500');
            if (t.val() > 2200)t.val('2200');
            t.removeClass('err');
            calculate()
        });
        $('#lwc-mnt').change(function () {
        }).change();
        function generate(type) {
            $('.leaf-box').width(wintypes[type].width);
            $('.leaf-box .lwc-window').width(wintypes[type].leaf_w);
            if (wintypes[type].marginTop > 0) {
                $('.leaf-box').css('marginTop', wintypes[type].marginTop)
            } else {
                $('.leaf-box').css('marginTop', 0)
            }
            if (wintypes[type].wnd_top != 0) {
                var leaf0 = wintypes[type].byDef['0'];
                $('#wnd_top').attr('title', leaf0).attr('class', wintypes[type].wnd_top[leaf0]);
                $('.lwc-framuga').show();
            } else {
                $('.lwc-framuga').hide();
            }
            if (wintypes[type].wnd_left['поворотная'] == 'leaf-d-1') {
                $('.lwc-door').width('54');
                $('.lwc-door-height').show()
            } else {
                $('.lwc-door').width('44');
                $('.lwc-door-height').hide();
            }
            var leaf1 = wintypes[type].byDef['1'];
            $('#wnd_left').attr('title', leaf1).attr('class', wintypes[type].wnd_left[leaf1]);
            if (wintypes[type].wnd_cntr != 0) {
                var leaf2 = wintypes[type].byDef['2'];
                $('#wnd_cntr').attr('title', leaf2).attr('class', wintypes[type].wnd_cntr[leaf2]).closest('div').show();
            } else {
                $('#wnd_cntr').closest('div').hide();
            }
            if (wintypes[type].wnd_right != 0) {
                var leaf3 = wintypes[type].byDef['3'];
                $('#wnd_right').attr('title', leaf3).attr('class', wintypes[type].wnd_right[leaf3]).closest('div').show();
            } else {
                $('#wnd_right').closest('div').hide();
            }
        };
        $('#order-button').click(function () {
            getMark();
            $('.lwc-window').animate({marginLeft: -960}, 300);
            $('.lwc-order').fadeIn(300);
        });
        $('#back-button').click(function () {
            $('.submit-form').removeClass('loading');
            $('.submit-form span').show();
            $('.lwc-order').fadeOut(300);
            $(this).closest('form').find('.results').html('');
            $(this).closest('form').find('input').removeClass('err');
            $('.lwc-window').animate({marginLeft: 0}, 300);
        });
        function calculate() {
            getMark();
            var m = $lwc.mark, pr = $lwc.price, e = $lwc.e, ext = $lwc.ext, houses = $lwc.houses, celm, total, economy = 0, other = 0, nval, vval, p = m.p, s = m.s, sgl = m.sgl, sf = m.sf, nf = m.nf, w = m.w, h = m.h, prifilename = $lwc.profiles[e.profiles.val()].name, furnprice = pr.furn[prifilename], Production = m.p * (pr.profil[e.profiles.val()] + pr.color[e.colors.val()]);
            Production += m.sgl * (pr.glass[e.glasses.val()] + pr.glass[e.glasstypes.val()]);
            for (var d in m) {
                if (d.search("furn") < 0)continue;
                if (!furnprice[m[d]])continue;
                Production += furnprice[m[d]];
            }
            if ($lwc.e.mnt.val()) {
                vval = pr.mnt[houses[e.houses.val()]];
                Production += eval(vval);
            }
            if ($lwc.e.otkos.val()) {
                vval = pr.otkos[houses[e.houses.val()]];
                Production += eval(vval);
            }
            for (var d in ext) {
                if (pr[d]) {
                    celm = $("#lwc-ext-" + d);
                    if (ext[d].values) {
                        nval = ext[d].values[celm.val()].name;
                        vval = pr[d][nval];
                        if (vval)Production += eval(vval);
                    } else {
                        if (celm.is(":checked")) {
                            if (pr[d].result)vval = eval(pr[d].result); else vval = pr[d];
                            Production += eval(vval);
                        }
                    }
                }
            }
            Production = Production * pr.rate;
            other = other * pr.rate;
            total = Production + other;
            if ($('#lwc-economy').is(':checked')) {
                economy = Production * $lwc.price.discount / 100;
                total = total - economy
            }
            var intv = 25, msecs = 750, steps = msecs / intv, acurprice = $('#lwc-price-sum').text().match(/[0-9]+/), acureconomy = $('#lwc-economy-sum').text().match(/[0-9]+/), curprice = acurprice ? acurprice[0] : 0, newprice = total, cureconomy = acureconomy ? acureconomy[0] : 0, neweconomy = economy, priceplus = (curprice - newprice) / steps, economyplus = (cureconomy - neweconomy) / steps, pp = 0, ee = 0, timer = setInterval(function () {
                if (steps >= 0) {
                    $('#lwc-price-sum').text(priceFormat(curprice - pp));
                    $('#lwc-economy-sum').text(priceFormat(cureconomy - ee));
                    pp += priceplus;
                    ee += economyplus;
                    steps--
                } else {
                    clearInterval(timer)
                }
            }, intv);
            postPrms(total)
        };
        function getMark() {
            function numVal(sel) {
                var $x = $(sel), x = Number($x.val());
                if (isNaN(x) || !$x.is(':visible'))x = 0;
                return x;
            };
            var m = $lwc.mark = {p: 0, s: 0, sf: 0, sgl: 0, nf: 0, w: 0, h: 0}, cs, wgl, hgl;
            m.id = $('.lwc-menu-ul a.selected').attr('id').replace("type_", "").split("_");
            m.wt = $lwc.wintypes[m.id["0"]][m.id["1"]];
            m.height_left = m.height_cntr = m.height_right = numVal('#lwc-input-wnd-height');
            m.height_top = numVal('#lwc-input-framuga-height');
            m.width_left = numVal('#lwc-input-wnd-left');
            m.width_cntr = numVal('#lwc-input-wnd-cntr');
            m.width_right = numVal('#lwc-input-wnd-right');
            if (m.wt.door)m["height_" + m.wt.door] = numVal('#lwc-input-door-height');
            m.w = m.width_top = m.width_left + m.width_cntr + m.width_right;
            m.h = Math.max(m.height_left, m.height_cntr, m.height_right) + m.height_top;
            if (m.width_left)m.furn_left = $('#wnd_left').attr('title'); else m.furn_left = "";
            if (m.width_cntr)m.furn_cntr = $('#wnd_cntr').attr('title'); else m.furn_cntr = "";
            if (m.width_right)m.furn_right = $('#wnd_right').attr('title'); else m.furn_right = "";
            if (m.height_top)m.furn_top = $('#wnd_top').attr('title'); else m.furn_top = "";
            for (var sd in{left: "", top: "", cntr: "", right: ""}) {
                cs = m["width_" + sd] * m["height_" + sd];
                if (cs) {
                    wgl = m["width_" + sd] - 80;
                    hgl = m["height_" + sd] - 80;
                    m.p += ((m["width_" + sd] + m["height_" + sd]) * 2) / 1000;
                    if (m["furn_" + sd] && m["furn_" + sd] != $lwc.opentypes.deaf) {
                        wgl = wgl - 80;
                        hgl = hgl - 80;
                        m.p += ((m["width_" + sd] + m["height_" + sd] - 80) * 2) / 1000;
                        m.nf += 1;
                        m.sf += cs / 1000000;
                    }
                    m.s += cs / 1000000;
                    m.sgl += wgl * hgl / 1000000;
                }
            }
            m.w = m.w / 1000;
            m.h = m.h / 1000;
        };
        function exDt() {
            var e, $e, $s, $o, o;

            function exOpt(a, s) {
                for (var i in a) {
                    e = a[i];
                    $o = $('<option></option>');
                    o = $o.get(0);
                    if (e.name)o.text = e.name; else o.text = e;
                    o.value = i;
                    if (e.byDef)o.selected = true;
                    $o.appendTo(s);
                }
            };
            $lwc.e.div.addClass("lwc-div");
            var cdiv = "<div style='margin: 1px 1px 1px 1px; z-index: 10000; clear: both; position: relative; left: 12px; bottom: 8px;'></div>";
            $(cdiv).appendTo($lwc.e.div);
            $lwc.e.wnd = $('.lwc-window');
            $lwc.e.order = $('.lwc-order');
            $lwc.e.mnt = $('#lwc-mnt');
            $lwc.e.otkos = $('#lwc-otkos');
            exOpt($lwc.profiles, $lwc.e.profiles = $("#lwc-profiles"));
            exOpt($lwc.colors, $lwc.e.colors = $("#lwc-clrs"));
            exOpt($lwc.glasses, $lwc.e.glasses = $("#lwc-glasses"));
            exOpt($lwc.glasstypes, $lwc.e.glasstypes = $("#lwc-glasstypes"));
            $lwc.e.ext = $("#lwc-ext").find('ul');
            for (var i in $lwc.ext) {
                e = $lwc.ext[i];
                if (e.values) {
                    $e = $('<li><label for="lwc-ext-' + i + '" style="font-weight: normal;">' + e.name + ':</label><select id="lwc-ext-' + i + '" style="float: left; margin-top: 4px !important; width: 235px !important;"></select></li>');
                    $s = $e.find('select');
                    exOpt(e.values, $s);
                } else {
                    $e = $('<li><input type="checkbox" id="lwc-ext-' + i + '">' + e.name + '</li>');
                    if (e.byDef)$e.get(0).checked = true;
                }
                $e.appendTo($lwc.e.ext);
            }
            exOpt($lwc.houses, $lwc.e.houses = $("#lwc-houses"));
            $('#lwc-economy').next('span').text('Скидка ' + $lwc.price.discount + '% на изделие при заказе через сайт');
        };
        function priceFormat(pr) {
            var price = Math.round(pr).toString();
            if (!$lwc.price.hasOwnProperty("currency_name")) $lwc.price.currency_name = " руб.";
            for (var i = price.length - 3; i > 0; i -= 3) price = price.substr(0, i) + ' ' + price.substr(i);
            return price + $lwc.price.currency_name;
        };
        function postPrms(Total) {
            var orderparams = '';
            orderparams += 'Конструкция: ' + $('.lwc-menu-li ul').find('a.selected').text() + '\n';
            orderparams += 'Профиль: ' + $lwc.profiles[$lwc.e.profiles.val()].name + '\n';
            orderparams += 'Стеклопакет: ' + $lwc.glasses[$lwc.e.glasses.val()].name + '\n';
            if ($('.lwc-door-height').is(':visible')) {
                orderparams += 'Высота двери: ' + $('.lwc-door').find('input').val() + ' мм\n';
                orderparams += 'Ширина двери: ' + $('#wnd_left').closest('div').find('input').val() + ' мм\n'
            }
            if ($('#wnd_top').is(':visible')) {
                orderparams += 'Высота фрамуги: ' + $('#wnd_top').closest('div').find('input').val() + ' мм\n'
            }
            orderparams += 'Высота створок: ' + $('.lwc-wnd-height input').val() + ' мм\n';
            orderparams += 'Ширина створок: ';
            if ($('.lwc-door-height').is(':hidden')) {
                orderparams += $('#wnd_left').closest('div').find('input').val() + ' мм'
            }
            if ($('#wnd_cntr').is(':visible')) {
                if ($('.lwc-door-height').is(':hidden')) {
                    orderparams += ' / '
                }
                orderparams += $('#wnd_cntr').closest('div').find('input').val() + ' мм'
            }
            if ($('#wnd_right').is(':visible')) {
                orderparams += ' / ' + $('#wnd_right').closest('div').find('input').val() + ' мм'
            }
            orderparams += '\n';
            orderparams += 'Створки: ';
            if ($('.lwc-door-height').is(':hidden')) {
                orderparams += $('#wnd_left').attr('title')
            }
            if ($('#wnd_cntr').is(':visible')) {
                if ($('.lwc-door-height').is(':hidden')) {
                    orderparams += ' / '
                }
                orderparams += $('#wnd_cntr').attr('title')
            }
            if ($('#wnd_right').is(':visible')) {
                orderparams += ' / ' + $('#wnd_right').attr('title')
            }
            orderparams += '\n';
            orderparams += 'Установка окна: ' + $lwc.e.mnt.find('option:selected').text() + '\n';
            if ($lwc.e.mnt.val()) {
                orderparams += 'Отделка откосов: ' + $lwc.e.otkos.find('option:selected').text() + '\n';
                orderparams += 'Тип дома: ' + $('#lwc-houses').find('option:selected').text() + '\n'
            }
            if ($('#lwc-economy').is(':checked')) {
                orderparams += 'Стоимость: ' + priceFormat(Total) + ' (скидка ' + $lwc.price.discount + '%)\n'
            } else {
                orderparams += 'Стоимость: ' + priceFormat(Total) + ' (скидка 0%)\n'
            }
            orderparams += '-----\n';
            orderparams += 'Цвета сторон: ' + $lwc.colors[$lwc.e.colors.val()].name + '\n';
            orderparams += 'Cтекло: ' + $lwc.glasstypes[$lwc.e.glasstypes.val()].name + '\n';
            for (var i in $lwc.ext) {
                var e = $lwc.ext[i], $e = $('#lwc-ext-' + i);
                orderparams += e.name + ': ';
                if (e.values) {
                    orderparams += e.values[$e.val()].name;
                } else {
                    if ($e.is(':checked'))orderparams += "Да"; else orderparams += "Нет";
                }
                orderparams += "\n";
            }
            $('#order-params').text(orderparams)
        }
    };
    $lwc.init2 = function () {
        $ = $lwc.$;
        $lwc.e = {div: $("#" + $lwc.divname)};
        $lwc.e.div.html($lwc.divhtml);
        lightcalc();
    }
})($lwc || ($lwc = {}));
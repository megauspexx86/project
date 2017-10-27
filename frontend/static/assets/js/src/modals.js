
(function($) {

    var scripts = [];

    function loadScript(url, callback, context) {

        var script = scripts[url] || (scripts[url] = {
                loaded    : false,
                callbacks : []
            });

        if(script.loaded) {
            return callback.apply(context);
        }

        script.callbacks.push({
            fn      : callback,
            context : context
        });

        if(script.callbacks.length == 1) {
            $.ajax({
                type     : 'GET',
                url      : url,
                dataType : 'script',
                cache    : true,
                success  : function() {
                    script.loaded = true;
                    $.each(script.callbacks, function() {
                        this.fn.apply(this.context);
                    });
                    script.callbacks.length = 0;
                }
            });
        }

    }

    $.requireScript = function(url, callback, context, options) {

        if(typeof options === 'undefined' && context && context.hasOwnProperty('parallel')) {
            options = context;
            context = window;
        }

        options = $.extend({ parallel : true }, options);

        if(!$.isArray(url)) {
            return loadScript(url, callback, context);
        }

        var counter = 0;

        // parallel loading
        if(options.parallel) {
            return $.each(url, function() {
                loadScript(this, function() {
                    if(++counter == url.length) {
                        callback.apply(context);
                    }
                });
            });
        }

        // sequential loading
        (function() {
            if(counter == url.length) {
                return callback.apply(context);
            }
            loadScript(url[counter++], arguments.callee);
        })();

    };

    $.requireScript.registerLoaded = function(url) {
        $.each($.makeArray(url), function() {
            (scripts[url] || (scripts[url] = {})).loaded = true;
        });
    };

})(jQuery);

/**
 * Показ формы логина
 */
function showLoginForm() {
    var c = $('#login_form');
    $.arcticmodal('close');
    $.arcticmodal({
        afterClose: function() {
            $( ".input-error--top" ).html('');
        },
        content: c
    });
}

/**
 * Попап об успешном восстановлении
 */
function remindCompletedPopup() {
    var c = $('#pass_remind_completed_customer');
    $.arcticmodal('close');
    $.arcticmodal({
        content: c
    });
}

/**
 * Попап восстановления пароля автором
 * @param phone_number
 * @param email
 */
function remindAuthorPopup(phone_number, email) {
    var c = $('#remind_sms_sent');
    $.arcticmodal('close');
    $('#reminder_phone').html(phone_number);
    $('#reminder_email_input').val(email);
    $.arcticmodal({
        content: c
    });
}

/**
 * Попап о неправильном номере телефона
 */
function remindIncorrectPhonePopup() {
    var c = $('#remind_invalid');
    $.arcticmodal('close');
    $.arcticmodal({
        content: c
    });
}

/**
 * Попап о создании нового пароля
 */
function createNewPassword() {
    var c = $('#popup_new_password');
    $.arcticmodal('close');
    $.arcticmodal({
        content: c
    });
}

/**
 * Автологин и показ попапа о смене пароля
 * @param code
 */
function autologinAndChangePass(code) {
    var url = "/remind/autologin/"+code;
    $.ajax({
        type: "POST",
        url: url,
        success: function(response) {
            if(response.status == 'ERROR') {

            } else {
                createNewPassword();
            }
        }
    });
}

/**
 * Создание партнёра
 */
function createPartner() {
    var url = "/signup/logged";
    $.ajax({
        type: "POST",
        url: url,
        success: function(response) {
            if(response.is_new) {
                window.location.replace("/signup/redirect?code=" + response.code);
            }else{
                window.location.replace("/");
            }
        }
    });
}

/**
 * Сколнение существительных по падежам
 * @param number
 * @param one
 * @param two
 * @param five
 * @returns {*}
 */
function declension(number, one, two, five) {

    number = Math.abs(number);
    number %= 100;

    if (number >= 5 && number <= 20) {
        return five;
    }

    number %= 10;

    if (number == 1) {
        return one;
    }

    if (number >= 2 && number <= 4) {
        return two;
    }

    return five;

}


$('.header__login>span, .modal-login, .sign_in-form').click(function (e) {
    e.preventDefault();
    showLoginForm();
});


$('.recover').click(function (e) {
    e.preventDefault();
    var c = $('#form_remind_customer');
    $.arcticmodal('close');

    $.arcticmodal({
        afterClose: function() {
            $('.input-inner').removeClass('input-inner--error');
            $(".input-error--remind" ).html('');
            $('#remind_email').val('');
            $('#remind_submit_customer').prop("disabled",false);
        },
        content: c
    });
});


$('#remind_check_code').click(function (e) {
    var url = "/remind/check";
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: url,
        data: $("#remind_sms_sent").serialize(),
        success: function(response) {
            if(response.status == 'ERROR') {
                $(".input-error--sms_sent").addClass('input-error--active');
                if(response.fields.invalid_code) {
                    $( ".input-error--sms_sent" ).html('Вы ввели неверный код');
                }
                if(response.fields.code_expired) {
                    $( ".input-error--sms_sent" ).html('Введенный код устарел. Отправьте еще раз');
                }
            } else {
                autologinAndChangePass(response.code);
            }
        }
    });
});


$('.become-a-partner-logged').click(function (e) {
    e.preventDefault();
    createPartner();
});


$('#remind_change_password').click(function (e) {
    var url = "/remind/password/change";
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: url,
        data: $("#popup_new_password").serialize(),
        success: function(response) {
            if(response.status == 'ERROR') {
                $("#remind_change_password_error").addClass('input-error--active');
                if(response.fields.password && response.fields.password == 'incorrect_length') {
                    $("#remind_change_password_error").html('Пароль должен быть не короче 6-ти символов');
                }
                if(response.fields.password && ((response.fields.password == 'required' && response.fields.confirm_password == 'required')) || response.fields.confirm_password && response.fields.confirm_password == 'equals') {
                    $("#remind_change_password_error").html('Пароли не совпадают');
                }
            } else {
                createPartner();
            }
        }
    });

});

var recaptcha_login ='';
$('#login_submit').click(function (e) {
    var url = "/login";
    e.preventDefault();
    if(window.grecaptcha) {
        $("#login_form").append('<input type = "hidden" name = "response" value="' + window.grecaptcha.getResponse + '"/>');
    }
    console.log($("#login_form").serialize());
    $.ajax({
        type: "POST",
        url: url,
        data: $("#login_form").serialize(),
        success: function(response) {
            if(response.status == 'ERROR') {
                if(response.fields.user_blocked) {
                    $( ".input-error--top" ).html('Ваш аккаунт заблокирован');
                }
                if(response.fields.not_found) {
                    $( ".input-error--top" ).html('Пользователь с таким e-mail и паролем не найден');
                }
                if(response.fields.captcha == 'invalid') {
                    $( ".input-error--top" ).html('Пожалуйста, подтвердите, что вы не робот!');
                }


                if(!!response.captcha) {
                        var mysitekey = response.captcha
                        if($("#recaptcha_login").length == 0) {
                            $("#login_form #password").parents(".input-inner").after('<div class="input-inner" style="height:95px"><div id="recaptcha_login" style="transform:scale(0.91);transform-origin:0 0;"></div></div>');
                            recaptcha_login = grecaptcha.render('recaptcha_login', {
                                'sitekey' : mysitekey
                            });
                        } else {
                            if(typeof recaptcha_login != 'undefined'){
                                window.grecaptcha.reset(recaptcha_login);
                            }
                        }
                }

            } else {
                if(response.is_new) {
                    window.location.replace("/signup/redirect?code="+response.code);
                }else{
                    window.location.replace("/statistics/main");
                }
            }
        }
    });

});


$('#retry_to_send_code').click(function (e) {
    var url = "/remind";
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: url,
        data: $("#remind_sms_sent").serialize(),
        success: function (response) {
            $(".input-error--sms_sent").addClass('input-error--active');
            if (response.status == 'ERROR') {
                if (response.fields.retry_in) {
                    $(".input-error--sms_sent").html('Повторная отправка смс доступна через '+response.fields.retry_in+' '+ declension(response.fields.retry_in, 'минута', 'минуты', 'минут'));
                }
            } else {
                $(".input-error--sms_sent").html('Повторное смс отправлено');
            }
        }
    });
});


$('#remind_submit_customer').click(function (e) {
    var url = "/remind";
    e.preventDefault();

    $('#remind_submit_customer').prop("disabled",true);
    $.ajax({
        type: "POST",
        url: url,
        data: $("#form_remind_customer").serialize(),
        success: function(response) {
            if(response.status == 'ERROR') {
                $("#remind_email").parent().addClass('input-inner--error');
                if(response.fields.captcha) {
                    if(typeof recaptcha_remind != 'undefined'){
                        window.grecaptcha.reset(recaptcha_remind);
                    }
                    $( ".input-error--remind" ).html('Пожалуйста, подтвердите, что вы не робот!');
                }
                if(response.fields.email) {
                    $( ".input-error--remind" ).html('Укажите e-mail');
                }
                if(response.fields.invalid_user) {
                    $( ".input-error--remind" ).html('Указанный e-mail не найден');
                }
                if(response.fields.incorrect_phone_length) {
                    remindIncorrectPhonePopup();
                }
                if (response.fields.retry_in) {
                    $(".input-error--remind").html('Повторная отправка смс доступна через '+response.fields.retry_in+' '+ declension(response.fields.retry_in, 'минута', 'минуты', 'минут'));
                }
                $('#remind_submit_customer').prop("disabled",false);
            }else{
                if(response.role == 1) {
                    remindCompletedPopup();
                }
                if(response.role == 2) {
                    remindAuthorPopup(response.phone, response.email);
                }
            }
        }
    });

});


$('.become-a-partner, .sign_up-form').click(function (e) {
    e.preventDefault();
    var c = $('.popup_b--registr');

    $.arcticmodal('close');
    $.arcticmodal({
        afterClose: function() {
            $('.input-inner').removeClass('input-inner--error');
        },
        content: c
    });
});


$('#register_submit').click(function (e) {
    var url = "/signup";
    e.preventDefault();
    $('.input-inner--error').removeClass('input-inner--error');


    if(document.getElementsByClassName('phone_country_code')[0]){
        var em = document.getElementsByClassName('phone_country_code');
        while(em[0]) {
            em[0].parentNode.removeChild(em[0]);
        }
    }

    var element = document.getElementsByClassName('country highlight active')[0] ? document.getElementsByClassName('country highlight active')[0] :
        document.getElementsByClassName('country preferred active')[0];

    if(element){
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("class", "phone_country_code");
        input.setAttribute("name", "phone_country_code");
        input.setAttribute("value", element.getAttribute('data-dial-code'));
        document.getElementById("signup_form").appendChild(input);
    }

    $.ajax({
        type: "POST",
        url: url,
        data: $("#signup_form").serialize(),
        success: function(response) {
            if(response.status == 'ERROR') {
                if(response.fields) {
                    if(response.fields.email) {
                        $("#email").parent().addClass('input-inner--error');
                    }
                    if(response.fields.name) {
                        $("#name").parent().addClass('input-inner--error');
                        var text = 'Укажите имя';
                        if(response.fields.name == 'not_email') {
                            text = 'Имя не может быть почтой';
                        }
                        $("#name_error_text").html(text);
                    }
                    if(response.fields.password) {
                        $("#pass").parent().addClass('input-inner--error');
                    }
                    if(response.fields.rules) {
                        $("#rules").parent().addClass('input-inner--error');
                    }
                    if(response.fields.phone) {
                        $("#tel").parent().parent().addClass('input-inner--error');
                    }
                    if(response.fields.user_exists) {
                        $.arcticmodal('close');
                        showLoginForm();
                        $( ".input-error--top" ).html('Вы уже зарегистрированы. Введите e-mail и пароль для входа');
                    }
                }
            } else {
                window.location.replace("/signup/redirect?code="+response.code);
            }
        }
    });

});
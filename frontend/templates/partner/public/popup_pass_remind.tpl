<!-- Попап восстановления пароля -->
<div style="display:none">
    <form class="popup_b popup_b--pass" id="form_remind_customer">
        <div class="form__inner">
            <a href="#" class="close_popup box-modal_close arcticmodal-close"></a>
            <div class="popup_head">Восстановление пароля</div>
            <div class="input-inner">
                <input name="email" type="email" class="popup-input" id="remind_email" placeholder="E-mail">
                <div class="input-error input-error--remind"></div>
            </div>
            <div style="margin-bottom:20px">

                <script>
                    var captcha = '{$captcha}';
                    var recaptcha_remind = '';
                    var onloadCallback = function() {
                        mysitekey = captcha;
                        recaptcha_remind = grecaptcha.render('recaptcha_remind', {
                            'sitekey' : mysitekey
                        });
                    };
                </script>

                <div class="input-inner" style="transform: scale(0.91); transform-origin: 0 0;" id="recaptcha_remind">

                </div>
                <div class="clr"></div>
            </div>
            <button class="button" type="submit" id="remind_submit_customer">Восстановить пароль</button>

            <div class="popup__links">
                <a href="#" class="sign_in sign_in-form">Войти</a>
                <a href="#" class="sign_in sign_up-form">Зарегистрироваться</a>
            </div>
        </div>
    </form>
</div>
<!-- /Попап восстановления пароля -->

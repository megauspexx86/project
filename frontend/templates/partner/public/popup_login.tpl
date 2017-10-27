<!-- Попап входа -->
<div style="display:none">
    <form class="popup_b popup_b--login" id="login_form">
        <div class="form__inner">
            <a href="#" class="close_popup box-modal_close arcticmodal-close"></a>
            <div class="popup_head">Вход</div>
            <div class="input-error input-error--top input-error--active"></div>
            <div class="input-inner">
                <input type="email" id="login" name="email" placeholder="E-mail">
            </div>
            <div class="input-inner">
                <input type="password" id="password" name="password" placeholder="Пароль">
                <a href="#" class="recover">восстановить</a>
            </div>
            <button class="button" id="login_submit">Войти</button>
            <div class="popup__links">
                <a href="#" class="sign_in become-a-partner" data-registr>Зарегистрироваться</a>
            </div>
        </div>
        <!-- <button class="button">Войти в личный кабинет</button> -->
        <div class="popup_social">
            <span>Войти с помощью:</span>
            <div class="popup_social__inner">
                <a href="https://loginza.ru/api/widget?token_url=http%3A%2F%2Fwww.napishem.com%2Floginza%2F&amp;provider=vkontakte&amp;lang=ru" class="loginza s1"></a>
                <a href="https://loginza.ru/api/widget?token_url=http%3A%2F%2Fwww.napishem.com%2Floginza%2F&amp;provider=facebook&amp;lang=ru" class="loginza s2"></a>
                <a href="https://loginza.ru/api/widget?token_url=http%3A%2F%2Fwww.napishem.com%2Floginza%2F&amp;provider=odnoklassniki&amp;lang=ru" class="loginza s3"></a>
                <a href="https://loginza.ru/api/widget?token_url=http%3A%2F%2Fwww.napishem.com%2Floginza%2F&amp;provider=yandex&amp;lang=ru" class="loginza s4"></a>
                <a href="https://loginza.ru/api/widget?token_url=http%3A%2F%2Fwww.napishem.com%2Floginza%2F&amp;provider=google&amp;lang=ru" class="loginza s5"></a>
                <a href="https://loginza.ru/api/widget?token_url=http%3A%2F%2Fwww.napishem.com%2Floginza%2F&amp;provider=rambler&amp;lang=ru" class="loginza s6"></a>
            </div>
        </div>
    </form>
</div>
<!-- /Попап входа -->

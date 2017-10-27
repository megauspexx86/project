<!-- Попап регистрации -->
<div style="display:none">
    <form class="popup_b popup_b--registr" id="signup_form">
        <div class="form__inner">
            <a href="#" class="close_popup box-modal_close arcticmodal-close"></a>
            <div class="popup_head">Регистрация</div>
            <div class="input-inner">
                <input type="text" class="popup-input" id="name" placeholder="Имя" name="name">
                <div id="name_error_text" class="input-error">Укажите имя</div>
            </div>
            <div class="input-inner">
                <input type="email" class="popup-input" id="email" placeholder="E-mail" name="email">
                <div class="input-error">Укажите e-mail</div>
            </div>
            <div class="input-inner">
                <input type="password" class="popup-input" id="pass" placeholder="Пароль" name="password">
                <a href="http://www.napishem.com/napomnit.html" class="recover">восстановить</a>
                <div class="input-error">Укажите пароль</div>
            </div>
            <div class="input-inner">
                <input class="popup-input popup-input--tel" id="tel" type="tel" autocomplete="off" name="phone">
                <div class="input-error">Укажите телефон</div>
            </div>
            <div class="input-inner input-inner--small">
                <div class="input-text input-text--small">*все поля обязательны для заполнения</div>
            </div>
            <div class="input-inner">
                <input type="checkbox" name="rules" id="rules">
                <label for="check">Я согласен с <a href="/resources/doc/Pravila.pdf" target="_blank">правилами сайта</a> и <a href="//www.napishem.ru/soglasie.pdf" target="_blank">обработкой персональных данных</a></label>
                <div class="input-error input-error--red">Вы не согласились с правилами сайта и обработкой персональных данных</div>
            </div>
            <button class="button" type="submit" id="register_submit">Зарегистрироваться</button>
            <div class="popup__links">
                <a href="" class="sign_in modal-login">Войти</a>
            </div>
        </div>
    </form>
</div>
<!-- /Попап регистрации -->

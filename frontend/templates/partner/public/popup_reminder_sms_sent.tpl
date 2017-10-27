<div style="display:none" >
    <form class="popup_b popup_b--pass" id="remind_sms_sent">
        <div class="form__inner">
            <a href="#" class="close_popup box-modal_close arcticmodal-close"></a>
            <div class="popup_head">Восстановление пароля</div>
            <div class="input-error input-error--top input-error--sms_sent"></div>

            <div class="input-text">
                На номер <span id="reminder_phone"></span> отправлено смс с кодом подтверждения, введите его в поле ниже.
            </div>
            <div class="input-inner input-inner--with-btn">
                <input type="hidden" name="email" id="reminder_email_input">
                <input type="text" class="popup-input" name="code" id="numb" placeholder="">
                <button class="button" id="remind_check_code" type="submit">Ок</button>
            </div>
            <div class="popup__links">
                <a href="#" id="retry_to_send_code" class="sign_in">Отправить еще раз</a>
            </div>
        </div>
    </form>
</div>
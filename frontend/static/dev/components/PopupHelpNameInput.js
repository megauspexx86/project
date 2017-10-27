import React from 'react';
import ReactDOM       from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';

class PopupHelpNameInput extends React.Component {

    render() {
            return(
                <Dialog name="popup_help_name_input">
                    <div className="popup__title">Рекламное место
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>
                    <div className="popup__inner">
                        <p className="cancel-order__message">{`Введите название места размещения, на котором вы хотите показывать промо-материал (баннер, форму заказа и т.д.). Например, «Баннер на site.com вверху справа 600х90» или «Форма заказа на site.com внизу горизонтальная».`}</p>
                        <nav className="cancel-order__navigation cancel-order__navigation_centred">
                            <button className="authors__select btn ui-btn ui-btn_lg ui-btn_blue" type="reset" onClick={this._close.bind(this)}>Закрыть</button>
                        </nav>
                    </div>
                </Dialog>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_help_name_input'));
        }).bind(this), 0.00001);
    }

}

export default PopupHelpNameInput;

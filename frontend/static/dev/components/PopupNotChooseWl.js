import React from 'react';
import ReactDOM       from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';

class PopupNotChooseWl extends React.Component {

    render() {
            return(
                <Dialog name="popup_not_choose_wl">
                    <div className="popup__title">Не выбран White Label
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>
                    <div className="popup__inner">
                        <p className="cancel-order__message">{`Вы не выбрали White Label для промо-материалов.`}</p>
                        <nav className="cancel-order__navigation cancel-order__navigation_centred">
                            <button className="authors__select btn ui-btn ui-btn_lg ui-btn_blue" type="reset" onClick={this._close.bind(this)}>Закрыть</button>
                        </nav>
                    </div>
                </Dialog>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_not_choose_wl'));
        }).bind(this), 0.00001);
    }

}

export default PopupNotChooseWl;

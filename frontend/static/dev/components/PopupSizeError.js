import React from 'react';
import ReactDOM       from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';
import RotationActions from '../actions/Rotation';

class PopupSizeError extends React.Component {

    render() {
            return(
                <Dialog name="popup_size_error">
                    <div className="popup__title">Несоответствие размеров
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>
                    <div className="popup__inner">
                        <p className="cancel-order__message">{`В ротацию можно выбрать промо-материалы одинакового размера.`}</p>
                        <nav className="cancel-order__navigation cancel-order__navigation_centred">
                            <button className="authors__select btn ui-btn ui-btn_lg ui-btn_blue" type="reset" onClick={this._close.bind(this)}>Закрыть</button>
                        </nav>
                    </div>
                </Dialog>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_size_error'));
            RotationActions.resetErrors();
        }).bind(this), 0.00001);
    }

}

export default PopupSizeError;

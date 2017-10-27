import React from 'react';
import ReactDOM       from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';
import PromoMaterialsActions from '../actions/PromoMaterials';
import Form from '../../../../account/static/frontend/common/components/Form';

class PopupAddPlaceToArchive extends React.Component {

    _response(response) {
        PromoMaterialsActions.getPartnerPromoLinks('active');
        PromoMaterialsActions.getPartnerComponentsList();
        this._close();
    }


    render() {

            return(
                <Dialog name="popup_add_place_to_archive">
                    <div className="popup__title">Подтвердите отправку в архив
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>
                    <Form className="popup__body cancel-order" action={`/json/place/archive/${this.props.place_id}`} callback={((response) => {this._response(response)})} error_cb={((response) => {console.log('ERROR')}).bind(this)}>
                        <p className="cancel-order__message">{`Вы действительно хотите отправить в архив ${this.props.type == 'link' ? `ссылку` : `рекламное место`} «${this.props.title}»?`}</p>
                        <nav className="cancel-order__navigation cancel-order__navigation_centred">
                            <button  className="authors__select btn ui-btn ui-btn_lg ui-btn_grey" type="submit">Да</button>
                            <button className="cancel-order__close ui-btn ui-btn_lg ui-btn_blue" type="reset" onClick={this._close.bind(this)}>Нет</button>
                        </nav>
                    </Form>
                </Dialog>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_add_place_to_archive'));
        }).bind(this), 0.00001);
    }

}

export default PopupAddPlaceToArchive;

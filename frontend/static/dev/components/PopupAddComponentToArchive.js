import React from 'react';
import ReactDOM       from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';
import PromoMaterialsActions from '../actions/PromoMaterials';
import Request from 'napishem-frontend-utils/modules/Request';

class PopupAddComponentToArchive extends React.Component {

    addComponentToArchive() {
        let r = new Request(`/json/component/archive/${this.props.component_id}`);
        r.send(((response) => {
            if (response.status == "ERROR") {
                console.log('ERROR');
            }else{
                PromoMaterialsActions.getPartnerComponentsList();
                this._close();
            }
        }).bind(this));


        this._close();
    }


    render() {

            return(
                <Dialog name="popup_add_component_to_archive">
                    <div className="popup__title">Подтвердите отправку в архив
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>
                    <div className="popup__body cancel-order">
                        <p className="cancel-order__message">{`Вы действительно хотите отправить в архив промо-материал «${this.props.title}»?`}</p>
                        <nav className="cancel-order__navigation cancel-order__navigation_centred">
                            <button  className="authors__select btn ui-btn ui-btn_lg ui-btn_grey" onClick={(() => {this.addComponentToArchive()}).bind(this)}>Да</button>
                            <button className="cancel-order__close ui-btn ui-btn_lg ui-btn_blue" type="reset" onClick={this._close.bind(this)}>Нет</button>
                        </nav>
                    </div>
                </Dialog>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_add_component_to_archive'));
        }).bind(this), 0.00001);
    }

}

export default PopupAddComponentToArchive;

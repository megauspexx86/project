import React from 'react';
import ReactDOM       from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';
import PromoMaterialsActions from '../actions/PromoMaterials';
import Request from 'napishem-frontend-utils/modules/Request';

class PopupRemovePlaceFromArchive extends React.Component {

    removePlaceFromArchive() {
        let r = new Request(`/json/place/restore/${this.props.place_id}`);
        r.send(((response) => {
            if (response.status == "ERROR") {
                console.log('ERROR');
            }else{
                PromoMaterialsActions.getPartnerPromoLinks('archive');
                PromoMaterialsActions.getPartnerArchivedComponentsList();
                this._close();
            }
        }).bind(this));


        this._close();
    }


    render() {

            return(
                <Dialog name="popup_remove_place_from_archive">
                    <div className="popup__title">Подтвердите восстановление
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>
                    <div className="popup__body cancel-order">
                        <p className="cancel-order__message">{`Вы действительно хотите восстановить ${this.props.type == 'link' ? `ссылку` : `промо-материалы рекламного места`} «${this.props.title}»?`}</p>
                        <nav className="cancel-order__navigation cancel-order__navigation_centred">
                            <button  className="authors__select btn ui-btn ui-btn_lg ui-btn_blue" onClick={(() => {this.removePlaceFromArchive()}).bind(this)}>Да</button>
                            <button className="cancel-order__close ui-btn ui-btn_lg ui-btn_grey" type="reset" onClick={this._close.bind(this)}>Нет</button>
                        </nav>
                    </div>
                </Dialog>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_remove_place_from_archive'));
        }).bind(this), 0.00001);
    }

}

export default PopupRemovePlaceFromArchive;

import React from 'react';
import ReactDOM       from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';
import PromoMaterialsActions from '../actions/PromoMaterials';
import Request from 'napishem-frontend-utils/modules/Request';

class PopupSwitchPlace extends React.Component {

    switchPlace() {
        let url = '';
        if(this.props.status == 'ACTIVE') {
             url = `/json/place/off/${this.props.place_id}`;
        }
        if(this.props.status == 'DISABLED') {
             url = `/json/place/on/${this.props.place_id}`;
        }

        var r = new Request(url);
        r.send(((response) => {
            if (response.status == "ERROR") {
                console.log('ERROR');
            }else{
                PromoMaterialsActions.getPartnerComponentsList();
                this._close();
            }
        }).bind(this));


    }

    render() {

        let active = this.props.status == 'ACTIVE';
            return(
                <Dialog name="popup_switch_place">
                    <div className="popup__title">{'Подтвердите '+(active ? 'отключение' : 'включение')}
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>
                    <div className="popup__body cancel-order">
                        <p className="cancel-order__message">{'Вы действительно хотите '+(active ? 'отключить' : 'включить')+` рекламное место «${this.props.title}»?`}</p>
                        <nav className="cancel-order__navigation cancel-order__navigation_centred">
                            <button  className={`authors__select btn ui-btn ui-btn_lg ${active ? `ui-btn_grey` : `ui-btn_blue`}`} onClick={(() => {this.switchPlace()}).bind(this)}>Да</button>
                            <button className={`cancel-order__close ui-btn ui-btn_lg ${active ? `ui-btn_blue` : `ui-btn_grey`}`} type="reset" onClick={this._close.bind(this)}>Нет</button>
                        </nav>
                    </div>
                </Dialog>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_switch_place'));
        }).bind(this), 0.00001);
    }

}

export default PopupSwitchPlace;

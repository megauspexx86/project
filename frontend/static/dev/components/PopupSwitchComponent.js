import React from 'react';
import ReactDOM       from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';
import PromoMaterialsActions from '../actions/PromoMaterials';
import Request from 'napishem-frontend-utils/modules/Request';

class PopupSwitchComponent extends React.Component {

    switchComponent() {
        let url = '';
        if(this.props.status == 'ACTIVE') {
             url = `/json/component/off/${this.props.component_id}`;
        }
        if(this.props.status == 'DISABLED') {
             url = `/json/component/on/${this.props.component_id}`;
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
                <Dialog name="popup_switch_component">
                    <div className="popup__title">{'Подтвердите '+(active ? 'отключение' : 'включение')}
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>
                    <div className="popup__body cancel-order">
                        <p className="cancel-order__message">{'Вы действительно хотите '+(active ? 'отключить' : 'включить')+` промо-материал «${this.props.title}»?`}</p>
                        <nav className="cancel-order__navigation cancel-order__navigation_centred">
                            <button  className={`authors__select btn ui-btn ui-btn_lg ui-btn_${active ? `grey` : `blue`}`} onClick={(() => {this.switchComponent()}).bind(this)}>Да</button>
                            <button className={`cancel-order__close ui-btn ui-btn_lg ui-btn_${active ? `blue` : `grey`}`} type="reset" onClick={this._close.bind(this)}>Нет</button>
                        </nav>
                    </div>
                </Dialog>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_switch_component'));
        }).bind(this), 0.00001);
    }

}

export default PopupSwitchComponent;

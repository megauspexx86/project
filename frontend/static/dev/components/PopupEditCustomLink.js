import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';
import Form from '../../../../account/static/frontend/common/components/Form';
import PromoMaterialsActions from '../actions/PromoMaterials';

class PopupEditCustomLink extends React.Component {

    constructor(props) {

        super(props);

        this.state = {error: {}}
    }


    render() {

            return(
                <Dialog name="popup_edit_custom_link">
                    <div className="popup__title">Переименование ссылки
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>

                    <div className="popup__body">
                        <Form className="pay-order" action="/json/promo/links/edit" callback={((response) => {this._response(response)})} error_cb={((response) => {this.setState({error: response.fields})}).bind(this)}>
                            <div className="pay-order__form-line payment-form">
                                <div className="pay-order__type">
                                    <label className="pay-order__label" htmlFor="pay-order__method">Имя ссылки:</label>
                                    <input className={`ui-input ui-input_text search-block__input ${this.state.error && this.state.error.title ? `error` : ``}`} defaultValue={this.props.title} name="title" maxLength="20"/>
                                    <input type="hidden" name="link_id" defaultValue={this.props.component_id}/>
                                </div>
                            </div>
                            <nav className="cancel-order__navigation cancel-order__navigation_centred">
                                <button className="authors__select btn ui-btn ui-btn_lg ui-btn_blue" type="submit">Сохранить</button>
                                <button className="cancel-order__close ui-btn ui-btn_lg ui-btn_grey" type="reset" onClick={this._close.bind(this)}>Отменить</button>
                            </nav>
                        </Form>
                        </div>
                </Dialog>
        )
    }

    _response() {
        PromoMaterialsActions.getPartnerPromoLinks(this.props.status);
        this._close();
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_edit_custom_link'));
        }).bind(this), 0.00001);
    }

}

export default PopupEditCustomLink;

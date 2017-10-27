import React from 'react';
import ReactDOM       from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';
import Request from 'napishem-frontend-utils/modules/Request';
import Form from '../../../../account/static/frontend/common/components/Form';
import PromoMaterialsActions from '../actions/PromoMaterials';
import PopupEmbedCode from './PopupEmbedCode';

class PopupChooseWhiteLabel extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {list: []};
    }

    componentDidMount() {
        this.__list();
    }

    componentWillUnmount() {

    }

    _onChange() {

    }

    /**
     * Получение списка WL
     * @private
     */
    __list() {
        this.__request('/json/wl/list');
    }


    /**
     * Отправка формы
     * @param url
     * @param options
     * @private
     */
    __request(url, options) {

        var r = new Request(url, 'POST');

        let data = new FormData();

        if(options) {
            for(let name in options) {
                data.append(name, options[name]);
            } 
        }
        
        r.send(((response) => {
            this.setState({list: response.list})
        }).bind(this), data);
    }

    _response(response) {
        let place = {place: {id: response.place.id}};
        PromoMaterialsActions.setActiveComponentId(place);
        ReactDOM.render(<PopupEmbedCode name="popup_embed_code" />, document.getElementById('popup_embed_code'));
        this._close();
    }

    
    render() {
        if(!this.state.list) {
            return null;
        }

            return(
                <Dialog name="popup_choose_white_label">
                    <div className="popup__title">Выберите White Label
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>
                    <div className="popup__wl-descr">Перед тем, как получить код, необходимо выбрать White Label для промо-материала.</div>
                    <div className="popup__body">
                        <Form className="wl-form" action={`/json/wl/promo/create`} method="POST"
                                  callback={((response) => {this._response(response)})}
                                  error_cb={((response) => {this.setState({error: response.fields})}).bind(this)}>
                            <div className="wl-form__line">
                                <input type="hidden" name="template_id" value={this.props.template_id}/>
                                <label className="wl-form__label">Выберите White Label</label>
                                <select className={`ui-select wl-form__select-type ${this.state.error && this.state.error.wl_id ? `error` : ``}`} name="wl_id">
                                    <option value="">White Label</option>
                                    <option value="napishem">Napishem</option>
                                    {
                                        this.state.list.map(function (wl, key) {

                                            return <option key={key} value={wl.id}>{wl.title}</option>
                                        })
                                    }
                                </select>
                                <a href="/help/white_label" className="tooltip__question">?</a>
                            </div>
                            <nav className="wl-form__buttons">
                                <button className="ui-btn ui-btn_lg ui-btn_blue" type="submit">Получить код</button>
                                <button className="ui-btn ui-btn_lg ui-btn_grey" onClick={this._close.bind(this)} type="reset">Закрыть</button>
                            </nav>
                        </Form>
                    </div>
                </Dialog>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_choose_white_label'));
        }).bind(this), 0.00001);
    }

}

export default PopupChooseWhiteLabel;

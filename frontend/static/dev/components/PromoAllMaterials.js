import React from 'react';
import ReactDOM       from 'react-dom';
import copy from 'copy-to-clipboard';
import Preloader from 'napishem-frontend-utils/modules/Preloader';
import PromoMaterialsActions from '../actions/PromoMaterials';
import PromoMaterialsStore from '../stores/PromoMaterials';
import PopupEmbedCode from './PopupEmbedCode';
import {PromoMaterialsFilter, FilterFormType, FilterSelectElements} from './PromoMaterialsFilter';
import Form from '../../../../account/static/frontend/common/components/Form';
import ImageViewer from './ImageViewer';
import PopupEditCustomLink from './PopupEditCustomLink';
import PopupChooseWhiteLabel from './PopupChooseWhiteLabel';
import Request from 'napishem-frontend-utils/modules/Request';


export class PromoAllMaterialsLink extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {links: [], key: ''}
    }

    componentDidMount() {
        PromoMaterialsStore.addChangeListener(this.__changeEvent);
        PromoMaterialsActions.getPartnerPromoLinks('all');
    }

    componentWillUnmount() {
        PromoMaterialsStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(PromoMaterialsStore.getPromoLinks('all'));
    }

    _copyLinkToClipboard() {
        let val = document.getElementById('link_for_copy_to_clipboard').innerHTML;
        copy(val);
    }

    _openEditLinkDialog(e, link) {
        e.preventDefault();
        ReactDOM.render(<PopupEditCustomLink name="popup_edit_custom_link" status="all" title={link.link_title} component_id={link.link_id}/>, document.getElementById('popup_edit_custom_link'));
    }

    _links() {
        if(this.state.links) {
            return this.state.links.map((link, key) => {
                return(
                    <div key={key} className="promo-block__line">
                        <div className="promo-block__text promo-block__text--wrap">
                            <div className="promo-block__name-link">{link.link_title}:</div> <span className="promo-block__text promo-block__text--gray">{`${$CFG.mirror_url}/?refid=${$CFG.user.id}&cid=${link.link_id}`}</span>
                        </div>
                        <button data-title="Редактировать" data-titleactive="Редактировать" className="promo-block__icon promo-block__icon--edit" onClick={((e) => {this._openEditLinkDialog(e, link)}).bind(this)}></button>
                    </div>
                )
            })
        }

    }

    _response(response) {
        if(response.status == 'OK') {
            PromoMaterialsActions.getPartnerPromoLinks('all');
            this.setState({key: Math.random(), error: ''});
        }
    }

    _error(response) {
        this.setState({error: response.fields, key: Math.random()});
    }

    render() {

        return (
            <div className="promo-block__column">
                <div id="popup_edit_custom_link"></div>
                <div className="promo-block__line">
                    Вы можете создать любое количество ссылок и размещать их
                    на своих страницах или передавать знакомым, одногруппникам
                    или веб-мастерам. Все пользователи, которые перейдут на наш
                    сайт по вашим ссылкам, станут вашими рефералами.
                </div>
                <Form key={this.state.key} action="/json/promo/links/create" className="promo-block__line promo-block__line--border" callback={((response) => {this._response(response)})} error_cb={((response) => {this._error(response)}).bind(this)}>
                    <div className="promo-block__text promo-block__text--wrap">
                        <div className="promo-block__name-link">Имя новой ссылки:</div>
                        <input type="text" className={`ui-input ui-input_text search-block__input ${this.state.error && this.state.error.title ? `error` : ``}`} name="title" id="rotation_title" maxLength="20" />
                    </div>
                    <button className="ui-btn ui-btn_blue ui-btn--w120 ui-btn_lg" type="submit">Создать</button>
                </Form>
                <div className="promo-block__line">
                    <div className="promo-block__text promo-block__text--wrap">
                        <div className="promo-block__name-link">Реферальная ссылка:</div> <span className="promo-block__text promo-block__text--gray">{`${$CFG.mirror_url}/?refid=${$CFG.user.id}`}</span>
                    </div>
                </div>
                {this._links()}
            </div>
        )
    }
}

export class PromoAllMaterialsForms extends React.Component {

    render() {
        return(
            <div>
                <PromoMaterialsFilter title={`Фильтр`}>
                    <FilterFormType filter="form" reset_button={true}/>
                    <FilterSelectElements filter="form" />
                </PromoMaterialsFilter>
                <PromoMaterialsForms/>
            </div>
        )
    }
}

export class PromoAllMaterialsBanners extends React.Component {

    render() {
        return(
            <div>
                <PromoMaterialsFilter title={`Фильтр`}>
                    <FilterFormType filter="banner" reset_button={true}/>
                    <FilterSelectElements filter="banner" />
                </PromoMaterialsFilter>
                <PromoMaterialsBanners/>
            </div>
        )
    }
}

export class PromoMaterialsForms extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);
        this.state = {templates_list_banners: [], templates_list_forms: [], active_ids: []}
    }

    componentDidMount() {
        PromoMaterialsStore.addChangeListener(this.__changeEvent);
        this.setState({active_ids: this.props.active_ids});

        let active_banners = [];
        if(this.props.components) {
            this.props.components.map((component) => {
                if(component.status == 'ACTIVE' || component.status == 'DISABLED') {
                    active_banners.push(component.template_id);
                }
            });
            this.setState({init_ids: active_banners});
        }
        this.__list();

        Preloader.done();
    }

    __list() {
        this.__request('/json/wl/list');
    }


    /**
     * Загрузка отчета и обновление state
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

    componentWillUnmount() {
        PromoMaterialsStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(PromoMaterialsStore.getPromoMaterialsForms());
    }
    
    

    _openEmbedCodeDialog(e, template_id, is_form = true) {
        e.preventDefault();
        if($CFG.wl && is_form) {
            return ReactDOM.render(<PopupChooseWhiteLabel template_id={template_id} name="popup_choose_white_label" />, document.getElementById('popup_choose_white_label'));
        }
        PromoMaterialsActions.createPromoComponentWithPlace(template_id);
        ReactDOM.render(<PopupEmbedCode name="popup_embed_code" />, document.getElementById('popup_embed_code'));
    }
    
    render() {
        if(!this.state.templates_list_forms) {
            return null;
        }

        return(
            <div className="banner-wrapper">
                <div id="popup_embed_code"></div>
                <div id="popup_choose_white_label"></div>
                <div id="image_viewer"></div>
                {Object.keys(this.state.templates_list_forms).map((value, list_key) => {
                    return (
                        <div key={list_key}>
                            <div className="banner-wrapper__title">{`Формы заказов ${value}`}</div>
                            <div className="banner-inner">
                                {this.state.templates_list_forms[value].map((val, k) => {
                                    return (
                                        <Banner form_id={val.id} key={k} data={val}>
                                            <button className="ui-btn ui-btn_blue ui-btn_lg ui-btn--w170" type="submit" onClick={((e) => {this._openEmbedCodeDialog(e, val.id)})}>
                                                Получить код
                                            </button>
                                        </Banner>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    
}

class PromoMaterialsBanners extends PromoMaterialsForms {

    render() {
        if(!this.state.templates_list_banners) {
            return null;
        }

        return(
            <div className="banner-wrapper">
                <div id="popup_embed_code"></div>
                <div id="popup_choose_white_label"></div>
                <div id="image_viewer"></div>
                {Object.keys(this.state.templates_list_banners).map((value, list_key) => {
                    return (
                        <div key={list_key}>
                            <div className="banner-wrapper__title">{`Баннеры ${value}`}</div>
                            <div className="banner-inner">
                                {this.state.templates_list_banners[value].map((val, k) => {
                                    return (
                                        <Banner form_id={val.id} key={k} data={val}>
                                            <button className="ui-btn ui-btn_blue ui-btn_lg ui-btn--w170" type="submit" onClick={((e) => {this._openEmbedCodeDialog(e, val.id, false)})}>
                                                Получить код
                                            </button>
                                        </Banner>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export class Banner extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {component: ''}
    }

    componentDidMount() {
        PromoMaterialsStore.addChangeListener(this.__changeEvent);
    }

    componentWillUnmount() {
        PromoMaterialsStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(PromoMaterialsStore.getActiveComponentId());
    }

    _previewPromoMaterial() {
        if(this.props.data.type == 'banner') {
            return ReactDOM.render(<ImageViewer image_url={`/partner_template_images/${JSON.parse(this.props.data.preview_file).server_name}`} />, document.getElementById('image_viewer'));
        }
        window.open(`/preview/template/${this.props.data.id}`);
    }

    render() {
        return (
            <div className={`banner `+(this.props.data.shape == 'horizontal' ? `banner--horizontal` : ``)}>
                <div className="banner__head">
                    <p className="banner__text">{this.props.data.title}</p>
                </div>
                <img src={`/partner_template_images/${this.props.data.preview_file ? JSON.parse(this.props.data.preview_file).server_name : ''}`} title={`${this.props.data.type == 'form' ? `Посмотреть как работает форма заказа` : `Посмотреть баннер оригинального размера`}`} alt="Баннер" className="banner__img" onClick={(() => {this._previewPromoMaterial()})}/>
                {this.props.children}
            </div>
        )
    }
}



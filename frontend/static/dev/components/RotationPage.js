import React from 'react';
import ReactDOM       from 'react-dom';
import {Router, Link} from 'react-router';
import PopupHelpNameInput from './PopupHelpNameInput';
import PopupNotChooseError from './PopupNotChooseError';
import PopupNotChooseWl from './PopupNotChooseWl';
import PopupRotationAbout from './PopupRotationAbout';
import PopupSizeError from './PopupSizeError';
import {PromoMaterialsFilter, FilterFormType, FilterSelectElements, FilterPromoType} from './PromoMaterialsFilter';
import {PromoMaterialsForms, Banner} from './PromoAllMaterials';
import RotationActions from '../actions/Rotation';
import RotationStore from '../stores/Rotation';
import copy from 'copy-to-clipboard';
import Form from '../../../../account/static/frontend/common/components/Form';
import ImageViewer from './ImageViewer';

export class RotationPage extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {}
    }

    componentDidMount() {
        ReactDOM.render(<button className="tooltip__question tooltip__question--t-2" onClick={((e) => {this._onShowAboutDiaalog(e)}).bind(this)}>?</button>, document.getElementById('custom_title'));
        RotationStore.addChangeListener(this.__changeEvent);
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('custom_title'));
        RotationStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        let result = RotationStore.getResult();
        this.setState({response: result.response, errors: result.errors});
    }

    _response(response) {
        this.setState({errors: {}});
        RotationActions.setRotationResult(response);
        return this.context.router.push(`/promo/rotation/result`);
    }

    componentDidUpdate() {
        if(this.state.errors) {
            if(this.state.errors.ids) {
                ReactDOM.render(<PopupNotChooseError name="popup_not_choose_error" />, document.getElementById('popup_not_choose_error'));
            }
            if(this.state.errors['size']) {
                ReactDOM.render(<PopupSizeError name="popup_size_error" />, document.getElementById('popup_size_error'));
            }
            if(this.state.errors.empty_wl) {
                ReactDOM.render(<PopupNotChooseWl name="popup_not_choose_wl" />, document.getElementById('popup_not_choose_wl'));
            }
        }


    }

    _onShowAboutDiaalog(e) {
        e.preventDefault();
        ReactDOM.render(<PopupRotationAbout name="popup_rotation_about" />, document.getElementById('popup_rotation_about'));
    }

    render() {
        let active_banners = [];
        if(this.state.components) {
            this.state.components.map((component) => {
                active_banners.push(component.template_id);
            })
        }

        return (
            <div className="promo-block">
                <div id="popup_not_choose_error"></div>
                <div id="popup_not_choose_wl"></div>
                <div id="popup_size_error"></div>
                <div id="popup_rotation_about"></div>
                <div id="image_viewer"></div>
                <Form action={`/json/rotation/create`}
                      callback={((response) => {this._response(response)}).bind(this)}

                      error_cb={((response) => {this.setState({errors: response.errors})}).bind(this)}>
                    <PromoPlaceNameInput default_title={this.state.components ? this.state.components[0].place_title : ''} error={this.state.errors && this.state.errors.title}/>
                    <PromoMaterialsFilter title={`Настройки промо-материалов`}>
                        <FilterPromoType />
                        <FilterFormType filter="all" reset_button={true}/>
                        <FilterSelectElements filter="all" />
                    </PromoMaterialsFilter>
                    <RotationBanners active_ids={active_banners} errors={this.state.errors}>
                        <button className="ui-btn ui-btn_blue ui-btn_lg ui-btn--w170" type="submit" >Получить код ротации</button>
                    </RotationBanners>
                </Form>
            </div>
        )
    }

}
RotationPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export class EditRotationPage extends RotationPage {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {response: {}}
    }

    componentDidMount() {
        RotationStore.addChangeListener(this.__changeEvent);
        RotationActions.setActiveRotation(this.props.params.id);
        ReactDOM.render(<button className="tooltip__question tooltip__question--t-2" onClick={((e) => {this._onShowAboutDiaalog(e)}).bind(this)}>?</button>, document.getElementById('custom_title'));
    }

    componentWillUnmount() {
        RotationStore.removeChangeListener(this.__changeEvent);
        ReactDOM.unmountComponentAtNode(document.getElementById('custom_title'));
    }

    _onChange() {
        this.setState(RotationStore.getActiveRotation());
    }

    _response(response) {
        this.setState({errors: {}});
        this.context.router.push(`/promo/my`);
    }

    render() {
        if(!this.state.components) {
            return null;
        }
        let active_banners = [];
        if(this.state.components) {
            this.state.components.map((component) => {
                if(component.status == 'ACTIVE') {
                    active_banners.push(component.template_id);
                }
            })
        }

        Array.prototype.in_array = function in_array(p_val) {
            for(var i = 0, l = this.length; i < l; i++)  {
                if(this[i] == p_val) {
                    return true;
                }
            }
            return false;
        };

        let all = (this.state.types.in_array(['form']) && this.state.types.in_array(['banner']));

        return (
            <div className="promo-block">
                <div id="popup_not_choose_error"></div>
                <div id="popup_size_error"></div>
                <div id="popup_rotation_about"></div>
                <Form action={`/json/rotation/edit/${this.state.components[0].place_id}`}
                      callback={((response) => {this._response(response)}).bind(this)}
                      error_cb={((response) => {this.setState({errors: response.errors})}).bind(this)}>
                    <PromoPlaceNameInput default_title={this.state.components ? this.state.components[0].place_title : ''} error={this.state.errors && this.state.errors.title}/>
                    <PromoMaterialsFilter title={`Настройки промо-материалов`} default_type={all ? 'all' : this.state.types[0]} default_shape={this.state.components ? this.state.components[0].shape : {}} default_width = {this.state.components ? this.state.components[0].template_width : {} } default_height = {this.state.components ? this.state.components[0].template_height : {} }>
                        <FilterPromoType />
                        <FilterFormType filter="all" disabled={true}/>
                        <FilterSelectElements filter="all" disabled={true}/>
                    </PromoMaterialsFilter>
                    <RotationBanners active_ids={active_banners} components={this.state.components} >
                        <button className="ui-btn ui-btn_blue ui-btn_lg ui-btn--w170" type="submit" >Сохранить</button>
                    </RotationBanners>
                </Form>
            </div>
        )
    }

}

class PromoPlaceNameInput extends React.Component {



    _openHelpNameInputDialog(e) {
        e.preventDefault();
        ReactDOM.render(<PopupHelpNameInput name="popup_help_name_input" />, document.getElementById('popup_help_name_input'));
    }
    _validate() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let scr = setInterval(function () {
            scrollTop -= 30;
            window.scrollTo(0, scrollTop);

            if (scrollTop <= 0) {
                return clearInterval(scr);
            }
        }, 5);
    }

    render() {
        if(this.props.error) {
            this._validate();
        }
        return (
            <div className="search-block" key={this.props.default_title}>
                <div id="popup_help_name_input"></div>
                <label htmlFor="" className="search-block__label">Название рекламного места</label>
                <input type="text" className={`ui-input ui-input_text search-block__input ${this.props.error ? `error` : ``}`} name="title" id="rotation_title" defaultValue={this.props.default_title}/>
                <button className="tooltip__question" onClick={((e) => {this._openHelpNameInputDialog(e)}).bind(this)}>?</button>
            </div>
        )
    }

}

class RotationBanners extends PromoMaterialsForms {

    _switchBanner(e, id) {
        e.preventDefault();
        let _rotation_ids = this.state.active_ids;
        if (_rotation_ids.indexOf(id) != -1) {
            for (let key in _rotation_ids) {
                if (_rotation_ids.hasOwnProperty(key) && _rotation_ids[key] == id) {
                    delete _rotation_ids[key];
                }
            }
        } else {
            _rotation_ids.push(id);
        }
        this.setState({active_ids: _rotation_ids});
    }



    _chooseWhiteLabelForm(id, is_form) {

        let def_val = '';
        if(this.props.components) {
            for (let c of this.props.components) {
                if(c.template_id == id) {
                    def_val = c.wl_id;
                }
                if(c.wl_id == 0) {
                    def_val = 'napishem';
                }
            }
        }

        if(is_form && $CFG.wl) {
            return(
                <div className={`banner__select-wrapper banner__select-wrapper_visible`}>
                    <select className={`ui-select banner__select ${(this.props.errors && this.props.errors.empty_wl && this.props.errors.empty_wl.indexOf(id) != -1) ? `error` : ``} `} name={'wl['+id+']'} defaultValue={def_val}>
                        <option value="">White Label</option>
                        <option value="napishem">Napishem</option>
                        {
                            this.state.list.map((wl, key) => {
                                return <option key={key} value={wl.id}>{wl.title}</option>
                            })
                        }
                    </select>
                    <Link to="/help/white_label" className="tooltip__question">?</Link>
                </div>
            )
        }
    }


    _inRotationButton(id, is_form) {

        if($CFG.wl && !this.state.list) {
            return null;
        }

        if(this.state.init_ids && this.state.init_ids.indexOf(id) != -1) {
            return (
                <div>
                    <button className="ui-btn ui-btn_gray ui-btn_disable ui-btn_lg ui-btn--w170" type="submit">В ротации</button>
                    <input style={{display: 'none'}} type="checkbox" name="ids[]" value={id} checked="checked" />
                    {this._chooseWhiteLabelForm(id, is_form)}
                </div>
            )
        }
        let in_rotation = this.state.active_ids.indexOf(id) != -1;

        return (
            <div>
                <button className={`ui-btn ui-btn_${in_rotation ? `orange` : `blue`} ui-btn_lg ui-btn--w170`} type="submit" onClick={((e) => this._switchBanner(e, id))}>{in_rotation ? `Убрать из ротации` : `Добавить в ротацию`}</button>
                {in_rotation ? this._chooseWhiteLabelForm(id, is_form) : ``}
            </div>
        )

    }

    render() {

        if(!Object.keys(this.state.templates_list_banners).length && !Object.keys(this.state.templates_list_forms).length) {
            return null;
        }

        return(
            <div className="banner-wrapper">
                <div id="popup_embed_code"></div>
                {Object.keys(this.state.templates_list_banners).map((value, list_key) => {
                    return (
                        <div key={list_key}>
                            <div className="banner-wrapper__title">{`Баннеры ${value}`}</div>
                            <div className="banner-inner">
                                {this.state.templates_list_banners[value].map((val, k) => {
                                    return (
                                        <Banner form_id={val.id} key={k} data={val}>
                                            {this._inRotationButton(val.id, false)}
                                        </Banner>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                {Object.keys(this.state.templates_list_forms).map((value, list_key) => {
                    return (
                        <div key={list_key}>
                            <div className="banner-wrapper__title">{`Формы заказов ${value}`}</div>
                            <div className="banner-inner">
                                {this.state.templates_list_forms[value].map((val, k) => {
                                    return (
                                        <Banner form_id={val.id} key={k} data={val}>
                                            {this._inRotationButton(val.id, true)}
                                        </Banner>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                {this.state.active_ids.map((id, key) => {
                    return <input key={key} style={{display: 'none'}} type="checkbox" name="ids[]" value={id} checked='checked'/>
                })}
                {this.props.children}
            </div>
        )
    }

}

export class RotationPageResult extends React.Component {

    constructor(props) {

        super(props);

        this.state = {response: {}}
    }

    componentDidMount() {
        let response = RotationStore.getResult();
        if(!response) {
            return this.context.router.push(`/404`);
        }
        this.setState({response: response.response});
    }

    _previewPromoMaterial(component) {
        if(component.type == 'banner') {
            return ReactDOM.render(<ImageViewer image_url={`/partner_template_images/${JSON.parse(component.preview_file).server_name}`} />, document.getElementById('image_viewer'));
        }
        window.open(`/preview/template/${component.template_id}`);
    }

    _getComponentCode() {

        return `<div id="partner_form_napishem"></div>
                    <script>
                        (function (d, w) {
                            var  s = d.createElement('script'),
                            f = function() {document.body.appendChild(s);};
                            var container = 'partner_form_napishem';
                            var charset = document.characterSet ? document.characterSet : document.charset;
                            s.async = false;
                            s.src = '` + $CFG.partner_url +'/widget.js'+ `?id=`  + this.state.response.place.id + `&c=' + container + '&charset=' + charset;
                            if (w.opera == '[object Opera]') return d.addEventListener('DOMContentLoaded', f, false);
                            w.addEventListener('load', f);
                        })(document, window);
                    </script>`;
    }

    render() {
        if(!this.state.response.place) {
            return null;
        }
        let text = this._getComponentCode();

        return(
            <div className="promo-block">
                <div id="image_viewer"></div>
                <div className="lk__row lk__row--head">
                    <div className="lk__text">{`Вы создали рекламное место «${this.state.response.place.title}» с ротацией.`}</div>
                </div>
                <div className="lk__inner">
                    <div className="lk__block-wrapper lk__block-wrapper--mb30">
                        <p className="lk__text lk__text--uppercase lk__text--mb10">
                            В ротацию Вы выбрали промо-материалы:
                        </p>
                        {this.state.response.components.map((value, key) => {
                            return(
                                <div className="lk__row" key={key}>
                                    <div className="lk__col">
                                        <p className="lk__text lk__text--cut">
                                            {value.title}
                                        </p>
                                    </div>
                                    <div className="lk__col">
                                        <button data-title="Посмотреть" className="promo-block__icon promo-block__icon--eye" onClick={(() => {this._previewPromoMaterial(value)})}></button>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="lk__block-wrapper">
                        <p className="lk__text lk__text--mb10">
                            Код для вставки на сайт:
                        </p>
                        <textarea className="lk__textarea ui-textarea" name="name" id="rotation_code_result" rows="8" cols="40" defaultValue={text.toString()}></textarea>
                        <a href="#" className="lk__link lk__link--mt15 lk__link--mb30" onClick={((e) => {e.preventDefault(); copy(document.getElementById('rotation_code_result').value)})}>Скопировать в буфер
                        </a>
                        <div className="lk__text">
                            <p>1. Cкопируйте код для вставки на сайт.</p>
                            <p>{`2. Вставьте его в HTML-код страницы вашего сайта перед закрывающим тегом </body>.`}</p>
                            <p>3. В случае изменения параметров кода, его необходимо обновлять на вашем сайте.</p>
                        </div>
                    </div>
                    <div className="lk__block-wrapper lk__block-wrapper--mt35">
                        <Link className="ui-btn ui-btn_blue ui-btn_lg ui-btn--mr20" type="submit" to={"/promo/my"}>Мои промо-материалы</Link>
                        <Link className="ui-btn ui-btn_blue ui-btn_lg" type="submit" to={"/promo/rotation"}>Новая ротация</Link>
                    </div>
                </div>

            </div>
        )
    }

}
RotationPageResult.contextTypes = {
    router: React.PropTypes.object.isRequired
};
import React from 'react';
import ReactDOM       from 'react-dom';
import {Router, Link} from 'react-router';
import PromoMaterialsActions from '../actions/PromoMaterials';
import PromoMaterialsStore from '../stores/PromoMaterials';
import PopupSwitchPlace from './PopupSwitchPlace';
import PopupSwitchComponent from './PopupSwitchComponent';
import PopupEmbedCode from './PopupEmbedCode';
import PopupAddPlaceToArchive from './PopupAddPlaceToArchive';
import PopupAddComponentToArchive from './PopupAddComponentToArchive';
import PopupRemovePlaceFromArchive from './PopupRemovePlaceFromArchive';
import PopupRemoveComponentFromArchive from './PopupRemoveComponentFromArchive';
import ImageViewer from './ImageViewer';
import PopupEditCustomLink from './PopupEditCustomLink';

import Preloader from 'napishem-frontend-utils/modules/Preloader';


export class PromoMyMaterials extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {components: []}
    }

    componentDidMount() {
        PromoMaterialsStore.addChangeListener(this.__changeEvent);
        PromoMaterialsActions.getPartnerPromoLinks('active');
        PromoMaterialsActions.getPartnerComponentsList();
        Preloader.done();
    }

    componentWillUnmount() {
        PromoMaterialsStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(PromoMaterialsStore.getPartnerComponents());
        this.setState(PromoMaterialsStore.getPromoLinks());
    }

    _openAddLinkToArchiveDialog(e, link) {
        e.preventDefault();
        ReactDOM.render(<PopupAddPlaceToArchive name="popup_add_place_to_archive" type='link' title={link.link_title} place_id={link.id}/>, document.getElementById('popup_add_place_to_archive'));
    }

    _openEditLinkDialog(e, link) {
        e.preventDefault();
        ReactDOM.render(<PopupEditCustomLink name="popup_edit_custom_link" title={link.link_title} component_id={link.link_id} status={`active`}/>, document.getElementById('popup_edit_custom_link'));
    }

    _links() {
        if(this.state.links) {
            return this.state.links.map((link, key) => {
                return(
                    <div key={key} className="promo-block__row">
                        <div className="promo-block__col">
                            <div className="promo-block__text">
                                {link.link_title}: <span className="promo-block__text promo-block__text--gray">{`${$CFG.mirror_url}/?refid=${$CFG.user.id}&cid=${link.link_id}`}</span>
                            </div>
                        </div>
                        <div className="promo-block__col">
                            <div className="promo-block__icons">
                                <button data-title="Редактировать" data-titleactive="Редактировать" className="promo-block__icon promo-block__icon--edit" onClick={((e) => {this._openEditLinkDialog(e, link)}).bind(this)}></button>
                                <Link data-title="Статистика" className="promo-block__icon promo-block__icon--stat" to="/statistics/promo" query={{ by: link.id }}></Link>
                                <button data-title="Добавить в архив" className="promo-block__icon promo-block__icon--del" onClick={((e) => {this._openAddLinkToArchiveDialog(e, link)}).bind(this)}></button>
                            </div>
                        </div>
                    </div>
                )
            })
        }

    }

    render() {
       if(!this.state.components) {
           return null;
       }

        return(
            <div className="promo-block">
                <div id="popup_switch_place"></div>
                <div id="popup_embed_code"></div>
                <div id="popup_add_place_to_archive"></div>
                <div id="popup_edit_custom_link"></div>
                <div id="popup_add_component_to_archive"></div>
                <div id="popup_switch_component"></div>
                <div id="image_viewer"></div>
                <div className="promo-block__row promo-block__row--head">
                    <div className="promo-block__col">
                        <div className="promo-block__text promo-block__text--for-head">
                            промо-материалы
                        </div>
                    </div>
                    <div className="promo-block__col">
                        <div className="promo-block__text promo-block__text--for-head">
                            Управление
                        </div>
                    </div>
                </div>

                <div className="promo-block__row">
                    <div className="promo-block__col">
                        <div className="promo-block__text">
                            Реферальная ссылка: <span className="promo-block__text promo-block__text--gray">{`${$CFG.mirror_url}/?refid=${$CFG.user.id}`}</span>
                        </div>
                    </div>
                    <div className="promo-block__col">
                        <div className="promo-block__icons">
                            <Link data-title="Статистика" className="promo-block__icon promo-block__icon--stat" to="/statistics/promo" query={{ by: "referal" }}></Link>

                        </div>
                    </div>
                </div>

                {this._links()}

                {Object.keys(this.state.components).map((component, key) => {
                    return this.state.components[component][0].components_count == 1 ? <SinglePromoBlock key={key} components={this.state.components[component]} /> : <MultiplePromoBlock key={key} components={this.state.components[component]} />
                })}
            </div>
        )
    }

}

export class PromoBlock extends React.Component {

    _previewPromoMaterial(component) {
        if(component.type == 'banner') {
            return ReactDOM.render(<ImageViewer image_url={`/partner_template_images/${JSON.parse(component.preview_file).server_name}`} />, document.getElementById('image_viewer'));
        }
        window.open(`/preview/template/${component.template_id}`);
    }

    _openEmbedCodeDialog(e, id) {
        e.preventDefault();
        let place = {place: {id: id}};
        PromoMaterialsActions.setActiveComponentId(place);
        ReactDOM.render(<PopupEmbedCode name="popup_embed_code" />, document.getElementById('popup_embed_code'));
    }

    _openSwitchDialog(e) {
        e.stopPropagation();
        ReactDOM.render(<PopupSwitchPlace name="popup_switch_place" status={this.props.components[0].place_status} title={this.props.components[0].place_title} place_id={this.props.components[0].place_id}/>, document.getElementById('popup_switch_place'));
    }

    _openAddPlaceToArchiveDialog(e) {
        e.preventDefault();
        ReactDOM.render(<PopupAddPlaceToArchive name="popup_add_place_to_archive" title={this.props.components[0].place_title} place_id={this.props.components[0].place_id}/>, document.getElementById('popup_add_place_to_archive'));
    }

    _openRemovePlaceFromArchive(e) {
        e.preventDefault();
        e.stopPropagation();
        ReactDOM.render(<PopupRemovePlaceFromArchive name="popup_remove_place_from_archive" title={this.props.components[0].place_title} place_id={this.props.components[0].place_id}/>, document.getElementById('popup_remove_place_from_archive'));
    }

    _openRemoveComponentFromArchive(e, component) {
        e.preventDefault();
        e.stopPropagation();
        ReactDOM.render(<PopupRemoveComponentFromArchive name="popup_remove_component_from_archive" title={component.title} component_id={component.id}/>, document.getElementById('popup_remove_component_from_archive'));
    }

    _openSwitchComponentDialog(e, component) {
        e.preventDefault();
        e.stopPropagation();
        ReactDOM.render(<PopupSwitchComponent name="popup_switch_component" title={component.title} component_id={component.id} status={component.status}/>, document.getElementById('popup_switch_component'));
    }

    render() {}
}

export class SinglePromoBlock extends PromoBlock {

    render() {
        let active = this.props.components[0].place_status == 'ACTIVE' ? `promo-block__icon--active` : ``;

        return (
            <div className="promo-block__row-wrapper promo-block__row-wrapper--empty">
                <div className="promo-block__row">
                    <PlacePromoBlock title={this.props.components[0].place_title} />
                    <div className="promo-block__col">
                        <div className={`promo-block__icons`}>
                            <button data-title="Нажмите для включения" data-titleactive="Нажмите для отключения" className={`promo-block__icon promo-block__icon--play ${active}`} onClick={((e) => {this._openSwitchDialog(e)}).bind(this)}></button>
                            <Link data-title="Добавить" className="promo-block__icon promo-block__icon--add" to={`/promo/rotation/${this.props.components[0].place_id}/edit`}></Link>
                            <Link data-title="Статистика" className="promo-block__icon promo-block__icon--stat" to="/statistics/promo" query={{ by: this.props.components[0].place_id }}></Link>
                            <button data-title="Код для вставки на сайт" className="promo-block__icon promo-block__icon--div" onClick={((e) => {this._openEmbedCodeDialog(e, this.props.components[0].place_id)}).bind(this)}></button>
                            <button data-title="Посмотреть" className="promo-block__icon promo-block__icon--eye" onClick={(() => {this._previewPromoMaterial(this.props.components[0])}).bind(this)}></button>
                            <button data-title="Добавить в архив" className="promo-block__icon promo-block__icon--del" onClick={((e) => {this._openAddPlaceToArchiveDialog(e, this.props.components[0].id)}).bind(this)}></button>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export class MultiplePromoBlock extends PromoBlock {

    constructor(props) {

        super(props);

        this.state = {is_open: 0}
    }

    toggle(e) {
        e.preventDefault();
        this.setState({is_open: this.state.is_open ? 0 : 1});
    }

    _openAddComponentToArchiveDialog(e, component) {
        e.preventDefault();
        e.stopPropagation();
        ReactDOM.render(<PopupAddComponentToArchive name="popup_add_component_to_archive" title={component.title} component_id={component.id}/>, document.getElementById('popup_add_component_to_archive'));
    }

    render() {
        let css = this.state.is_open ? `promo-block__row-wrapper--open` : ``;
        let active = this.props.components[0].place_status == 'ACTIVE' ? `promo-block__icon--active` : ``;
        return (
            <div className={`promo-block__row-wrapper ${css}`} onClick={((e) => {this.toggle(e)}).bind(this)}>
                <div className="promo-block__row">

                    <PlacePromoBlock title={this.props.components[0].place_title} />

                    <div className="promo-block__col">
                        <div className="promo-block__icons">
                            <button data-title="Нажмите для включения" data-titleactive="Нажмите для отключения" className={`promo-block__icon promo-block__icon--play ${active}`} onClick={((e) => {this._openSwitchDialog(e)}).bind(this)}></button>
                            <Link data-title="Добавить" className="promo-block__icon promo-block__icon--add" to={`/promo/rotation/${this.props.components[0].place_id}/edit`}></Link>
                            <Link data-title="Статистика" className="promo-block__icon promo-block__icon--stat" to="/statistics/promo" query={{ by: this.props.components[0].place_id }}></Link>
                            <button data-title="Код для вставки на сайт" className="promo-block__icon promo-block__icon--div" onClick={((e) => {this._openEmbedCodeDialog(e, this.props.components[0].place_id)}).bind(this)}></button>
                            <button data-title="Добавить в архив" className="promo-block__icon promo-block__icon--del" onClick={((e) => {this._openAddPlaceToArchiveDialog(e, this.props.components[0].place_id)}).bind(this)}></button>
                        </div>
                    </div>

                </div>

                {this.props.components.map((component, key) => {
                    let active = component.status == 'ACTIVE' ? `promo-block__icon--active` : ``;
                    return (
                        <div className="promo-block__row promo-block__row--inserted" key={key} onClick={((e) => {e.stopPropagation()})}>
                            <div className="promo-block__col">
                                <div className="promo-block__text" title={component.title}>
                                    {component.title}
                                </div>
                            </div>
                            <div className={`promo-block__col`}>
                                <div className="promo-block__icons">
                                    <button data-title="Нажмите для включения" data-titleactive="Нажмите для отключения" className={`promo-block__icon promo-block__icon--play ${active}`} onClick={((e) => {this._openSwitchComponentDialog(e, component)}).bind(this)}></button>
                                    <button data-title="Посмотреть" className="promo-block__icon promo-block__icon--eye" onClick={(() => {this._previewPromoMaterial(component)})}></button>
                                    <button data-title="Добавить в архив" className="promo-block__icon promo-block__icon--del" onClick={((e) => {this._openAddComponentToArchiveDialog(e, component)})}></button>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }

}

export class PlacePromoBlock extends React.Component {

    render() {
        return (
            <div className="promo-block__col">
                <div className="promo-block__text" title={this.props.title}>
                    {this.props.title}
                </div>
            </div>
        )
    }
}
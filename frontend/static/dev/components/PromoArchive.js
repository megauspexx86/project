import React from 'react';
import ReactDOM       from 'react-dom';
import {Router, Link} from 'react-router';
import PromoMaterialsActions from '../actions/PromoMaterials';
import PromoMaterialsStore from '../stores/PromoMaterials';
import {MultiplePromoBlock, PlacePromoBlock, SinglePromoBlock} from './PromoMyMaterials';
import PopupRemovePlaceFromArchive from './PopupRemovePlaceFromArchive';


export class PromoArchive extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {components: []}
    }

    componentDidMount() {
        PromoMaterialsStore.addChangeListener(this.__changeEvent);
        PromoMaterialsActions.getPartnerPromoLinks('archive');
        PromoMaterialsActions.getPartnerArchivedComponentsList();
    }

    componentWillUnmount() {
        PromoMaterialsStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(PromoMaterialsStore.getPartnerArchivedComponents());
        this.setState(PromoMaterialsStore.getPromoLinks());
    }

    _openRemoveLinkFromArchive(e, link) {
        e.preventDefault();
        e.stopPropagation();
        ReactDOM.render(<PopupRemovePlaceFromArchive name="popup_remove_place_from_archive" type="link" title={link.link_title} place_id={link.id}/>, document.getElementById('popup_remove_place_from_archive'));
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
                                <button data-title="Восстановить" className="promo-block__icon promo-block__icon--restore" onClick={((e) => {this._openRemoveLinkFromArchive(e, link)}).bind(this)}>Восстановить</button>
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
                <div id="popup_remove_place_from_archive"></div>
                <div id="popup_edit_custom_link"></div>
                <div id="popup_remove_component_from_archive"></div>
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
                
                {this._links()}

                {Object.keys(this.state.components).map((component, key) => {
                    return this.state.components[component][0].components_count == 1 ? <SingleArchivePromoBlock key={key} components={this.state.components[component]} /> : <MultipleArchivePromoBlock key={key} components={this.state.components[component]} />
                })}
            </div>
        )
    }

}

class SingleArchivePromoBlock extends SinglePromoBlock {


    render() {
        let active = this.props.components[0].place_status == 'ACTIVE' ? `promo-block__icon--active` : ``;

        return (
            <div className="promo-block__row-wrapper promo-block__row-wrapper--empty">
                <div className="promo-block__row">
                    <PlacePromoBlock title={this.props.components[0].place_title} />
                    <div className="promo-block__col">
                        <div className={`promo-block__icons`}>
                            <button data-title="Посмотреть" className="promo-block__icon promo-block__icon--eye" onClick={(() => {this._previewPromoMaterial(this.props.components[0])})}></button>

                            <button data-title="Восстановить" className="promo-block__icon promo-block__icon--restore" onClick={((e) => {this._openRemovePlaceFromArchive(e)}).bind(this)}>Восстановить</button>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

class MultipleArchivePromoBlock extends MultiplePromoBlock {

    constructor(props) {

        super(props);

        this.state = {is_open: 0}
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
                            
                            <button data-title="Восстановить" className="promo-block__icon promo-block__icon--restore" onClick={((e) => {this._openRemovePlaceFromArchive(e)}).bind(this)}>Восстановить</button>
                        </div>
                    </div>

                </div>

                {this.props.components.map((component, key) => {
                    let active = component.place_status == 'ACTIVE' ? `promo-block__icon--active` : ``;
                    return (
                        <div className="promo-block__row promo-block__row--inserted" key={key} onClick={((e) => {e.stopPropagation()})}>
                            <div className="promo-block__col">
                                <div className="promo-block__text" title={component.title}>
                                    {component.title}
                                </div>
                            </div>
                            <div className={`promo-block__col`}>
                                <div className="promo-block__icons">
                                    <button data-title="Посмотреть" className="promo-block__icon promo-block__icon--eye" onClick={(() => {this._previewPromoMaterial(component)})}></button>
                                    <button data-title="Восстановить" className="promo-block__icon promo-block__icon--restore" onClick={((e) => {this._openRemoveComponentFromArchive(e, component)}).bind(this)}>Восстановить</button>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }

}
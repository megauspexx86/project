import React from 'react';
import _ from 'lodash';
import PromoMaterialsActions from '../actions/PromoMaterials';
import PromoFilterActions from '../actions/PromoFilter';
import PromoFilterStore from '../stores/PromoFilter';

export class PromoMaterialsFilter extends React.Component {

    componentDidMount() {
        let filter = this.props.default_type  ? {filter: {banners: this.props.default_type == 'banner' || this.props.default_type == 'all', forms: this.props.default_type == 'form' || this.props.default_type == 'all', shape: this.props.default_shape, size_width: this.props.default_width, size_height: this.props.default_height}} : null;
        if(filter) {
            setTimeout((() => {
                PromoFilterActions.setFilter(filter);
            }).bind(this), 0.0001);
        }
        PromoMaterialsActions.getPromoMaterialsForms(filter ? filter.filter : undefined);
    }

    render() {
        return(
            <div className="filter">
                <div className="banner-wrapper__title">{this.props.title}</div>
                {this.props.children}
            </div>
        )
    }

}


class FilterElement extends React.Component {

    constructor(props) {

        super(props);
        this.__changeEvent = this._onChange.bind(this);
        this.state = {filter: {shape: '', size_width:'', size_height: '', banners: true, forms: true}}
    }

    componentDidMount() {
        PromoFilterStore.addChangeListener(this.__changeEvent);
        PromoFilterActions.getFilterSizes(this.props.filter);
    }

    componentWillUnmount() {
        PromoFilterStore.removeChangeListener(this.__changeEvent);
    }

    _setFilterParam(param) {
        PromoFilterActions.setFilter({filter: _.merge(this.state.filter, param)});
    }

    _onChange() {
        this.setState(PromoFilterStore.getFilterSizes(this.props.filter));
        this.setState(PromoFilterStore.getFilters());
    }

    _setFilter(e) {
        e.preventDefault();
        PromoMaterialsActions.getPromoMaterialsForms(this.state.filter);
    }

    _resetFilters(e) {
        e.preventDefault();
        let filter = {filter: {shape: '', size_width:'', size_height: '', banners: true, forms: true}};
        PromoFilterActions.setFilter(filter);
        PromoFilterActions.getFilterSizes(this.props.filter);
        PromoMaterialsActions.getPromoMaterialsForms(filter.filter);
    }
}

export class FilterPromoType extends FilterElement {

    constructor(props) {

        super(props);
        this.__changeEvent = this._onChange.bind(this);
        this.state = {filter: {shape: '', size_width:'', size_height: '', banners: true, forms: true}}
    }

    componentDidMount() {
        PromoFilterStore.addChangeListener(this.__changeEvent);
        PromoFilterActions.getFilterSizes(this.props.filter);
    }


    render() {
        return(
            <div className="filter__row filter__row--mb40">
                <input type="checkbox" className="input__checkbox" id="banners" checked={this.state.filter.banners} onChange={((e) => {this._setFilterParam({banners: e.target.checked})})}/>
                <label htmlFor="banners" className="input__label">Баннеры</label>
                <input type="checkbox" className="input__checkbox" id="forms" checked={this.state.filter.forms} onChange={((e) => {this._setFilterParam({forms: e.target.checked})})} />
                <label htmlFor="forms" className="input__label">Формы заказов</label>
            </div>
        )
    }
}

export class FilterFormType extends FilterElement {

    _resetButton() {
        if(this.props.reset_button) {
            return <button className="ui-btn ui-btn_lg ui-btn--w170 ui-btn--blue-border" type="submit" onClick={((e) => {this._resetFilters(e)}).bind(this)}>Сбросить</button>
        }

    }

    render() {
        return(
            <div className="filter__row">
                <div className="filter__input-wrapper">
                    <label htmlFor="" className="filter__label">Форма</label>
                    <select className="ui-select payment-form__payment-type filter__select--w180" disabled={this.props.disabled} value={this.state.filter.shape} onChange={((e) => {this._setFilterParam({shape: e.target.value})})}>
                        <option value="">Все</option>
                        <option value="square">Квадратные</option>
                        <option value="horizontal">Горизонтальные</option>
                        <option value="vertical">Вертикальные</option>
                    </select>

                </div>
                {this._resetButton()}
            </div>
        )
    }
}

export class FilterSelectElements extends FilterElement {


    _setWidth(width) {
        PromoFilterActions.getFilterHeight(this.props.filter, width);
    }

    _setHeight(height) {
        PromoFilterActions.getFilterWidth(this.props.filter, height);
    }

    render() {
        if(!this.state.filter_width || !this.state.filter_height ) {
            return null;
        }
        return(
            <div className="filter__row">
                <div className="filter__input-wrapper">
                    <label htmlFor="" className="filter__label">Размер</label>
                    <div className="filter__select-wrapper">
                        <select className="ui-select payment-form__payment-type filter__select--w80" disabled={this.props.disabled} value={this.state.filter.size_width} name="" id="" onChange={((e) => {this._setWidth(e.target.value);this._setFilterParam({size_width: e.target.value})})}>
                            <option value=""></option>
                            {this.state.filter_width.map((value, key) => {
                                return <option key={key} value={value.size_width}>{value.size_width}</option>
                            })}
                        </select>
                    </div>
                    <div className="filter__select-wrapper">
                        <select className="ui-select payment-form__payment-type filter__select--w80" disabled={this.props.disabled} value={this.state.filter.size_height} name="" id="" onChange={((e) => {this._setHeight(e.target.value); this._setFilterParam({size_height: e.target.value})})}>
                            <option value=""></option>
                            {this.state.filter_height.map((value, key) => {
                                return <option key={key} value={value.size_height}>{value.size_height}</option>
                                //return <option disabled={this.state.filter.size_width && $CFG.form_sizes_available_height[this.state.filter.size_width].indexOf(value) < 0 ? 'disabled' : ''} key={key} value={value}>{value}</option>
                            })}
                        </select>
                    </div>
                </div>
                <button className="ui-btn ui-btn_blue ui-btn_lg ui-btn--w170" type="submit" onClick={((e) => {this._setFilter(e)}).bind(this)}>Показать</button>

            </div>
        )
    }
}



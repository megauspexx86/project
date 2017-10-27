import React from 'react';
import {Router, Link} from 'react-router';
import StatisticAction from '../actions/Statistic';
import StatisticStore from '../stores/Statistic';

import _ from 'lodash';

import DateTime from 'node-datetime';

import Preloader from 'napishem-frontend-utils/modules/Preloader';
import Pikaday from 'napishem-frontend-utils/modules/Pikaday';
import Request from 'napishem-frontend-utils/modules/Request';

import { StatisticTable, StatisticTableRow } from './StatisticTable';


class Filter extends React.Component {

    componentDidMount() {
        if(this.props.defaultComponent) {
            this.__loadReport();
        }
    }

    __loadReport() {

        this.__component_controller.classList.remove('error');

        if(this.__component_controller.value == "0") {
            this.__component_controller.classList.add('error');
            return false;
        }

        this.props.loadReport_cb(this.__component_controller.value, this.__period_f_controller.refs.pikaday.value, this.__period_t_controller.refs.pikaday.value);
    }

    render() {
        return (
            <div>
                <div className="period">
                    <div className="period__left">
                        <div className="period__text">Промоматериал:</div>
                        <div className="period__dates-wrapper">

                            <select ref={(element) => {this.__component_controller = element}} defaultValue={this.props.defaultComponent} className="ui-select" name="type">
                                <option value="0">Выберите</option>
                                <option value="referal">Реферальная ссылка</option>
                                {this.props.materials.map(((item, key) => {
                                    return (
                                        <option value={item.id} key={key}>{item.title}</option>
                                    );
                                }).bind(this))}
                            </select>
                        </div>
                    </div>
                    <div className="period__right">
                        <nav className="buttons-group buttons-group--row">
                            <button onClick={this.props.reset_cb} className="ui-btn ui-btn_lg ui-btn_min-w150 ui-btn--blue-border ui-btn--w100" type="submit">Сбросить</button>
                        </nav>
                    </div>
                </div>

                <div className="period">
                    <div className="period__left">
                        <div className="period__text">Период размещения:</div>

                        <div className="period__dates-wrapper">
                            <Pikaday ref={(element) => {this.__period_f_controller = element}} name="period_f" key={DateTime.create(this.props.period_f).now()} setDefaultDate={true} defaultDate={new Date(DateTime.create(this.props.period_f).now())} maxDate={new Date($CFG.timestamp * 1000)} {...Locale.calendar} className="ui-input ui-input_text ui-input_date ui-input_date--w170"  type="text"/>
                            <div className="period__dates period__dates--p-a">с</div>
                            <div className="period__dates">по</div>
                            <Pikaday ref={(element) => {this.__period_t_controller = element}} name="period_t" key={DateTime.create(this.props.period_t).now()} setDefaultDate={true} defaultDate={new Date(DateTime.create(this.props.period_t).now())} maxDate={new Date($CFG.timestamp * 1000)} {...Locale.calendar} className="ui-input ui-input_text ui-input_date ui-input_date--w170"  type="text"/>
                        </div>
                    </div>
                    <div className="period__right">
                        <nav className="buttons-group buttons-group--row">
                            <button onClick={this.__loadReport.bind(this)} className="cancel-order__decline ui-btn ui-btn_lg ui-btn_blue ui-btn_min-w150 ui-btn--w100" type="submit">Показать</button>
                        </nav>

                    </div>
                </div>

            </div>
        );
    }

}



class PromoReport extends React.Component {

    constructor(props) {

        super(props);

        this.state = {visibility: this.props.report.length < 2};
    }

    __total() {

        return (
            <StatisticTableRow report_orders={this.props.report.orders.total} visits={this.props.report.visits.total} registers={this.props.report.registers.total} total_css={true} />
        );
    }

    __detailsComponents() {

        let default_orders = {
            orders: 0,
            paid_cnt: 0,
            paid_sum: 0,
            completed_cnt: 0,
            completed_sum: 0,
            profit: 0,
            predict: 0
        };

        return this.props.components.map(((item, key) => {

            return (
                <div key={key}>

                    <div className="table__row table__row--subhead">
                        <div className="table__col-text">{item.title}</div>
                    </div>

                    <StatisticTableRow report_orders={this.props.report.orders[item.id] ? this.props.report.orders[item.id] : default_orders} visits={this.props.report.visits[item.id] ? this.props.report.visits[item.id].visits : 0} registers={this.props.report.registers[item.id] ? this.props.report.registers[item.id].registers : 0} />

                </div>

            );

        }).bind(this));

    }

    __details() {
        if((this.props.all_components_count) < 2) {
            return null;
        }

        return(
            <div>
                {this.__detailsComponents()}
            </div>
        )
    }

    __toggleVisibility() {
        this.setState({
            visibility: !this.state.visibility
        })
    }

    render() {

        if(!this.props.report) {
            return null;
        }

        let toggle = null;

        if((this.props.all_components_count) > 1) {

            let toggle_action = (
                <div onClick={this.__toggleVisibility.bind(this)} className="table__col-text table__col-text--vis">↓ Развернуть ↓</div>
            );

            if(this.state.visibility) {
                toggle_action = (
                    <div onClick={this.__toggleVisibility.bind(this)} className="table__col-text table__col-text--hide">↑ Свернуть ↑</div>
                );
            }

            toggle = (
                <div className="table__row table__row--toggle">
                    {toggle_action}
                </div>
            );
        }

        return (
            <StatisticTable visibility={this.state.visibility}>

                <div className="table__row table__row--title">
                    <p className="table__row-text">{this.props.place.title}</p>
                    <p className="table__row-text">Период размещения: {this.props.period_f} - {this.props.period_t}</p>
                </div>

                {this.__total()}
                {this.__details()}

                {toggle}

            </StatisticTable>
        );
    }

}

class DirectLinkReport extends React.Component {

    render() {

        if(!this.props.report) {
            return null;
        }

        return (
            <StatisticTable>

                <div className="table__row table__row--title">
                    <p className="table__row-text">Реферальная ссылка</p>
                    <p className="table__row-text">Период размещения: {this.props.period_f} - {this.props.period_t}</p>
                </div>

                <StatisticTableRow report_orders={this.props.report.orders} visits={this.props.report.visits} registers={this.props.report.registers} total_css={true} />

            </StatisticTable>
        );

    }

}

/**
 * Данный модуль не использует стандартную модель FLUX и самостоятельно меняет себе state
 */

class PromoReportBlock extends React.Component {

    constructor(props) {

        super(props);

        this.state = this.__defaultState();
    }

    /**
     * State по умолчанию
     * @returns {{report: null, place: null, period_f: null, period_t: null}}
     * @private
     */
    __defaultState() {
        return {
            report: null, place: null, period_f: this.props.period_f, period_t: this.props.period_t, __key: Math.random(), orders_statistic: null, visits_statistic: null, registers_statistic: null
        };
    }

    /**
     * Загрузка отчета реферальной ссылки и изменение state
     * @param period_f
     * @param period_t
     * @private
     */
    __directLinkReport(period_f, period_t) {
        this.__request('/json/report/link', {period_f: period_f, period_t: period_t});
    }


    /**
     * Загрузка отчета промоматериалов и изменение state
     *
     * @param pid
     * @param period_f
     * @param period_t
     * @private
     */
    __promoReport(pid, period_f, period_t) {
        this.__request('/json/report/promo', {pid: pid, period_f: period_f, period_t: period_t});
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

        for(let name in options) {
            data.append(name, options[name]);
        }

        r.send(((response) => {
            this.setState(_.merge({place: null}, response));
            this.props.onBuildReport_cb(true);
        }).bind(this), data);
    }

    /**
     * Загрузка отчета и изменение state
     * @param pid
     * @param period_f
     * @param period_t
     */
    loadReport(pid, period_f, period_t) {
        this.setState({period_f: period_f, period_t: period_t});

        if(pid == "referal") {
            return this.__directLinkReport(period_f, period_t);
        }

        return this.__promoReport(pid, period_f, period_t)

    }

    /**
     * Сброс формы
     */
    reset() {
        this.setState(this.__defaultState());
        this.props.onBuildReport_cb(false);
        this.context.router.push(this.props.location.pathname);
    }

    render() {
        let report = null;

        if(this.state.orders_statistic) {
            report = <DirectLinkReport period_f={this.state.period_f} period_t={this.state.period_t} report={{orders: this.state.orders_statistic.total, visits: this.state.visits_statistic.total, registers: this.state.registers_statistic.total}} />;
        }


        if(this.state.place) {
            report = <PromoReport all_components_count={this.state.all_components_count} period_f={this.state.period_f} period_t={this.state.period_t} place={this.state.place} components={this.state.components} report={{orders: this.state.orders_statistic, visits: this.state.visits_statistic, registers: this.state.registers_statistic}} />
        }

        return (
            <div className="stat" key={this.state.__key}>

                <Filter materials={this.props.materials} reset_cb={this.reset.bind(this)} loadReport_cb={this.loadReport.bind(this)} period_f={this.props.period_f} period_t={this.props.period_t} defaultComponent={!this.props.empty && this.props.location.query.by ? this.props.location.query.by : ''}/>

                {report}

            </div>
        );
    }

}

PromoReportBlock.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default class StatisticPromoList extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {data: null, length: 1, button: false};
    }

    componentDidMount() {
        StatisticStore.addChangeListener(this.__changeEvent);
        StatisticAction.loadPromoData();
        Preloader.done();
    }

    componentWillUnmount() {
        StatisticStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(StatisticStore.getPromoData());
    }

    __elements() {

        let list = [];

        for(let i = 0; i < this.state.length; i++) {
            list.push(<PromoReportBlock empty={i != 0} onBuildReport_cb={this.button.bind(this)} materials={this.state.data} period_f={this.state.period_f} period_t={this.state.period_t} key={i} location={this.props.location} />);
        }

        return list;
    }

    /**
     * Выставляет "видимость" кнопки Добавить еще
     * @param value
     */
    button(value) {

        value = this.state.length > 1 ? true : value;

        this.setState({button: value});
    }

    __add() {
        this.setState({length: this.state.length + 1});
    }

    render() {

        if(!this.state.data) {
            return null;
        }


        let button = null;
        if(this.state.button) {
            button = <button onClick={this.__add.bind(this)} className="cancel-order__decline ui-btn ui-btn_lg ui-btn_blue ui-btn--add ui-btn--ml-mb-20" type="submit">Добавить еще</button>;
        }

        return (

            <div>

                {this.__elements()}

                {button}

            </div>
        );
    }

}

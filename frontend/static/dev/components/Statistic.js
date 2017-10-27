import React from 'react';
import BlockTabs from '../../../../account/static/frontend/common/components/BlockTabs';

import StatisticAction from '../actions/Statistic';
import StatisticStore from '../stores/Statistic';

import DateTime from 'node-datetime';

import Preloader from 'napishem-frontend-utils/modules/Preloader';

import Pikaday from 'napishem-frontend-utils/modules/Pikaday';

import { StatisticTable, StatisticTableRow } from './StatisticTable';

let __tabs_menu = [
    {"title": "Общая", href: "/statistics/main"},
    {"title": "По промо-материалам", href: "/statistics/promo"}
    // ,
    // {"title": "По архивным промо-материалам", href: "/statistics/archive"},
    // {"title": "По заказам", href: "/statistics/orders"}
];

export class BaseStatistics extends React.Component {

    render() {

        var title = this.props.children ? this.props.children.props.route.title : this.props.route.title;

        return (
            <div className="page">
                <div className="inner">
                    <div className="grid page__head">
                        <div className="grid__item desk--three-twelfths hidden-portable"></div>
                        <div className="grid__item desk--nine-twelfths hidden-portable">
                            <p className="page__head__title" title={title}>{title}</p>
                        </div>
                    </div>
                    <div className="grid content">

                        <div className="grid__item desk--twelfths content__main content__main--pr0 my-discount">
                            <BlockTabs title={title} menu={__tabs_menu} pathname={this.props.location.pathname}>
                                {this.props.children}
                            </BlockTabs>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


class StatisticFilter extends React.Component {

    _applyFilter() {
        StatisticAction.loadCommonReport({
            period_f: this.period_f.refs.pikaday.value,
            period_t: this.period_t.refs.pikaday.value,
        });
    }

    _reset() {
        StatisticAction.loadCommonReport({
            period_f: this.props.default_f,
            period_t: this.props.default_t,
        });
    }

    render() {

        return (
            <div className="period">
                <div className="period__left">
                    <div className="period__text">Период размещения:</div>
                    <div className="period__dates-wrapper">
                        <div className="period__dates">с</div>
                        <Pikaday name="period_f" ref={(component) => {this.period_f = component}} key={Math.random()} setDefaultDate={true} defaultDate={new Date(DateTime.create(this.props.start).now())} maxDate={new Date($CFG.timestamp * 1000)} {...Locale.calendar} className="ui-input ui-input_text ui-input_date ui-input_date--w170"  type="text"/>
                        <div className="period__dates">по</div>
                        <Pikaday name="period_t" ref={(component) => {this.period_t = component}} key={Math.random()} setDefaultDate={true} defaultDate={new Date(DateTime.create(this.props.end).now())} maxDate={new Date($CFG.timestamp * 1000)} {...Locale.calendar} className="ui-input ui-input_text ui-input_date ui-input_date--w170"  type="text"/>

                    </div>
                </div>
                <div className="period__right">
                    <nav className="buttons-group buttons-group--row">
                        <button className="cancel-order__decline ui-btn ui-btn_lg ui-btn_blue ui-btn_min-w150" type="submit" onClick={this._applyFilter.bind(this)}>Показать</button>
                        <button className="ui-btn ui-btn_lg ui-btn_min-w150 ui-btn--blue-border" onClick={this._reset.bind(this)} type="submit">Сбросить</button>
                    </nav>
                </div>
            </div>
        );
    }

}


export class MainStatistics extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {report: null};

    }

    componentDidMount() {
        StatisticStore.addChangeListener(this.__changeEvent);
        StatisticAction.loadCommonReport();
        Preloader.done();
    }

    componentWillUnmount() {
        StatisticStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(StatisticStore.getReport());
    }

    render() {

        if(!this.state.orders_statistic) {
            return null;
        }

        return(
            <div className="stat">

                <StatisticFilter default_f={this.state.default_f} default_t={this.state.default_t} start={this.state.period_f} end={this.state.period_t} />

                <StatisticTable>
                    <StatisticTableRow report_orders={this.state.orders_statistic.total} visits={this.state.visits_statistic.total} registers={this.state.registers_statistic.total} total_css={true} />
                </StatisticTable>
            </div>
        )
    }
}
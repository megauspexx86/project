import React from 'react';

import NumberFormat from 'napishem-frontend-utils/modules/NumberFormat';

export class StatisticTable extends React.Component {

    render() {

        let className = "table";

        if(this.props.visibility === false) {
            className = "table table--hidden";
        }

        return (
            <div className={className}>

                <div className="table__row table__row--head">
                    <div className="table__col">
                        <div className="table__col-text">Переходы</div>
                    </div>
                    <div className="table__col">
                        <div className="table__col-text">Регистрации</div>
                    </div>
                    <div className="table__col">
                        <div className="table__col-text">Оформлено заказов</div>
                    </div>
                    <div className="table__col">
                        <div className="table__col-text">Оплачено заказов</div>
                    </div>
                    <div className="table__col">
                        <div className="table__col-text">Сумма оплаченных заказов</div>
                    </div>
                    <div className="table__col">
                        <div className="table__col-text">Завершено заказов</div>
                    </div>
                    <div className="table__col">
                        <div className="table__col-text">Сумма завершенных заказов</div>
                    </div>
                    <div className="table__col">
                        <div className="table__col-text">Начисления по заказам</div>
                    </div>
                    <div className="table__col">
                        <div className="table__col-text">Прогноз начислений</div>
                    </div>
                </div>

                {this.props.children}

            </div>
        );

    }

}

export class StatisticTableRow extends React.Component {

    render() {

        return (
            <div className={`table__row` + (this.props.total_css ? ` table__row--bold` : ``)}>
                <div className="table__col">
                    <div className="table__col-text">{this.props.visits}</div>
                </div>
                <div className="table__col">
                    <div className="table__col-text">{this.props.registers}</div>
                </div>
                <div className="table__col">
                    <div className="table__col-text">{this.props.report_orders.orders}</div>
                </div>
                <div className="table__col">
                    <div className="table__col-text">{this.props.report_orders.paid_cnt}</div>
                </div>
                <div className="table__col">
                    <div className="table__col-text">{NumberFormat(this.props.report_orders.paid_sum, 0, '', ' ')} <span>р.</span></div>
                </div>
                <div className="table__col">
                    <div className="table__col-text">{this.props.report_orders.completed_cnt}</div>
                </div>
                <div className="table__col">
                    <div className="table__col-text">{NumberFormat(this.props.report_orders.completed_sum, 0, '', ' ')} <span>р.</span></div>
                </div>
                <div className="table__col">
                    <div className="table__col-text">{NumberFormat(this.props.report_orders.profit, 0, '', ' ')} <span>р.</span></div>
                </div>
                <div className="table__col">
                    <div className="table__col-text">{NumberFormat(this.props.report_orders.predict, 0, '', ' ')} <span>р.</span></div>
                </div>
            </div>
        );
    }
}

import React from 'react';
import Division from '../../../../account/static/frontend/common/components/Division';

let __bill_menu = [
    {"title": "Вывод средств", href: "/bill/outdraw"},
    {"title": "История операций", href: "/bill/history"}
];

if($CFG.user.role == 2) {
    __bill_menu = [
        {"title": "История операций", href: "/bill/history"}
    ];
}


export class BaseBill extends React.Component {

    render() {

        var title = this.props.children ? this.props.children.props.route.title : this.props.route.title;

        return (
            <Division title={title} menu={__bill_menu} pathname={this.props.location.pathname} custom_css={this.props.location.pathname.indexOf("/bill/history") != -1 ? "grid__item--p0 private-history" : "refill"}>
                {this.props.children}
            </Division>
        );
    }
}


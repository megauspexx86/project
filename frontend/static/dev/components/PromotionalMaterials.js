import React from 'react';
import Division from '../../../../account/static/frontend/common/components/Division';
import BlockTabs from '../../../../account/static/frontend/common/components/BlockTabs';
import Preloader from 'napishem-frontend-utils/modules/Preloader';

let __promo_menu = [
    {"title": "Мои промо-материалы", href: "/promo/my"},
    {"title": "Все промо-материалы", href: "/promo/all/link", base_href: "/promo/all"},
    {"title": "Ротация", href: "/promo/rotation"},
    {"title": "Архив промо-материалов", href: "/promo/archive"}
];

if($CFG.wl) {
    __promo_menu.push({"title": "White Label", href: "/promo/whitelabel/create", base_href: "/promo/whitelabel"});
}

let __tabs_menu = [
    {"title": "Ссылка", href: "/promo/all/link"},
    {"title": "Баннеры", href: "/promo/all/banners"},
    {"title": "Формы заказа", href: "/promo/all/forms"}
];

let __whtelabel_tabs_menu = [
    {"title": "Создание White Label", href: "/promo/whitelabel/create"},
    {"title": "Мои White Label", href: "/promo/whitelabel/list"}
];

export class BasePromo extends React.Component {

    render() {

        var title = this.props.children ? this.props.children.props.route.title : this.props.route.title;

        return (
            <Division title={title} menu={__promo_menu} pathname={this.props.location.pathname}>
                {this.props.children}
            </Division>
        );
    }
}

export class BasePromoAllMaterials extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {}
    }

    componentDidMount() {
        Preloader.done();
    }

    componentWillUnmount() {

    }

    _onChange() {

    }

    render() {
        var title = this.props.children ? this.props.children.props.route.title : this.props.route.title;

        return (
                <BlockTabs title={title} menu={__tabs_menu} pathname={this.props.location.pathname}>
                    {this.props.children}
                </BlockTabs>
        )
    }
}

export class BaseWhiteLabel extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {}
    }

    componentDidMount() {
        Preloader.done();
    }

    componentWillUnmount() {

    }

    _onChange() {

    }

    render() {
        var title = this.props.children ? this.props.children.props.route.title : this.props.route.title;

        return (
            <BlockTabs title={title} menu={__whtelabel_tabs_menu} pathname={this.props.location.pathname}>
                {this.props.children}
            </BlockTabs>
        )
    }
}
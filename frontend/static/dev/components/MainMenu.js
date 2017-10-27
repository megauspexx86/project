import React from 'react';

import { Router, Route, Link } from 'react-router';
import NumberFormat from 'napishem-frontend-utils/modules/NumberFormat';
import MainMenuActions from '../../../../account/static/frontend/common/actions/MainMenu';
import MainMenuStore from '../../../../account/static/frontend/common/stores/MainMenu';

class MenuItemSupport extends React.Component {

    render() {
        return (
            <div className="header__staff">
                <div>
                    <img className="header__staff__photo" src='/assets/images/partner_manager.jpg' />
                    <div className="header__staff__info">
                        <span className="header__staff__name">НАДЕЖДА</span>
                        <span className="header__staff__small">Ваш менеджер</span>
                    </div>
                </div>
                <div className="header__staff__dropdown">
                    <section className="header__staff__section">
                        <p className="header__staff__tel">8-800-500-28-49, вн. 701</p>
                        <p><a className="email" href={'mailto:nadezhda.s@napishem.com'}>nadezhda.s@napishem.com</a></p>
                        <p className="header__staff__work-time">Время работы менеджера:
                            <strong>Будни с 9:00 до 18:00 (МСК)</strong>
                        </p>
                    </section>
                    <section className="header__staff__section">
                        <p>Служба поддержки сервиса</p>
                        <p className="header__staff__tel">8-800-500-28-49</p>
                        <p><a className="email" href={`mailto: help@napishem.com`}>help@napishem.com</a></p>
                        <p className="header__staff__work-time">Время работы:
                            <strong>Ежедневно с 8:00 до 00:00 (МСК)</strong>
                        </p>
                        <p>звонок бесплатный для РФ</p>

                    </section>
                </div>
            </div>
        );
    }
}

class MenuItemMyBill extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        MainMenuActions.getUserBill();
        MainMenuStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        MainMenuStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        this.setState(MainMenuStore.userBill());
    }

    render() {
        if(!this.state.cash) {
            return null;
        }

        return (
        <div className="header__menu__item header__menu__item--dropdown">
            <div className="header__menu__item__dropdown">
                        <span className="header__menu__item__link header__bill">
                            {this.props.title}
                            <span className="header__menu__item__link__id">{NumberFormat(this.state.cash.cash, 0, '',' ')} {`руб.`}</span>
                        </span>
                <div className="dropdown__menu dropdown__menu--right">
                    {this.props.children}
                </div>
            </div>
        </div>
        );
    }
}

class MenuItemDropdown extends React.Component {

    render() {

        return (
            <div className="header__menu__item header__menu__item--dropdown">
                <div className="header__menu__item__dropdown">
                    <span className="header__menu__item__link">{this.props.title}</span>
                    <div className="dropdown__menu dropdown__menu--right">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

class MenuDropDownElement extends React.Component {

    render() {
        return (
            <div className="dropdown__menu__item">
                <Link className="dropdown__menu__item__link dropdown__menu__item__link--nowrap" to={this.props.href}>{this.props.title}</Link>
            </div>
        );
    }

}

class MainMenu extends React.Component {

    _withdrawMenu() {
        if($CFG.user.role == 2) {
            return null;
        }
        return(
            <MenuDropDownElement title="Вывод средств" href="/bill/outdraw"/>
        )
    }

    _whiteLabel() {
        if($CFG.wl) {
            return <MenuDropDownElement title="White Label" href="/promo/whitelabel/create"/>
        }
    }

    render() {

        let account_title = "Кабинет автора";
        let account_url = `${$CFG.account_url}/avtor/zakazy.html`;
        if($CFG.user.role == "1") {
            account_title = "Кабинет заказчика";
            account_url = `${$CFG.account_url}/zakazchik/zakazy.html`;
            if(parseInt($CFG.user.agent) > 0) {
                account_title = "Кабинет агентства";
            }
        }

        return (
            <div className="inner">
                <span className="header__logo logo"></span>
                <MenuItemSupport />
                <MenuItemDropdown title="Промо-материалы">
                    <MenuDropDownElement title="Мои промо-материалы" href="/promo/my"/>
                    <MenuDropDownElement title="Все промо-материалы" href="/promo/all/link"/>
                    <MenuDropDownElement title="Ротация" href="/promo/rotation"/>
                    <MenuDropDownElement title="Архив промо-материалов" href="/promo/archive"/>
                    {this._whiteLabel()}
                </MenuItemDropdown>

                <MenuItemDropdown title="Статистика">
                    <MenuDropDownElement title="Общая" href="/statistics/main"/>
                    <MenuDropDownElement title="По промо-материалам" href="/statistics/promo"/>
                    {/*<MenuDropDownElement title="По архивным промо-материалам" href="/statistics/archive"/>*/}
                    {/*<MenuDropDownElement title="По заказам" href="/statistics/orders"/>*/}
                </MenuItemDropdown>

                <MenuItemMyBill title="Мой счет">
                    {this._withdrawMenu()}
                    <MenuDropDownElement title="История операций" href="/bill/history"/>
                </MenuItemMyBill>

                <MenuItemDropdown title="Помощь">
                    <MenuDropDownElement title="Правила" href="/help/rules"/>
                    <MenuDropDownElement title="FAQ" href="/help/faq"/>
                    <MenuDropDownElement title="Оферта" href="/help/offer"/>
                    <MenuDropDownElement title="Партнерская программа" href="/help/program" />
                </MenuItemDropdown>

                <div className="header__menu__item header__menu__item--dropdown">
                    <div className="header__menu__item__dropdown">
                        <span className="header__menu__item__link header__username">
                            <span dangerouslySetInnerHTML={{__html: $CFG.user.name}}></span>
                            <span className="header__menu__item__link__id">Ваш id {$CFG.user.id}</span>
                        </span>
                        <div className="dropdown__menu dropdown__menu--left">
                            <MenuDropDownElement title="Профиль" href="/profile"/>
                            <div className="dropdown__menu__item">
                                <a className="dropdown__menu__item__link dropdown__menu__item__link--nowrap" href={account_url}>{account_title}</a>
                            </div>
                            <div className="dropdown__menu__item">
                                <a className="dropdown__menu__item__link dropdown__menu__item__link--nowrap" href="/logout">Выход</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainMenu;
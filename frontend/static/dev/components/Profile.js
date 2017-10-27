import React from 'react';
import Division from '../../../../account/static/frontend/common/components/Division';
import Form from '../../../../account/static/frontend/common/components/Form';


import Preloader from 'napishem-frontend-utils/modules/Preloader';
import Declension from 'napishem-frontend-utils/modules/Declension';

import ProfileActions from '../actions/Profile';
import ProfileStore from '../stores/Profile';

let __profile_menu = [
    {"title": "Ваши данные", href: "/profile"},
    {"title": "Настройки заработка", href: "/private/reward"},
    {"title": "Уведомления", href: "/private/notifications"},
    {"title": "Сменить пароль", href: "/private/password"}
];

export class BaseProfile extends React.Component {

    render() {

        var title = this.props.children ? this.props.children.props.route.title : this.props.route.title;

        return (
            <Division title={title} menu={__profile_menu} pathname={this.props.location.pathname}>
                {this.props.children}
            </Division>
        );
    }
}

export class ProfileReward extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {settings: null};

    }

    componentDidMount() {
        ProfileStore.addChangeListener(this.__changeEvent);
        ProfileActions.getRewardSettings();
        Preloader.done();
    }

    componentWillUnmount() {
        ProfileStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(ProfileStore.getRewardSettings());
    }

    render() {

        if(!this.state.settings) {
            return null;
        }

        return (
            <div className="content__main__body my-discount__body desk--eleven-twelfths">
                <div className="promo-block">
                    <div className="pay-settings">
                        <div className="pay-settings__row">
                            <div className="pay-settings__col">
                                Вознаграждение за 1-й заказ:
                            </div>
                            <div className="pay-settings__col">
                                <span>{this.state.settings.settings_first_order}</span>&nbsp; %
                            </div>
                        </div>
                        <div className="pay-settings__row">
                            <div className="pay-settings__col">
                                Вознаграждение за ребиллы:
                            </div>
                            <div className="pay-settings__col">
                                <span>{this.state.settings.settings_rebill}</span>&nbsp; %
                            </div>
                        </div>
                        <div className="pay-settings__row">
                            <div className="pay-settings__col">
                                Срок ребиллов:
                            </div>
                            <div className="pay-settings__col">
                                <span>{this.state.settings.settings_ttl}</span>&nbsp;{Declension.noun(this.state.settings.settings_ttl, 'месяц', 'месяца', 'месяцев')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Настройки уведомлений партнера
 */
export class ProfileNotifications extends React.Component {


    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

       this.state = {user: null, errors: {}};

    }

    componentDidMount() {
        ProfileStore.addChangeListener(this.__changeEvent);
        ProfileActions.getUserData();

        Preloader.done();
    }

    componentWillUnmount() {
        ProfileStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(ProfileStore.getUserData());
    }

    render() {

        if(!this.state.user) {
            return null;
        }

        return (
            <div className="content__main__body">
                <Form action="/json/private/notification/save" className="private-notification-form grid" method="post" callback={((response) => {this._response(response)})} error_cb={((response) => {console.log('ERROR')})} >

                    <div className="grid__item desk--six-twelfths">
                        <div className="private-notification-form__line">
                            <input id="notification-4" name="subs_new_sms" type="checkbox" defaultChecked={parseInt(this.state.user.subs_new_sms)} value="1"/>
                            <label htmlFor="notification-4">SMS</label>
                        </div>
                        <div className="private-notification-form__line">
                            <input id="notification-5" name="subs_news_napishem" type="checkbox" defaultChecked={parseInt(this.state.user.subs_news_napishem)} value="1"/>
                            <label htmlFor="notification-5">Новости сайта</label>
                        </div>
                    </div>

                    <nav className="private-notification-form__controls">
                        <button className="ui-btn ui-btn_lg ui-btn_blue" type="submit">Сохранить изменения</button>
                    </nav>

                    <input type="hidden" name="subs_new_messages" defaultValue={parseInt(this.state.user.subs_new_messages)} />
                    <input type="hidden" name="subs_new_orders" defaultValue={parseInt(this.state.user.subs_new_orders)} />
                    <input type="hidden" name="subs_orders_status" defaultValue={parseInt(this.state.user.subs_orders_status)} />

                </Form>
            </div>
        );
    }

    /**
     * не даем никакого ответа
     * @param response
     * @returns {boolean}
     * @private
     */
    _response(response) {
        return false;
    }
}
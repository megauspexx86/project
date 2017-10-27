import React from 'react';

import  MainMenu from './MainMenu';
import ProfileActions from '../actions/Profile';
import ProfileStore from '../stores/Profile';
import i18nModule from 'napishem-frontend-utils/modules/i18n';
var i18n = i18nModule.getInstance().get;

class Application extends React.Component {
    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {};
    }

    componentDidMount() {
        var src = require('../../../../account/static/frontend/locale/ru_RU.js');
        i18nModule.getInstance().setLocale(src);
        ProfileActions.getUserAbility();
        ProfileStore.addChangeListener(this.__changeEvent);
    }

    componentWillUnmount() {
        ProfileStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(ProfileStore.getUserAbility);
    }


    _blockComponent() {

        if(this.state.user_blocking.bet_ability != 1) {
            return (
                <div className="header__alert">
                    <div className="header__alert-message">{i18n('blocking_text', parseInt(this.state.user_blocking.blocking_reason))}.</div>
                </div>
            )
        }
    }

    render() {
        if(!this.state.user_blocking) {
            return null;
        }

        return (
            <div className="layout__inner">
                <div className="layout__main">
                    <div className="header">
                        {this._blockComponent()}
                       <MainMenu/>
                    </div>

                    {this.props.children}

                </div>
            </div>

        );
    }
}

export default Application;
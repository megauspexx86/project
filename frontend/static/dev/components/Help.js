import React from 'react';
import Division from '../../../../account/static/frontend/common/components/Division';
import {Collapse} from '../../../../account/static/frontend/common/components/Collapse';
import HelpActions from '../actions/Help';
import HelpStore from '../stores/Help';

import Preloader from 'napishem-frontend-utils/modules/Preloader';

let __help_menu = [
    {"title": "Правила", href: "/help/rules"},
    {"title": "FAQ", href: "/help/faq"},
    {"title": "Оферта", href: "/help/offer"},
    {"title": "Партнёрская программа", href: "/help/program"}
];

export class BaseHelp extends React.Component {

    render() {

        var title = this.props.children ? this.props.children.props.route.title : this.props.route.title;

        return (
            <Division title={title} menu={__help_menu} pathname={this.props.location.pathname}>
                {this.props.children}
            </Division>
        );
    }
}

export class HelpFaq extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {faq_list: ''}
    }

    componentDidMount() {
        HelpStore.addChangeListener(this.__changeEvent);
        HelpActions.getHelpFaqList();

        Preloader.done();
    }

    componentWillUnmount() {
        HelpStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(HelpStore.getHelpFaqList());
    }

    render() {
        if(!this.state.faq_list) {
            return null;
        }
        return (
                <div className="content__main__body">
                    <div className="order__help">
                        {this.state.faq_list.map(((el, key) => {
                            return (
                                <Collapse key={key} title={el.question}
                                          text={el.answer}
                                />
                            )
                        }))}
                    </div>
                </div>
        )
    }
}
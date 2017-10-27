import React from 'react';
import {Router, Link} from 'react-router';
import PromoMaterialsActions from '../actions/PromoMaterials';
import PromoMaterialsStore from '../stores/PromoMaterials';
import Form from '../../../../account/static/frontend/common/components/Form';
import FileUploader from '../../../../account/static/frontend/common/components/FileUploader';


class PromoWhiteLabelElement extends React.Component {

    render() {

        return (
            <div className="promo-block__wl-row">
                <div className="promo-block__wl-col promo-block__wl-col_mw">
                    <p className="promo-block__wl-name">{this.props.wl.title}</p>
                    <div className="promo-block__wl-text">
                        Домен: <span className="promo-block__wl-domen">{this.props.wl.host}</span>
                    </div>
                </div>
                <div className="promo-block__wl-col">
                    {/*<button data-title="Редактировать" data-titleactive="Редактировать" className="promo-block__icon promo-block__icon--edit"></button>*/}
                </div>
            </div>
        );
    }

}

export class PromoWhiteLabelCreate extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {error: {}}
    }

    componentDidMount() {
        PromoMaterialsStore.addChangeListener(this.__changeEvent);
    }

    componentWillUnmount() {
        PromoMaterialsStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {

    }

    _response(response) {

        if(response.status == "OK") {
            return this.context.router.push(`/promo/whitelabel/list`);
        }

    }

    _error(response) {
        this.setState({error: response.fields});
    }

    render() {

        return (
            <div className="promo-block__column promo-block__column_wl">
                <div className="promo-block__wl-description">
                    White Label – вид партнерского сотрудничества, при котором Партнер использует функционал (личный кабинет реферала), разработанный Напишем, под своим брендом.
                    <Link to="/help/wl" className="promo-block__wl-description-button">Подробнее...</Link>
                </div>

                <Form action="/json/wl/create" className="promo-block__wl-form" callback={((response) => {this._response(response)})} error_cb={((response) => {this._error(response)}).bind(this)}>

                    <div className="promo-block__wl-form-row">
                        <label className="promo-block__wl-form-label">Имя White Label:<sup>*</sup></label>
                        <div className="promo-block__wl-input-wrapper">
                            <input type="text" className={`ui-input ui-input_text ${this.state.error && this.state.error.title ? `error` : ``}`} name="title" />
                        </div>
                    </div>


                    <div className="promo-block__wl-form-row">
                        <label className="promo-block__wl-form-label">Поддомен:<sup>*</sup></label>
                        <div className="promo-block__wl-input-wrapper">
                            <input type="text" className={`ui-input ui-input_text ${this.state.error && this.state.error.host ? `error` : ``}`} placeholder="например account.yourdomain.com" name="host" />
                                <p className="promo-block__wl-input-caption">
                                    Укажите поддомен для White Label без https:// и http://
                                </p>
                        </div>
                    </div>

                    <div className="promo-block__wl-form-row">
                        <label className="promo-block__wl-form-label">Название сайта:<sup>*</sup></label>
                        <div className="promo-block__wl-input-wrapper">
                            <input type="text" className={`ui-input ui-input_text ${this.state.error && this.state.error.site_name ? `error` : ``}`} name="site_name" />
                                <p className="promo-block__wl-input-caption">
                                    Укажите название сайта, на котором будет размещен White Label.
                                </p>
                        </div>
                    </div>

                    <div className="promo-block__wl-form-row">
                        <label className="promo-block__wl-form-label">E-mail:<sup>*</sup></label>
                        <div className="promo-block__wl-input-wrapper">
                            <input type="text" className={`ui-input ui-input_text ${this.state.error && this.state.error.email ? `error` : ``}`} name="email" />
                                <p className="promo-block__wl-input-caption">
                                    Укажите существующий e-mail. Данный e-mail будет выступать в качестве отправителя писем рефералам.
                                    <Link to="/help/white_label" className="promo-block__wl-caption-button">Подробнее...</Link>
                                </p>
                        </div>
                    </div>
                    
                    <div className="exam-tab__form-line files-list">
                        <label htmlFor="exam-file">Логотип:<sup>*</sup></label>
                        <FileUploader validate={false} key={1231} hint="Можно загрузить файл формата svg или png" error={this.state.error && this.state.error.logo} name='logo' url={'/json/wl/upload'} form_name={'logo'} single={true}/>
                    </div>

                    <div className="exam-tab__form-line files-list">
                        <label htmlFor="exam-file">Фавикон:</label>
                        <FileUploader validate={false} key={1111} hint="Можно загрузить файл формата svg или png" name='favicon' url={'/json/wl/upload'} form_name={'favicon'} />
                    </div>
                    <button className="ui-btn ui-btn_blue ui-btn--w120 ui-btn_lg" type="submit">Сохранить</button>
                </Form>
            </div>
        )
    }
}


PromoWhiteLabelCreate.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export class PromoWhiteLabelList extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {list: []}
    }

    componentDidMount() {
        PromoMaterialsStore.addChangeListener(this.__changeEvent);


        PromoMaterialsActions.getWhitelabelList();

    }

    componentWillUnmount() {
        PromoMaterialsStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(PromoMaterialsStore.getWlList());
    }

    render() {

        if(this.state.list.length == 0) {
            return null;
        }

        return (
            <div className="promo-block__column promo-block__column_wl">
                <div className="promo-block__wl-head">
                    <span className="promo-block__wl-head-col">White Label</span>
                    {/*<span className="promo-block__wl-head-col">Управление</span>*/}
                </div>
                {this.state.list.map(((item, key) => {
                return <PromoWhiteLabelElement wl={item} key={key} />
                    }).bind(this))}
            </div>
        );
    }
}




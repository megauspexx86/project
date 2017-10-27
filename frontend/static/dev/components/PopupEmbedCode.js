import React from 'react';
import ReactDOM       from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';
import PromoMaterialsStore from '../stores/PromoMaterials';
import copy from 'copy-to-clipboard';

class PopupEmbedCode extends React.Component {

    constructor(props) {

        super(props);

        this.__changeEvent = this._onChange.bind(this);

        this.state = {place: ''}
    }

    componentDidMount() {
        PromoMaterialsStore.addChangeListener(this.__changeEvent);
        this.setState(PromoMaterialsStore.getActiveComponentId());
    }

    componentWillUnmount() {
        PromoMaterialsStore.removeChangeListener(this.__changeEvent);
    }

    _onChange() {
        this.setState(PromoMaterialsStore.getActiveComponentId());
    }

    _getComponentCode() {

         return `<div id="partner_form_napishem"></div>
                    <script>
                        (function (d, w) {
                            var  s = d.createElement('script'),
                            f = function() {document.body.appendChild(s);};
                            var container = 'partner_form_napishem';
                            var charset = document.characterSet ? document.characterSet : document.charset;
                            s.async = false;
                            s.src = '` + $CFG.partner_url +'/widget.js'+ `?id=`  + this.state.place.id + `&c=' + container + '&charset=' + charset;
                            if (w.opera == '[object Opera]') return d.addEventListener('DOMContentLoaded', f, false);
                            w.addEventListener('load', f);
                        })(document, window);
                    </script>`;
    }
    

    render() {
        if(!this.state.place) {
            return null;
        }
        let text = this._getComponentCode();

            return(
                <Dialog name="popup_embed_code">
                    <div className="popup__title">Код для вставки на сайт
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>
                    <div className="popup__inner">
                        <textarea className="lk__textarea ui-textarea" name="name" rows="8" cols="40" id="embed_code_textarea" defaultValue={text.toString()}></textarea>
                        <nav className="cancel-order__navigation cancel-order__navigation_centred">
                            <button className="cancel-order__decline ui-btn ui-btn_lg ui-btn_blue ui-btn_min-w150" type="submit" onClick={(() => {copy(document.getElementById('embed_code_textarea').value)})}>Скопировать</button>
                            <button className="cancel-order__close ui-btn ui-btn_lg ui-btn_grey ui-btn_min-w150" type="reset" onClick={this._close.bind(this)}>Закрыть</button>
                        </nav>
                    </div>
                </Dialog>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_embed_code'));
        }).bind(this), 0.00001);
    }

}

export default PopupEmbedCode;

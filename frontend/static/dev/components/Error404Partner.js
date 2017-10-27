import React from 'react';
import {Router, Link} from 'react-router';
import Error404 from '../../../../account/static/frontend/common/components/Error404';

class Error404Partner extends Error404 {

    _linkComponent() {
        return (
            <div className="error404__buttons">
                <Link className="ui-btn ui-btn_lg ui-btn_blue ui-txt_fs13 orders-page__create-order" to={"/promo/my"}>Мои промо-материалы</Link>
                <Link className="ui-btn ui-btn_lg ui-btn_blue ui-txt_fs13 orders-page__create-order" to={"/promo/rotation"}>Новая ротация</Link>
            </div>
        )
    }

}
export default Error404Partner;

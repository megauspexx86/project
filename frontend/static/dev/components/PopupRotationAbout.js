import React from 'react';
import ReactDOM       from 'react-dom';
import Dialog from '../../../../account/static/frontend/common/components/Dialog';

class PopupRotationAbout extends React.Component {

    render() {
            return(
                <Dialog name="popup_rotation_about">
                    <div className="popup__title">Ротация
                        <a className="popup__navigation-close" href="#">Закрыть</a>
                    </div>
                    <div className="popup__inner">
                        <p className="cancel-order__message">{`Ротация позволяет размещать на одном рекламном месте несколько баннеров или форм заказа одного размера, которые заменяют друг друга при перезагрузке страницы. Не знаете какой баннер эффективнее, какая форма заказа принесет больше заказов, разместите на одном рекламном месте 2,3 и более баннеров и посмотрите какой из них принесет вам больший доход.`}</p>
                        <p className="cancel-order__message"> {`Как запустить ротацию:`} </p>
                        <ul className="cancel-order__message-list">
                            <li>{`1. Введите название рекламного места`}</li>
                            <li>{`2. Выберите, что хотите разместить: баннеры или формы заказа`}</li>
                            <li>{`3. Укажите желаемую форму промо-материалов`}</li>
                            <li>{`4. Выберите размер`}</li>
                            <li>{`5. Нажмите на кнопку «показать»`}</li>
                            <li>{`6. После того, как вы выбрали понравившееся промо-материалы, нажмите на кнопку «получить код ротации»`}</li>
                            <li>{`7. Далее следуйте инструкции`}</li>
                        </ul>
                        <nav className="cancel-order__navigation cancel-order__navigation_centred">
                            <button className="authors__select btn ui-btn ui-btn_lg ui-btn_blue" type="reset" onClick={this._close.bind(this)}>Закрыть</button>
                        </nav>
                    </div>
                </Dialog>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup_rotation_about'));
        }).bind(this), 0.00001);
    }

}

export default PopupRotationAbout;

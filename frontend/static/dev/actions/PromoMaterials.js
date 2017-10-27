import asyncDispatch from 'napishem-frontend-utils/modules/AsyncDispatch';
import Request from 'napishem-frontend-utils/modules/Request';
import AppDispatcher from 'napishem-frontend-utils/dispatcher/AppDispatcher';

var PromoMaterialsActions = {

    /**
     * Получение форм заказа по фильтру
     * @param filter_params
     */
    getPromoMaterialsForms: function(filter_params = {banners: true, forms: true}) {

        let u = '/json/promo/forms';
        let data = new FormData();
        for (let value of Object.keys(filter_params)) {
            data.append(value, filter_params[value]);
        }

        let r = new Request(u, 'POST');

        r.send((response) => {
            AppDispatcher.dispatch({
                actionType: 'PARTNER_GET_PROMO_FORMS',
                data: response
            });
        }, data);
    },

    /**
     * Создание компонента с новым рекламным местом(по клику на кнопку Получить код)
     * @param template_id
     */
    createPromoComponentWithPlace: function(template_id) {
        asyncDispatch('PARTNER_SET_ACTIVE_COMPONENT', `/json/promo/forms/create/${template_id}`);
    },
    

    /**
     * Получение списка компонентов
     */
    getPartnerComponentsList: function() {
        asyncDispatch('PARTNER_GET_COMPONENTS_LIST', `/json/promo/my`);
    },

    getPartnerArchivedComponentsList: function() {
        asyncDispatch('PARTNER_GET_ARCHIVED_COMPONENTS_LIST', `/json/promo/archive`);
    },
    
    getPartnerPromoLinks(status) {
        asyncDispatch('PARTNER_GET_PROMO_LINKS', `/json/promo/links/${status}`);
    },

    getWhitelabelList() {
        asyncDispatch('PARTNER_WL_LIST', `/json/wl/list`);
    },

    /**
     * Установка активного компонента
     */
    setActiveComponentId(component) {
        AppDispatcher.dispatch({
            actionType: 'PARTNER_SET_ACTIVE_COMPONENT',
            data: component
        });
    }
};

export default PromoMaterialsActions;
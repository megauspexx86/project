import asyncDispatch from 'napishem-frontend-utils/modules/AsyncDispatch';
import Request from 'napishem-frontend-utils/modules/Request';
import AppDispatcher from 'napishem-frontend-utils/dispatcher/AppDispatcher';

var PromoFilterActions = {

    /**
     * Установка текущих значений фильтр
     * @param filter
     */
    setFilter(filter) {
        AppDispatcher.dispatch({
            actionType: 'SET_FILTER',
            data: filter
        });
    },

    /**
     * Получение значений ширины темплейтов для фильтра
     */
    getFilterSizes(filter) {
        asyncDispatch('GET_UNIQUE_SIZES', `/json/filter/sizes/${filter}`);
    },

    getFilterHeight(filter, width) {
        asyncDispatch('GET_FILTER_HEIGHT', `/json/filter/height/${width}/${filter}`);
    },

    getFilterWidth(filter, height) {
        asyncDispatch('GET_FILTER_WIDTH', `/json/filter/width/${height}/${filter}`);
    }
};

export default PromoFilterActions;
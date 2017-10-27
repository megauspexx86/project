import asyncDispatch from 'napishem-frontend-utils/modules/AsyncDispatch';
var AppDispatcher = require('napishem-frontend-utils/dispatcher/AppDispatcher');

var object2Params = function(object) {

    var str = [];

    for (var key in object) {
        str.push(`${key}=${encodeURIComponent(object[key])}`);
    }

    return str.join('&');
};

var StatisticAction = {

    loadCommonReport: function(params) {
        StatisticAction.__report('LOAD_REPORT', '/json/report/common', params);
    },

    loadPromoData: function() {
        asyncDispatch('LOAD_PROMO_DATA', '/json/report/data');
    },

    __report: function(action, url, params) {

        let query = "";
        if(params) {
            query += '?' + object2Params(params);
        }

        asyncDispatch(action, url + query);
    }

};

export default StatisticAction;

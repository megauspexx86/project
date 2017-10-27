import AppDispatcher from 'napishem-frontend-utils/dispatcher/AppDispatcher';
import EventEmitter from 'events';
import _  from 'lodash';

var _report = {};
var _promo_report = {};
var _promo_data = {};
var _default_promo_data = null;


function setReport(data) {
    _report = data;
}

function setPromoData(data) {
    _promo_data = data;
}

var StatisticStore = _.merge({}, EventEmitter.prototype, {

    getReport: function() {
      return _report;
    },

    getPromoData: function() {
      return _promo_data;
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(payload) {

    switch(payload.actionType) {

        case 'LOAD_REPORT': // Общая статистика компонентов
            setReport(payload.data);
            break;
        case 'LOAD_PROMO_DATA':
            setPromoData(payload.data);
            break;
        default:
            return true;
    }

    StatisticStore.emitChange();

    return true;
});

export default StatisticStore;

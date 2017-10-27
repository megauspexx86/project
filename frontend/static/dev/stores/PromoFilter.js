import AppDispatcher from 'napishem-frontend-utils/dispatcher/AppDispatcher';
import EventEmitter from 'events';
import _  from 'lodash';

var _active_filters = {};
var _filter_sizes = {};

function setFilter(data) {
    _active_filters = data;
}

function setFilterSizes(data) {
    _filter_sizes = data;
}

function setFilterHeight(data) {
    _filter_sizes.filter_height = data.height;
}

function setFilterWidth(data) {
    _filter_sizes.filter_width = data.width;
}

var PromoFilterStore = _.merge({}, EventEmitter.prototype, {

    getFilters: function() {
        return _active_filters;
    },

    getFilterSizes: function() {
        return _filter_sizes;
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
        _active_filters = {};
    }
});

PromoFilterStore.dispatchToken = AppDispatcher.register(function(payload) {

    switch(payload.actionType) {

        case 'SET_FILTER':
            setFilter(payload.data);
            break;
        case 'GET_UNIQUE_SIZES':
            setFilterSizes(payload.data);
            break;
        case 'GET_FILTER_HEIGHT':
            setFilterHeight(payload.data);
            break;
        case 'GET_FILTER_WIDTH':
            setFilterWidth(payload.data);
            break;
        default:
            return true;
    }

    PromoFilterStore.emitChange();

    return true;
});

export default PromoFilterStore;

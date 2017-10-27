import AppDispatcher from 'napishem-frontend-utils/dispatcher/AppDispatcher';
import EventEmitter from 'events';
import _  from 'lodash';

var _help_faq_list = {};

function setHelpFaqList(data) {
    _help_faq_list = data;
}


var ProfileStore = _.merge({}, EventEmitter.prototype, {

    getHelpFaqList: function() {
      return _help_faq_list;
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

        case 'PARTNER_HELP_GET_FAQ':
            setHelpFaqList(payload.data);
            break;
        default:
            return true;
    }

    ProfileStore.emitChange();

    return true;
});

export default ProfileStore;

import AppDispatcher from 'napishem-frontend-utils/dispatcher/AppDispatcher';
import EventEmitter from 'events';
import _  from 'lodash';

var _partner_reward = {};
var _user_data = {};
var __user_ability = {};

function setRewardSettings(data) {
    _partner_reward = data;
}

function setUserData(data) {
    _user_data = data;
}

function setUserAbility(data) {
    __user_ability = data;
}

var ProfileStore = _.merge({}, EventEmitter.prototype, {

    getRewardSettings: function() {
      return _partner_reward;
    },

    getUserData: function() {
      return _user_data;
    },

    getUserAbility: function() {
        return __user_ability;
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

        case 'PARTNER_REWARD_SETTINGS':
            setRewardSettings(payload.data);
            break;
        case 'PARTNER_GET_DATA':
            setUserData(payload.data);
            break;
        case 'GET_USER_BET_ABILITY':
            setUserAbility(payload.data);
            break;
        default:
            return true;
    }

    ProfileStore.emitChange();

    return true;
});

export default ProfileStore;

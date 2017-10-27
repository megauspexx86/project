import AppDispatcher from 'napishem-frontend-utils/dispatcher/AppDispatcher';
import EventEmitter from 'events';
import _  from 'lodash';

var _rotation_code = {};
var _active_rotation = {};

function setResult(data) {
    _rotation_code = data;
}
function setActiveRotation(data) {
    _active_rotation = data;
}

function resetErrors() {
    _rotation_code = {};
}

var RotationStore = _.merge({}, EventEmitter.prototype, {

    getResult: function() {
        return _rotation_code;
    },

    getActiveRotation: function() {
        return _active_rotation;
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

RotationStore.dispatchToken = AppDispatcher.register(function(payload) {

    switch(payload.actionType) {

        case 'GET_ROTATION_CODE':
            setResult(payload.data);
            break;
        case 'RESET_ERRORS':
            resetErrors(payload.data);
            break;
        case 'SET_ACTIVE_ROTATION':
            setActiveRotation(payload.data);
            break;
        default:
            return true;
    }

    RotationStore.emitChange();

    return true;
});

export default RotationStore;

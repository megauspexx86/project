import asyncDispatch from 'napishem-frontend-utils/modules/AsyncDispatch';
import Request from 'napishem-frontend-utils/modules/Request';
import AppDispatcher from 'napishem-frontend-utils/dispatcher/AppDispatcher';

var RotationActions = {

    setRotationResult(response) {
        AppDispatcher.dispatch({
            actionType: 'GET_ROTATION_CODE',
            data:{response}
        });
    },

    resetErrors() {
        AppDispatcher.dispatch({
            actionType: 'RESET_ERRORS',
            data:{}
        });
    },

    setActiveRotation(id) {
        asyncDispatch('SET_ACTIVE_ROTATION', `/json/rotation/${id}/components`);
    }
};

export default RotationActions;
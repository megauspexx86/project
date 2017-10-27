import asyncDispatch from 'napishem-frontend-utils/modules/AsyncDispatch';

var ProfileActions = {

    getRewardSettings: function() {
        asyncDispatch('PARTNER_REWARD_SETTINGS', '/json/private/reward');
    },

    getUserData: function() {
        asyncDispatch('PARTNER_GET_DATA', '/json/private/info');
    },

    getUserAbility: function() {
        return asyncDispatch('GET_USER_BET_ABILITY', '/json/private/bet_ability');
    },
};

export default ProfileActions;
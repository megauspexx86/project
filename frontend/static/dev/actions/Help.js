import asyncDispatch from 'napishem-frontend-utils/modules/AsyncDispatch';

var HelpActions = {

    getHelpFaqList: function() {
        asyncDispatch('PARTNER_HELP_GET_FAQ', '/json/help/faq');
    }
};

export default HelpActions;
import AppDispatcher from 'napishem-frontend-utils/dispatcher/AppDispatcher';
import EventEmitter from 'events';
import _  from 'lodash';

var _promo_materials_forms = {};
var _active_component_id ={};
var _partner_components_list ={};
var _partner_archived_components_list ={};
var __promo_links ={};
var __wl_list = {};

function setPromoMaterialsForms(data) {
    _promo_materials_forms = data;
}

function setActiveComponentId(data) {
    _active_component_id = data;
}
function setPartnerComponentsList(data) {
    _partner_components_list = data;
}
function setPartnerArchivedComponentsList(data) {
    _partner_archived_components_list = data;
}
function setPromoLinks(data) {
    __promo_links = data;
}

function setWlList(data) {
    __wl_list = data;
}


var PromoMaterialsStore = _.merge({}, EventEmitter.prototype, {

    getPromoMaterialsForms: function() {
      return _promo_materials_forms;
    },

    getActiveComponentId: function() {
      return _active_component_id;
    },

    getPartnerComponents: function() {
      return _partner_components_list;
    },

    getPartnerArchivedComponents: function() {
      return _partner_archived_components_list;
    },
    
    getPromoLinks: function() {
      return __promo_links;
    },

    getWlList: function() {
      return __wl_list;
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
        _active_component_id = {};
    }
});

PromoMaterialsStore.dispatchToken = AppDispatcher.register(function(payload) {

    switch(payload.actionType) {

        case 'PARTNER_GET_PROMO_FORMS':
            setPromoMaterialsForms(payload.data);
            break;
        case 'PARTNER_SET_ACTIVE_COMPONENT':
            setActiveComponentId(payload.data);
            break;
        case 'PARTNER_GET_COMPONENTS_LIST':
            setPartnerComponentsList(payload.data);
            break;
        case 'PARTNER_GET_ARCHIVED_COMPONENTS_LIST':
            setPartnerArchivedComponentsList(payload.data);
            break;
        case 'PARTNER_GET_PROMO_LINKS':
            setPromoLinks(payload.data);
            break;
        case 'PARTNER_WL_LIST':
            setWlList(payload.data);
            break;
        default:
            return true;
    }

    PromoMaterialsStore.emitChange();

    return true;
});

export default PromoMaterialsStore;

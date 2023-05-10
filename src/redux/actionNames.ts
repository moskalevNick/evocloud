import { modules } from './modules';

export const actionNames = {
  [modules.DEVICE]: {
    getDevices: 'GET_DEVICES',
    getDevice: 'GET_DEVICE',
    editDevice: 'EDIT_DEVICE',
    getComparisonConditions: 'GET_COMPARISON_CONDITIONS',
  },
  [modules.WIDGET]: {
    getWidgets: 'GET_WIDGETS',
    getGroupWidgets: 'GET_GROUP_WIDGETS',
    getCameraFrame: 'GET_CAMERA_FRAME',
    getWidgetTypes: 'GET_WIDGET_TYPES',
    addTempWidget: 'ADD_TEMP_WIDGET',
    addBinaryButtonWidget: 'ADD_BINARY_BUTTON_WIDGET',
    addOpenCloseWidget: 'ADD_OPEN_CLOSE_WIDGET',
    addPercentWidget: 'ADD_PERCENT_WIDGET',
    addBarButtonWidget: 'ADD_BAR_BUTTON_WIDGET',
    addTempRegulatorWidget: 'ADD_TEMP_REGULATOR_WIDGET',
    addRGBWidget: 'ADD_RGB_WIDGET',
    addPointWidget: 'ADD_POINT_WIDGET',
    addAdvancedOpencloseWidget: 'ADD_ADVANCED_OPENCLOSE_WIDGET',
    addPowerMetterWidget: 'ADD_POWER_METTER_WIDGET',
    addDoubleBarButtonWidget: 'ADD_DOUBLE_BAR_BUTTON_WIDGET',
  },
  [modules.USER]: {
    getUsers: 'GET_USERS',
    getUserGroups: 'GET_USER_GROUPS',
    addUser: 'ADD_USER',
    editUser: 'EDIT_USER',
    editSettings: 'EDIT_SETTINGS',
    getCurrentUser: 'GET_CURRENT_USER',
    getUserInfo: 'GET_USER_INFO',
  },
  [modules.GLOBAL]: {
    login: 'LOGIN',
    registration: 'REGISTRATION',
    logout: 'LOGOUT',
    checkAuth: 'CHECK_AUTH',
    editUser: 'EDIT_USER',
  },
};

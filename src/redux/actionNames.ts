import { modules } from './modules';

export const actionNames = {
  [modules.DEVICE]: {
    getDevices: 'GET_DEVICES',
    editDevice: 'EDIT_DEVICE',
  },
  [modules.WIDGET]: {
    getWidgets: 'GET_WIDGETS',
    getGroupWidgets: 'GET_GROUP_WIDGETS',
    getCameraFrame: 'GET_CAMERA_FRAME',
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

import { modules } from './modules';

export const actionNames = {
  [modules.DEVICE]: {
    getDevices: 'GET_DEVICES',
  },
  [modules.EXIS]: {
    getExis: 'GET_EXIS',
    editExis: 'EDIT_EXIS',
    createExis: 'CREATE_EXIS',
    deleteExis: 'DELETE_EXIS',
  },
  [modules.VISIT]: {
    getVisits: 'GET_VISITS',
    updateVisit: 'UPDATE_VISIT',
  },
  [modules.IMAGE]: {
    getImages: 'GET_IMAGES',
    uploadImage: 'UPLOAD_IMAGE',
    deleteImage: 'DELETE_IMAGE',
    getCameraFrame: 'GET_CAMERA_FRAME',
  },
  [modules.GLOBAL]: {
    login: 'LOGIN',
    registration: 'REGISTRATION',
    logout: 'LOGOUT',
    checkAuth: 'CHECK_AUTH',
    edit: 'EDIT_USER',
    uploadAvatar: 'UPLOAD_AVATAR',
  },
  [modules.USER]: {
    getUsers: 'GET_USERS',
    getUserGroups: 'GET_USER_GROUPS',
  },
};

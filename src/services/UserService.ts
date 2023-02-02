import $api from '../http';
import { createUserType, editSettingsType, UserGroupType, UserType } from '../types';

export default class UserService {
  static async getUsers(): Promise<UserType[]> {
    const response = await $api.get('/listUsers');
    return response.data.result;
  }
  static async getUserGroups(): Promise<UserGroupType[]> {
    const response = await $api.get('/listUserGroups');
    return response.data.result;
  }
  static async addUser(newUser: createUserType): Promise<UserType> {
    const response = await $api.post('/addUser', newUser);
    return response.data.user;
  }
  static async editUser(newClient: createUserType, id: string): Promise<UserType> {
    const response = await $api.post(`/editUser/${id}`, newClient);
    return response.data.user;
  }
  static async editSetting(newClient: editSettingsType): Promise<UserType> {
    const response = await $api.post('/editUser', newClient);
    return response.data.user;
  }
}

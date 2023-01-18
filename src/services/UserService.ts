import $api from '../http';
import { UserGroupType, UserType } from '../types';

export default class UserService {
  static async getUsers(): Promise<UserType[]> {
    const response = await $api.get('/listUsers');
    return response.data.result;
  }
  static async getUserGroups(): Promise<UserGroupType[]> {
    const response = await $api.get('/listUserGroups');
    return response.data.result;
  }
}

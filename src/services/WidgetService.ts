import $api from '../http';

export default class WidgetService {
  static async getWidgets(userId: number): Promise<any> {
    const response = await $api.get(`/listOfWidgets/${userId}`);
    return response.data;
  }

  static async getGroupWidgets(userId: number): Promise<any> {
    const response = await $api.get(`/listWidgetGroups/${userId}`);
    return response.data;
  }

  // static async editDevice(newDevice: CreateDeviceType, id: string): Promise<any> {
  //   const response = await $api.post(`/editDevice/${id}`, newDevice);
  //   return response.data;
  // }
}

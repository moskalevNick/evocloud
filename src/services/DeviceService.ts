import $api from '../http';
import { CreateDeviceType } from '../types';

export default class DeviceService {
  static async getDevices(): Promise<any> {
    const response = await $api.get('/listDevices');
    return response.data;
  }

  static async editDevice(newDevice: CreateDeviceType, id: string): Promise<any> {
    const response = await $api.post(`/editDevice/${id}`, newDevice);
    return response.data;
  }
}

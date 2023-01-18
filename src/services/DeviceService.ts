import $api from '../http';
import { clientFilterType, ClientType, CreateClientType, FiltersType, SimilarType } from '../types';

// const path = 'clients';

export default class DeviceService {
  static async getDevices(): Promise<any> {
    // const response = await $api.get(`${path}/id/${id}`);
    return 'response.data';
  }
}

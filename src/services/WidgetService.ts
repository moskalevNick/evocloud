import axios from 'axios';
import $api from '../http';
import { CameraFrameType } from '../types';

export default class WidgetService {
  static async getWidgets(userId: number): Promise<any> {
    const response = await $api.get(`/listOfWidgets/${userId}`);
    return response.data;
  }

  static async getGroupWidgets(userId: number): Promise<any> {
    const response = await $api.get(`/listWidgetGroups/${userId}`);
    return response.data;
  }

  static async getStream(cameraToken: string): Promise<CameraFrameType[]> {
    const response = await axios.request({
      url: `http://cams.evocontrols.com:8282/get_stream.php?token=${cameraToken}`,
      method: 'get',
    });
    return response.data;
  }
}

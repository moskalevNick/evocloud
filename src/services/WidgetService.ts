import axios from 'axios';
import $api from '../http';
import { CameraFrameType, WidgetDescriptionType } from '../types';

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

  static async getWidgetTypes(): Promise<WidgetDescriptionType[]> {
    const response = await $api.get(`/listTypesOfWidgets`);
    return response.data.widgetTypes;
  }

  static async addTempWidget(userId: number, data: any): Promise<any> {
    const response = await $api.post(`/addTempWidget/${userId}`, data);
    return response.data;
  }

  static async addBinaryButtonWidget(userId: number, data: any): Promise<any> {
    const response = await $api.post(`/addBinaryButtonWidget/${userId}`, data);
    return response.data;
  }

  static async addOpenCloseWidget(userId: number, data: any): Promise<any> {
    const response = await $api.post(`/addOpenCloseWidget/${userId}`, data);
    return response.data;
  }

  static async addPercentWidget(userId: number, data: any): Promise<any> {
    const response = await $api.post(`/addPercentWidget/${userId}`, data);
    return response.data;
  }

  static async addBarButtonWidget(userId: number, data: any): Promise<any> {
    const response = await $api.post(`/addBarWidget/${userId}`, data);
    return response.data;
  }

  static async addTempRegulatorWidget(userId: number, data: any): Promise<any> {
    const response = await $api.post(`/addTempRegulatorWidget/${userId}`, data);
    return response.data;
  }

  static async addRGBWidget(userId: number, data: any): Promise<any> {
    const response = await $api.post(`/addRGBWidget/${userId}`, data);
    return response.data;
  }

  static async addPointWidget(userId: number, data: any): Promise<any> {
    const response = await $api.post(`/addPointWidget/${userId}`, data);
    return response.data;
  }

  static async addAdvancedOpencloseWidget(userId: number, data: any): Promise<any> {
    const response = await $api.post(`/addAdvancedOpenClose/${userId}`, data);
    return response.data;
  }

  static async addPowerMetterWidget(userId: number, data: any): Promise<any> {
    const response = await $api.post(`/addPowerMetter/${userId}`, data);
    return response.data;
  }

  static async addDoubleBarButtonWidget(userId: number, data: any): Promise<any> {
    const response = await $api.post(`/addDoubleBarWidget/${userId}`, data);
    return response.data;
  }
}

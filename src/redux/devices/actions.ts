import { createAsyncThunk } from '@reduxjs/toolkit';
import ClientsService from '../../services/ClientService';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import { CreateDeviceType } from '../../types';
import DeviceService from '../../services/DeviceService';

type editDeviceType = {
  newDevice: CreateDeviceType;
  id: string;
};

export const deviceActions = {
  // getClients: createAsyncThunk(
  //   getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].getClients),
  //   async (_: void, thunkApi) => {
  //     const state: any = thunkApi.getState();
  //     const filters = selectFilters(state);

  //     const data = await DeviceService.getDevices();
  //     return data;
  //   },
  // ),

  getDevices: createAsyncThunk(
    getActionName(modules.DEVICE, actionNames[modules.DEVICE].getDevices),
    async () => {
      const data = await DeviceService.getDevices();
      return data;
    },
  ),

  editDevice: createAsyncThunk(
    getActionName(modules.DEVICE, actionNames[modules.DEVICE].editDevice),
    async ({ newDevice, id }: editDeviceType) => {
      const data = await DeviceService.editDevice(newDevice, id);
      return data.device;
    },
  ),

  // addClient: createAsyncThunk(
  //   getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].addClient),
  //   async (newClient: Omit<ClientType, 'id' | 'images'>) => {
  //     const data = await ClientsService.addClient(newClient);
  //     return data;
  //   },
  // ),

  // deleteClient: createAsyncThunk(
  //   getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].deleteClient),
  //   async (id: string) => {
  //     const data = await ClientsService.deleteClient(id);
  //     return data;
  //   },
  // ),

  // deleteSimilar: createAsyncThunk(
  //   getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].deleteSimilar),
  //   async (id: string) => {
  //     const data = await ClientsService.deleteSimilar(id);
  //     return data;
  //   },
  // ),
};

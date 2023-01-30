import { createAsyncThunk } from '@reduxjs/toolkit';
import ClientsService from '../../services/ClientService';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import { ClientType, CreateClientType } from '../../types';
import DeviceService from '../../services/DeviceService';

type editClientType = {
  newClient: CreateClientType;
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

  // editClient: createAsyncThunk(
  //   getActionName(modules.CLIENTS, actionNames[modules.CLIENTS].editClient),
  //   async ({ newClient, id }: editClientType) => {
  //     const data = await ClientsService.editClient(newClient, id);
  //     return data;
  //   },
  // ),

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

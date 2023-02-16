import { createAsyncThunk } from '@reduxjs/toolkit';
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
};

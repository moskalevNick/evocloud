import { createSlice } from '@reduxjs/toolkit';
import { ComparisonConditionsType, DeviceType } from '../../types';
import { modules } from '../modules';
import { deviceActions } from './actions';
import { Nottification } from '../../components/Nottification/Nottification';
import i18next from 'i18next';

export const deviceSlice = createSlice({
  name: modules.DEVICE,
  initialState: {
    devices: [] as DeviceType[],
    currentDevice: null as DeviceType | null,
    comparisonConditions: [] as ComparisonConditionsType[],
    isLoading: false,
    isGetDeviceLoading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(deviceActions.getDevices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deviceActions.getDevices.fulfilled, (state, action) => {
        state.devices = action.payload.devices;
        state.isLoading = false;
      })
      .addCase(deviceActions.getDevices.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(deviceActions.getDevice.pending, (state) => {
        state.isGetDeviceLoading = true;
      })
      .addCase(deviceActions.getDevice.fulfilled, (state, action) => {
        state.currentDevice = action.payload.device;
        state.isGetDeviceLoading = false;
      })
      .addCase(deviceActions.getDevice.rejected, (state) => {
        state.isGetDeviceLoading = false;
      })

      .addCase(deviceActions.getComparisonConditions.pending, (state) => {
        state.isGetDeviceLoading = true;
      })
      .addCase(deviceActions.getComparisonConditions.fulfilled, (state, action) => {
        state.comparisonConditions = action.payload.conditions;
        state.isGetDeviceLoading = false;
      })
      .addCase(deviceActions.getComparisonConditions.rejected, (state) => {
        state.isGetDeviceLoading = false;
      })

      .addCase(deviceActions.editDevice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deviceActions.editDevice.fulfilled, (state, action) => {
        state.isLoading = false;

        const locale = i18next.resolvedLanguage;
        const nottificationText: string =
          locale === 'ru' ? 'Контроллер успешно обновлен' : 'Device successfully updated';

        Nottification({
          name: `${action.payload.x_evo_device} (${action.payload.name})`,
          text: nottificationText,
        });
      })
      .addCase(deviceActions.editDevice.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const deviceReducer = deviceSlice.reducer;
export const deviceSettingsActions = deviceSlice.actions;

import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import WidgetService from '../../services/WidgetService';

export const widgetActions = {
  getWidgets: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].getWidgets),
    async (userId: number) => {
      const data = await WidgetService.getWidgets(userId);
      return data;
    },
  ),

  getGroupWidgets: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].getGroupWidgets),
    async (userId: number) => {
      const data = await WidgetService.getGroupWidgets(userId);
      return data;
    },
  ),

  getStream: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].getCameraFrame),
    async (cameraToken: string) => await WidgetService.getStream(cameraToken),
  ),

  getWidgetTypes: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].getWidgetTypes),
    async () => await WidgetService.getWidgetTypes(),
  ),

  addTempWidget: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].addTempWidget),
    async ({ userId, data }: { userId: number; data: any }) =>
      await WidgetService.addTempWidget(userId, data),
  ),

  addBinaryButtonWidget: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].addBinaryButtonWidget),
    async ({ userId, data }: { userId: number; data: any }) =>
      await WidgetService.addBinaryButtonWidget(userId, data),
  ),

  addOpenCloseWidget: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].addOpenCloseWidget),
    async ({ userId, data }: { userId: number; data: any }) =>
      await WidgetService.addOpenCloseWidget(userId, data),
  ),

  addPercentWidget: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].addPercentWidget),
    async ({ userId, data }: { userId: number; data: any }) =>
      await WidgetService.addPercentWidget(userId, data),
  ),

  addBarButtonWidget: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].addBarButtonWidget),
    async ({ userId, data }: { userId: number; data: any }) =>
      await WidgetService.addBarButtonWidget(userId, data),
  ),

  addTempRegulatorWidget: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].addTempRegulatorWidget),
    async ({ userId, data }: { userId: number; data: any }) =>
      await WidgetService.addTempRegulatorWidget(userId, data),
  ),

  addRGBWidget: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].addRGBWidget),
    async ({ userId, data }: { userId: number; data: any }) =>
      await WidgetService.addRGBWidget(userId, data),
  ),

  addPointWidget: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].addPointWidget),
    async ({ userId, data }: { userId: number; data: any }) =>
      await WidgetService.addPointWidget(userId, data),
  ),

  addAdvancedOpencloseWidget: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].addAdvancedOpencloseWidget),
    async ({ userId, data }: { userId: number; data: any }) =>
      await WidgetService.addAdvancedOpencloseWidget(userId, data),
  ),

  addPowerMetterWidget: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].addPowerMetterWidget),
    async ({ userId, data }: { userId: number; data: any }) =>
      await WidgetService.addPowerMetterWidget(userId, data),
  ),

  addDoubleBarButtonWidget: createAsyncThunk(
    getActionName(modules.WIDGET, actionNames[modules.WIDGET].addDoubleBarButtonWidget),
    async ({ userId, data }: { userId: number; data: any }) =>
      await WidgetService.addDoubleBarButtonWidget(userId, data),
  ),
};

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
};

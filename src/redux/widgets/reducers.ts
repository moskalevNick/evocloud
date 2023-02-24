import { createSlice } from '@reduxjs/toolkit';
import { widgetActions } from './actions';
import { CameraFrameType, GroupWidgetsType, WidgetType } from '../../types';
import { modules } from '../modules';

type FramesType = Record<string, CameraFrameType>;

export const widgetSlice = createSlice({
  name: modules.WIDGET,
  initialState: {
    widgets: [] as WidgetType[],
    groupWidgets: [] as GroupWidgetsType[],
    isLoading: false,
    cameraFrame: {} as FramesType,
  },
  reducers: {
    clearCurrentWidgets: (state) => {
      state.widgets = [];
    },
    clearCurrentGroupWidgets: (state) => {
      state.groupWidgets = [];
    },
    resetCameraFrame: (state) => {
      state.cameraFrame = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(widgetActions.getWidgets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.getWidgets.fulfilled, (state, action) => {
        state.widgets = action.payload.widgets;
        state.isLoading = false;
      })
      .addCase(widgetActions.getWidgets.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.getGroupWidgets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.getGroupWidgets.fulfilled, (state, action) => {
        state.groupWidgets = action.payload.listWidgetGroups;
        state.isLoading = false;
      })
      .addCase(widgetActions.getGroupWidgets.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.getStream.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(widgetActions.getStream.fulfilled, (state, action) => {
        // console.log(action.meta.arg);
        state.cameraFrame[action.meta.arg] = action.payload[0];
        // state.cameraFrame = action.payload[0];

        // state.isLoading = false;
      })
      .addCase(widgetActions.getStream.rejected, (state) => {
        // state.isLoading = false;
      });
  },
});

export const widgetReducer = widgetSlice.reducer;
export const widgetSettingsActions = widgetSlice.actions;

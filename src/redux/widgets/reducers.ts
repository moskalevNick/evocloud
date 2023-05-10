import { WidgetDescriptionType } from './../../types';
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
    widgetTypes: [] as WidgetDescriptionType[],
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
      })

      .addCase(widgetActions.getWidgetTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.getWidgetTypes.fulfilled, (state, action) => {
        state.widgetTypes = action.payload;
        state.isLoading = false;
      })
      .addCase(widgetActions.getWidgetTypes.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.addTempWidget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.addTempWidget.fulfilled, (state, action) => {
        state.widgetTypes = [...state.widgets, action.payload];
        state.isLoading = false;
      })
      .addCase(widgetActions.addTempWidget.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.addBinaryButtonWidget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.addBinaryButtonWidget.fulfilled, (state, action) => {
        state.widgetTypes = [...state.widgets, action.payload];
        state.isLoading = false;
      })
      .addCase(widgetActions.addBinaryButtonWidget.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.addOpenCloseWidget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.addOpenCloseWidget.fulfilled, (state, action) => {
        state.widgetTypes = [...state.widgets, action.payload];
        state.isLoading = false;
      })
      .addCase(widgetActions.addOpenCloseWidget.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.addPercentWidget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.addPercentWidget.fulfilled, (state, action) => {
        state.widgetTypes = [...state.widgets, action.payload];
        state.isLoading = false;
      })
      .addCase(widgetActions.addPercentWidget.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.addBarButtonWidget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.addBarButtonWidget.fulfilled, (state, action) => {
        state.widgetTypes = [...state.widgets, action.payload];
        state.isLoading = false;
      })
      .addCase(widgetActions.addBarButtonWidget.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.addTempRegulatorWidget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.addTempRegulatorWidget.fulfilled, (state, action) => {
        state.widgetTypes = [...state.widgets, action.payload];
        state.isLoading = false;
      })
      .addCase(widgetActions.addTempRegulatorWidget.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.addRGBWidget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.addRGBWidget.fulfilled, (state, action) => {
        state.widgetTypes = [...state.widgets, action.payload];
        state.isLoading = false;
      })
      .addCase(widgetActions.addRGBWidget.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.addPointWidget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.addPointWidget.fulfilled, (state, action) => {
        state.widgetTypes = [...state.widgets, action.payload];
        state.isLoading = false;
      })
      .addCase(widgetActions.addPointWidget.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.addAdvancedOpencloseWidget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.addAdvancedOpencloseWidget.fulfilled, (state, action) => {
        state.widgetTypes = [...state.widgets, action.payload];
        state.isLoading = false;
      })
      .addCase(widgetActions.addAdvancedOpencloseWidget.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(widgetActions.addPowerMetterWidget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(widgetActions.addPowerMetterWidget.fulfilled, (state, action) => {
        state.widgetTypes = [...state.widgets, action.payload];
        state.isLoading = false;
      })
      .addCase(widgetActions.addPowerMetterWidget.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const widgetReducer = widgetSlice.reducer;
export const widgetSettingsActions = widgetSlice.actions;

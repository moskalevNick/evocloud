import { UserType, UserGroupType } from './../../types';
import { createSlice, current } from '@reduxjs/toolkit';
import { ClientType, FiltersType } from '../../types';
import { modules } from '../modules';
import { userActions } from './actions';
import { Nottification } from '../../components/Nottification/Nottification';
import { yesterdayStartDay, yesterdayEndDay } from '../../helpers/constants';
import { globalActions } from '../global/actions';
import { RootStateExtended } from '../store';
import i18next from 'i18next';

export const defaultFilterValues: FiltersType = {
  searchString: '',
  date: {
    startDate: yesterdayStartDay.toISOString(),
    endDate: yesterdayEndDay.toISOString(),
  },
  range: {
    min: 0,
    max: 9999,
  },
  status: [],
};

export const userSlice = createSlice({
  name: modules.USER,
  initialState: {
    users: [] as UserType[],
    userGroups: [] as UserGroupType[],
    currentClient: null as ClientType | null,
    isLoading: false,
    isClientLoading: false,
    filters: defaultFilterValues,
  },
  reducers: {
    setCurrentClient: (state, action) => {
      state.currentClient = action.payload;
    },
    clearCurrentClient: (state) => {
      state.currentClient = null;
    },
    setFilterDate: (state, action) => {
      state.filters.date = action.payload;
    },
    setFilterRange: (state, action) => {
      state.filters.range = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filters.status = action.payload;
    },
    setSearchString: (state, action) => {
      state.filters.searchString = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // .addCase(globalActions.checkAuth.fulfilled, (state, action) => {
      //   state.filters = {
      //     ...state.filters,
      //     range: {
      //       min: action.payload.minBill,
      //       max: action.payload.maxBill,
      //     },
      //   };
      // })

      // .addCase(globalActions.editSettings.fulfilled, (state, action) => {
      //   state.filters = {
      //     ...state.filters,
      //     range: {
      //       min: action.payload.minBill,
      //       max: action.payload.maxBill,
      //     },
      //   };
      // })

      .addCase(userActions.getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userActions.getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(userActions.getUsers.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(userActions.getUserGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userActions.getUserGroups.fulfilled, (state, action) => {
        state.userGroups = action.payload;
        state.isLoading = false;
      })
      .addCase(userActions.getUserGroups.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
export const userSettingsActions = userSlice.actions;

// export const selectFilters = (state: RootStateExtended<typeof userSlice>) =>
//   state.clientReducer.filters;

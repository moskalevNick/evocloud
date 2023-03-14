import { UserType, UserGroupType } from './../../types';
import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { userActions } from './actions';
import { Nottification } from '../../components/Nottification/Nottification';
import i18next from 'i18next';

type UsersInfoType = Record<string, UserType>;

export const userSlice = createSlice({
  name: modules.USER,
  initialState: {
    users: [] as UserType[],
    userGroups: [] as UserGroupType[],
    usersInfo: {} as UsersInfoType,
    currentUser: null as UserType | null,
    isLoading: false,
    isModalLoading: false,
    isClientLoading: false,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    clearUsersInfo: (state) => {
      state.usersInfo = {};
    },
  },

  extraReducers: (builder) => {
    builder
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
      })

      .addCase(userActions.addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userActions.addUser.fulfilled, (state, action) => {
        state.users = [...state.users, action.payload];
        state.isLoading = false;
      })
      .addCase(userActions.addUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(userActions.editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userActions.editUser.fulfilled, (state, action) => {
        const replacableIndex = state.users.findIndex((user) => user.id === action.payload.id);
        state.users[replacableIndex] = action.payload;

        const locale = i18next.resolvedLanguage;
        const nottificationText: string =
          locale === 'ru' ? 'Клиент успешно обновлен' : 'This client successfully updated';

        Nottification({
          name: action.payload.name,
          text: nottificationText,
        });
        state.isLoading = false;
      })
      .addCase(userActions.editUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(userActions.getCurrentUser.pending, (state) => {
        state.isModalLoading = true;
      })
      .addCase(userActions.getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isModalLoading = false;
      })
      .addCase(userActions.getCurrentUser.rejected, (state) => {
        state.isModalLoading = false;
      })

      .addCase(userActions.getUserInfo.pending, (state) => {
        state.isModalLoading = true;
      })
      .addCase(userActions.getUserInfo.fulfilled, (state, action) => {
        state.usersInfo[action.meta.arg] = action.payload;
        state.isModalLoading = false;
      })
      .addCase(userActions.getUserInfo.rejected, (state) => {
        state.isModalLoading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
export const userSettingsActions = userSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../modules';
import { globalActions } from './actions';
import { Nottification } from '../../components/Nottification/Nottification';

const globalSlice = createSlice({
  name: modules.GLOBAL,
  initialState: {
    userId: null as number | null,
    role: 'user',
    isRus: true,
    isAuth: false,
    isDark: true,
    isLoading: false,
  },
  reducers: {
    setIsRussian: (state, action) => {
      state.isRus = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(globalActions.login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(globalActions.login.fulfilled, (state, action) => {
        state.isDark = action.payload.isDark;
        state.isRus = action.payload.isRus;
        state.isAuth = action.payload.isAuth;
        state.userId = action.payload.user_id;

        switch (action.payload.group_id) {
          case 1:
            state.role = 'admin';
            break;
          case 2:
            state.role = 'integrator';
            break;
          case 3:
            state.role = 'distributor';
            break;
          case 6:
          case null:
          default:
            break;
        }

        state.isLoading = false;
      })
      .addCase(globalActions.login.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(globalActions.registration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(globalActions.registration.fulfilled, (state, action) => {
        state.isLoading = false;
        Nottification({
          text: `user ${action.payload.username} successfully registered`,
        });
      })
      .addCase(globalActions.registration.rejected, (state) => {
        Nottification({
          text: 'there was a problem with registration',
        });
        state.isLoading = false;
      })

      .addCase(globalActions.checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(globalActions.checkAuth.fulfilled, (state, action) => {
        state.isAuth = action.payload.isAuth;
        state.isDark = action.payload.isDark;
        state.isRus = action.payload.isRus;
        state.userId = action.payload.user_id;

        switch (action.payload.group_id) {
          case 1:
            state.role = 'admin';
            break;
          case 2:
            state.role = 'integrator';
            break;
          case 3:
            state.role = 'distributor';
            break;
          case 6:
          case null:
          default:
            break;
        }

        state.isLoading = false;
      })
      .addCase(globalActions.checkAuth.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(globalActions.editSettings.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(globalActions.editSettings.fulfilled, (state, action) => {
        if (action.payload.isDark !== undefined) {
          state.isDark = action.payload.isDark;
        }
        if (action.payload.isRus !== undefined) {
          state.isRus = action.payload.isRus;
        }
        document.body.setAttribute('dir', action.payload.isRus ? 'ru' : 'en');
        Nottification({
          text: action.payload.isRus
            ? 'настройки аккаунта изменены успешно'
            : 'account settings changed successfully',
        });
        state.isLoading = false;
      })
      .addCase(globalActions.editSettings.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const globalReducer = globalSlice.reducer;
export const globalSettingActions = globalSlice.actions;

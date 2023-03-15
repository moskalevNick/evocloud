import { Nottification } from './../../components/Nottification/Nottification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { editSettingsType } from '../../types';
import UserService from '../../services/UserService';
import Cookies from 'js-cookie';

type authType = {
  username: string;
  password: string;
  isRemember: boolean;
};

type registrationType = {
  username: string;
  password: string;
  cameraToken: string;
};

export const globalActions = {
  login: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].login),
    async ({ username, password, isRemember }: authType) => {
      try {
        const response = await AuthService.login(username, password);

        localStorage.setItem('access-token', `${response.data.access_token}`);

        if (isRemember) {
          localStorage.setItem('refresh-token', response.data.refresh_token);
          document.cookie = `refresh_token=${response.data.refresh_token}`;
        }

        return {
          isAuth: true,
          ...response.data.user_data,
        };
      } catch (e: any) {
        Nottification({
          text: e.response.data.description,
        });
        return {
          isAuth: false,
        };
      }
    },
  ),

  registration: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].registration),
    async ({ username, password, cameraToken }: registrationType) => {
      const response = await AuthService.registration(username, password, cameraToken);
      return response.data;
    },
  ),

  checkAuth: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].checkAuth),
    async () => {
      // let refreshToken: string | undefined | null = Cookies.get('refresh_token');
      const refreshToken = localStorage.getItem('refresh-token');

      if (!refreshToken) {
        return false;
      }

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/refresh`, {
          refresh_token: refreshToken,
        });

        localStorage.setItem('access-token', response.data.access_token);
        localStorage.setItem('refresh-token', response.data.refresh_token);
        // document.cookie = `refresh_token=${response.data.refresh_token}`;

        return {
          isAuth: true,
          ...response.data.user_data,
        };
      } catch (e) {
        console.log(e);

        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        document.cookie = `refresh_token=`;
        window.location.href = '/';
        return {
          isAuth: false,
        };
      }
    },
  ),

  logout: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].logout),
    async () => {
      const response = await AuthService.logout();
      console.log(response);

      localStorage.removeItem('refresh-token');
      localStorage.removeItem('access-token');
      document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/';

      return true;
    },
  ),

  editSettings: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].editUser),
    async (newUser: editSettingsType) => {
      return UserService.editSetting(newUser);
    },
  ),

  // uploadAvatar: createAsyncThunk(
  //   getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].uploadAvatar),
  //   async (image: File) => await UserService.uploadAvatar(image),
  // ),
};

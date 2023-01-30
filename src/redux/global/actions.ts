import { Nottification } from './../../components/Nottification/Nottification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { UserType } from '../../types';
import UserService from '../../services/UserService';
import i18next from 'i18next';
import Cookies from 'js-cookie';
import Logo from '../../assets/images/logo.png';

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
    async ({ username, password }: authType) => {
      try {
        const response = await AuthService.login(username, password);

        localStorage.setItem('access-token', `${response.data.access_token}`);
        // document.cookie = `refresh_token=${response.data.refresh_token}`;

        return {
          isAuth: true,
          ...response.data,
        };
      } catch (e: any) {
        Nottification({
          text: e.response.data.description,
          avatar: Logo,
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
      const refreshToken = Cookies.get('refresh_token');

      if (!refreshToken) {
        return false;
      }

      try {
        console.log(document.cookie);
        // axios.defaults.withCredentials = true;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {
          withCredentials: true,
          headers: {
            Cookie: `token: ${document.cookie}`,
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        });

        console.log(response);
        localStorage.setItem('access-token', response.data.accessToken);
        return {
          isAuth: true,
          ...response.data.user,
        };
      } catch (e) {
        console.log(e);
      }
    },
  ),

  logout: createAsyncThunk(
    getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].logout),
    async () => {
      const refreshToken = localStorage.getItem('refresh-token');
      let response;
      if (refreshToken) {
        response = await AuthService.logout(refreshToken);
      } else {
        localStorage.removeItem('token');
        window.location.href = '/';
      }

      if (response?.status === 201) {
        localStorage.removeItem('token');
        // localStorage.removeItem('access-token');
        window.location.href = '/';
      }

      return true;
    },
  ),

  // editSettings: createAsyncThunk(
  //   getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].edit),
  //   async (newUser: UserType) => {
  //     return await UserService.editUser(newUser);
  //   },
  // ),

  // uploadAvatar: createAsyncThunk(
  //   getActionName(modules.GLOBAL, actionNames[modules.GLOBAL].uploadAvatar),
  //   async (image: File) => await UserService.uploadAvatar(image),
  // ),
};

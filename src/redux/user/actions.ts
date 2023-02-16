import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionNames } from '../actionNames';
import { getActionName } from '../getActionName';
import { modules } from '../modules';
import { createUserType, editSettingsType } from '../../types';
import UserService from '../../services/UserService';

type editUserType = {
  newUser: createUserType;
  id: string;
};

export const userActions = {
  getUsers: createAsyncThunk(
    getActionName(modules.USER, actionNames[modules.USER].getUsers),
    async () => {
      const data = await UserService.getUsers();
      return data;
    },
  ),

  getUserGroups: createAsyncThunk(
    getActionName(modules.USER, actionNames[modules.USER].getUserGroups),
    async () => {
      const data = await UserService.getUserGroups();
      return data;
    },
  ),

  addUser: createAsyncThunk(
    getActionName(modules.USER, actionNames[modules.USER].addUser),
    async (newUser: createUserType) => {
      const data = await UserService.addUser(newUser);
      return data;
    },
  ),

  editUser: createAsyncThunk(
    getActionName(modules.USER, actionNames[modules.USER].editUser),
    async ({ newUser, id }: editUserType) => {
      const data = await UserService.editUser(newUser, id);
      return data;
    },
  ),

  editSettings: createAsyncThunk(
    getActionName(modules.USER, actionNames[modules.USER].editSettings),
    async (newUser: editSettingsType) => {
      const data = await UserService.editSetting(newUser);
      return data;
    },
  ),

  getCurrentUser: createAsyncThunk(
    getActionName(modules.USER, actionNames[modules.USER].editSettings),
    async (userId: number) => {
      const data = await UserService.getCurrentUser(userId);
      return data;
    },
  ),
};

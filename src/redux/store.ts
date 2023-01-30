import { deviceReducer } from './devices/reducers';
import { combineReducers, configureStore, Slice } from '@reduxjs/toolkit';
import { visitReducer } from './visit/reducers';
import { imageReducer } from './images/reducers';
import { exisReducer } from './exis/reducers';
import { globalReducer } from './global/reducer';
import { userReducer } from './user/reducers';
import { deviceActions } from './devices/actions';

const rootReducer = combineReducers({
  globalReducer,
  exisReducer,
  deviceReducer,
  imageReducer,
  visitReducer,
  userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type RootStateExtended<SL extends Slice> = ReturnType<typeof store.getState> &
  Record<SL['name'], ReturnType<SL['reducer']>>;

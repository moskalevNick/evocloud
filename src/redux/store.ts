import { combineReducers, configureStore, Slice } from '@reduxjs/toolkit';
import { widgetReducer } from './widgets/reducers';
import { deviceReducer } from './devices/reducers';
import { globalReducer } from './global/reducer';
import { userReducer } from './user/reducers';

const rootReducer = combineReducers({
  globalReducer,
  deviceReducer,
  userReducer,
  widgetReducer,
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

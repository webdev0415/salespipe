import {
  AnyAction,
  ThunkDispatch,
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import rootReducer, { RootState } from './rootReducer';

import { middleware } from './middleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), ...middleware],
  devTools: process.env.NODE_ENV !== 'production'
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newRootReducer = require('./rootReducer').default;

    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, AnyAction>;

export default store;

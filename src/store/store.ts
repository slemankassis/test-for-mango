import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer, { RootState } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type storeType = typeof store;

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root-reducer', () => {
    const newRootReducer = require('./root-reducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

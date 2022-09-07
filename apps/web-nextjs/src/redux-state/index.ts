import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore
} from 'redux-persist';

import runSagas, { sagaMiddleware } from './saga';
import { createWrapper, Context } from 'next-redux-wrapper'


const isDev = process.env.NODE_ENV !== 'production'
const blackListedAction = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
const middlewares = [sagaMiddleware];

const initializeStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [...blackListedAction],
      },
    }).concat(middlewares),
    devTools: isDev,
  });

  runSagas();

  return store;
};

export const store = initializeStore();
const makeStore = () => store

export const wrapper = createWrapper<AppState>(makeStore);
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof makeStore>;
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice.ts';
import { usersApi } from './api/users.api.ts';
import { testsApi } from './api/tests.api.ts';

const rootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  [testsApi.reducerPath]: testsApi.reducer,
  auth: authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(usersApi.middleware, testsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

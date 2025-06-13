import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';

import authSlice, {authType} from './slices/authSlice';
// import userSlice, {userType} from './slices/userSlice';
import {useDispatch} from 'react-redux';

export type RootState = {
  auth: authType;
  //   user: userType;
};

const rootReducer = combineReducers({
  //   app: appSlice,
  auth: authSlice,
  //   user: userSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const resetStore = async () => {
  await AsyncStorage.clear(); // Clear the storage used by redux-persist
  const persistor = persistStore(store);
  persistor.purge(); // Clear the persisted store
  store.dispatch({type: 'RESET_STORE'}); // Reset the store state to its initial state
};
// resetStore();

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

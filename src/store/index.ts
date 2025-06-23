import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants'

import authSlice from './slices/authSlice'

import noteSlice from './slices/noteSlice'

import { useDispatch } from 'react-redux'
import { authType } from '@interfaces'
import { authApi } from './services/authApi'
import { noteState } from './slices/noteSlice'

export type RootState = {
  auth: authType
  note: noteState
}

const rootReducer = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  note: noteSlice,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const resetStore = async () => {
  await AsyncStorage.clear()

  const persistor = persistStore(store)

  persistor.purge()
  store.dispatch({ type: 'RESET_STORE' })
}

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

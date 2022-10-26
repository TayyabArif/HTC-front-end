import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './signIn'
import sitesReducer from './sites'
import filtersReducer from './filters'
import loadingReducer from './loading'
import serviceReducer from './requestService'
import proposalsReducer from './proposals'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth']
}

const rootReducer = combineReducers({
  auth: authReducer,
  sites: sitesReducer,
  filters: filtersReducer,
  loading: loadingReducer,
  services: serviceReducer,
  proposals: proposalsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

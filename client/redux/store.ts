"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./features/apiSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer } from 'redux-persist';
import authSlice from "./features/auth/authSlice";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedAuthReducer = persistReducer(persistConfig, combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  }));

export const store = configureStore({
    reducer: persistedAuthReducer,
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware)
})

export const persistor = persistStore(store);
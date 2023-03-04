import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import RootReducer from './modules/RootReducer';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'dadosStorage',
    storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
    }),
});

export type EstadoDaStore = ReturnType<typeof store.getState>;

export type MeuDespachante = typeof store.dispatch;

export const persistor = persistStore(store);
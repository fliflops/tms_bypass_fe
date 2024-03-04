import { configureStore,combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/authSlice';
import {errorHandler, apiSlice} from './api.slice';
import tripSlice from './slices/trip.slice';
 

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const reducers:any = combineReducers({
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth: persistReducer(persistConfig,authSlice),
    trip: tripSlice
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
        .concat(apiSlice.middleware,errorHandler),
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
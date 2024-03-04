import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {isRejectedWithValue} from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store';

console.log( import.meta.env.VITE_BASE_URL)
        
const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders:(headers,{ getState }) => {
        const token = (getState() as RootState).auth.token;
        if(token) {
            headers.set('x-access-token', `${token}`)
        }
        return headers   
    }
})

export const apiSlice = createApi({
    reducerPath:'apiSlice',
    baseQuery: baseQuery,
    endpoints: () => ({}),
    tagTypes:['Table']
}) 

export const errorHandler: Middleware = () => (next) => (action) => {
    if(isRejectedWithValue(action)){
        console.log(action.payload)
        //toast.error(action.payload.data.message)
    }
    return next(action)
} 
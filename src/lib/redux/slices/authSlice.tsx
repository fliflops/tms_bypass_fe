import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../store';

type authSliceType = {
    token: string | null;
    access: []
}

const initialState:authSliceType = {
    token: null,
    access: []
}

export const authSlice = createSlice({
    name:'auth',
    initialState: initialState,
    reducers: {
        setLogin: (state, action:  PayloadAction<authSliceType>) => {
            state.access = action.payload.access
            state.token = action.payload.token
        },
        setLogOut:() => initialState
    }
})

export const getAccessToken = (state: RootState) => state.auth.token
export const {setLogin,setLogOut} = authSlice.actions;
export default authSlice.reducer;
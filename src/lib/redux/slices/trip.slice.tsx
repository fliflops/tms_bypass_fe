import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../store';

type tripSliceType = {
    uploadedTrip: any[],
    job_id: string | null;
}

const initialState: tripSliceType = {
    uploadedTrip: [],
    job_id: null
}

export const tripSlice = createSlice({
    name:'trip',
    initialState,
    reducers: {
        setTrip: (state, action:PayloadAction<any[]>) => {
            state.uploadedTrip = action.payload
        },
        setJobId: (state, action: PayloadAction<string>) => {
            state.job_id = action.payload
        },
        resetTripState: () => initialState 
    }
})

export const getTripState = (state:RootState) => state.trip
export const {setTrip, setJobId,resetTripState} = tripSlice.actions
export default tripSlice.reducer
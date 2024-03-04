import {apiSlice} from '@/lib/redux/api.slice';
import {saveAs} from 'file-saver';
const tripApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        tripUpload: builder.mutation<any,FormData>({
            query:(data) => ({
                url:'v1/trip',
                method:'PUT',
                body: data
            })
        }),
        tripCreateJob: builder.mutation<any,any[]>({
            query:(data) => ({
                url:'v1/trip/job',
                method:'POST',
                body:data
            })
        }),
        tripConvert: builder.mutation<any,string | undefined>({
            query:(jobId) => ({
                url:'v1/trip/job/'+jobId,
                method:'POST'
            })
        }),
        getRawTrip: builder.query<any,string>({
            query:(jobId) => ({
                url: 'v1/trip/job/'+jobId,
                method:'GET'
            })
        }),
        downloadKronos: builder.mutation<any,string>({
            query:(filePath)=>({
                url:'v1/trip/kronos-template',
                body:{
                    filePath
                },
                method: 'POST',
                responseHandler: (res) => res.blob(),
                cache: 'no-cache',
            }),
            transformResponse:(res:any) => {
                saveAs(res,'kronos_handoff.xlsx')
            }
        })
    })
})

export const {
    useTripConvertMutation,
    useTripUploadMutation,
    useGetRawTripQuery,
    useTripCreateJobMutation,
    useDownloadKronosMutation
} = tripApiSlice
import {apiSlice} from '../api.slice';

const tableApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPaginated: builder.query<any,{
            page: number;
            result: number;
            route: string;
            order?: string;
            filters?: any
        }>({
            query: (args) => ({
                url: args.route,
                params:{
                    page:   args.page,
                    result: args.result,
                    order:  args.order,
                    ...args.filters
                }
            }),
            providesTags:['Table']
        })
    })
})

export const {
    useGetPaginatedQuery
} = tableApiSlice;
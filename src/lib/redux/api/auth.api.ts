import {apiSlice} from '@/lib/redux/api.slice';

type auth = {
    user_email: string;
    user_password: string;
};

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        logIn: builder.mutation<any,auth>({
            query:(args) => ({
                url:'v1/auth/login',
                method:'POST',
                body:args
            })
        }),
        logOut: builder.mutation<any,''>({
            query:() => ({
                url:'v1/auth/logout',
                method:'POST'
            })
        })
    })
})

export const {
    useLogInMutation,
    useLogOutMutation
} = authApiSlice;
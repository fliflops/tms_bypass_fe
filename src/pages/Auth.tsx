import { Card, CardHeader, CardTitle, CardContent,CardDescription, CardFooter} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import { Flex } from '@radix-ui/themes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import React from 'react';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/lib/redux/reduxHooks';
import { getAccessToken, setLogin } from '@/lib/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {useLogInMutation} from '@api/auth.api';

interface AuthProps {

}

const authSchema = yup.object({
    email: yup.string().email().required('Email is Required'),
    password: yup.string().required('Password is Required')
})

type authSchemaType = yup.InferType<typeof authSchema>

const Auth: React.FC<AuthProps> = () => {
    const token = useAppSelector(getAccessToken)
    const [login,{isLoading}] = useLogInMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const form = useForm<authSchemaType>({
        resolver: yupResolver(authSchema),
        defaultValues: {
            email:'',
            password: ''
        }
    })

    const onSubmit = async (values: authSchemaType) => {
        await login({
            user_email: values.email,
            user_password: values.password
        }).unwrap()
        .then(result => {
            dispatch(setLogin({
                token: result.token,
                access:[]
            }))
            navigate('/',{replace:true})
        })
    }

    if(token) {
        return <Navigate to={'/'} replace/>
    }

    return <div className='h-screen'>
        <Flex height={'100%'} direction={'column'} justify={'center'} align={'center'}>
            <Form {...form}>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Welcome to TMS Planning System</CardDescription>
                </CardHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className='flex flex-col gap-2'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Email' type='email' {...field}/>
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Password' type='password' {...field}/>
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />   
                            </CardContent> 
                            <CardFooter className='flex justify-end'>
                                <Button isLoading={isLoading} type='submit'>Login</Button>
                            </CardFooter>                                
                        </form>            
                </Card>
            </Form>
        </Flex>;
    </div>
}

export default Auth
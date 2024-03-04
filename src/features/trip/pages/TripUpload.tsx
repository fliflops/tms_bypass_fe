import React from 'react';
import Dropzone from '@/components/dropzone';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, Grid, Flex } from '@radix-ui/themes';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {useTripUploadMutation,useTripCreateJobMutation} from '@api/trip.api';
import TripTable from '../components/tables/TripTable';
import { useAppDispatch, useAppSelector } from '@/lib/redux/reduxHooks';
import { getTripState, resetTripState,setJobId , setTrip } from '@/lib/redux/slices/trip.slice';
import { useNavigate } from 'react-router-dom';

interface TripUploadProps {}

const uploadSchema = yup.object({
    file: yup.mixed().required('Required')
})

type uploadSchemaType = yup.InferType<typeof uploadSchema>

const TripUpload: React.FC<TripUploadProps> = () => {
    const [ upload, {isLoading} ] = useTripUploadMutation();
    const [ createJob, tripConvertProps] = useTripCreateJobMutation();
    const { uploadedTrip,job_id } = useAppSelector(getTripState)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const form = useForm<uploadSchemaType>({
        resolver: yupResolver(uploadSchema),
    })
    
    const handleFileChange = (file: File[]) => {
        form.setValue('file', file)
    }

    const onSubmit = async (values:uploadSchemaType) => {
        const data:{file: any} = values;
        const formData = new FormData();
        formData.append('file', data.file[0] ?? '')
        
        await upload(formData).unwrap().then((result: any[]) => {
            dispatch(setTrip(result))
        })
    }   

    const handleConvert = async() => {
        await createJob(uploadedTrip).unwrap().then((result:any) => {
            dispatch(setJobId(result))
        })
    }

    const handleReset = async() => {
        dispatch(resetTripState())
    }

    const handleNavigate = () => {
        navigate('/trip-convert/'+job_id,{
            replace:true
        })
    }
    
    return <>
        <div className='flex flex-col'>
            <Text size='5' weight={'bold'}>Upload Trip</Text>
            <Text size='1' weight={'bold'} color='gray'>Upload your trip here</Text>
        </div>
        <Grid columns={'3'} gap='2'>
            <div className='border border-gray container'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Flex direction={'column'} py='2' gap={'2'}>
                            <FormField
                                control={form.control}
                                name='file'
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Upload Template: </FormLabel>
                                        <Dropzone onDrop={handleFileChange}/>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                            <Flex justify={'end'} gap='1'>
                                <Button isLoading={isLoading} type='submit'>Submit</Button>
                            </Flex>
                        </Flex>
                    </form>
                </Form>
            </div>
            <div className='border border-gray container col-span-2'>
                <Flex direction={'column'} py='2' gap='2'>
                    <Flex direction={'column'} gap='2'>
                        <Text size={'2'} weight={'bold'}>Upload Details</Text>
                        <Flex justify={'between'}>
                            <div><Text size={'2'}>Job ID: </Text>{ job_id ? <Button variant={'link'} className='hover:underline font-semibold text-blue-400' onClick={handleNavigate}>{job_id}</Button> : null} </div>
                            <Flex gap='2'>
                                <Button size={'sm'} isLoading={tripConvertProps.isLoading} type='button' disabled={job_id || uploadedTrip.length === 0} onClick={handleConvert}>Create Link</Button>
                                <Button size='sm' onClick={handleReset}>Reset</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                    <TripTable/>
                </Flex>
            </div>
        </Grid>
    </>;
}

export default TripUpload
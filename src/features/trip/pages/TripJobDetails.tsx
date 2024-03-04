import React from 'react'
import { Text, Grid, Flex } from '@radix-ui/themes';
import { Navigate, useParams } from 'react-router-dom';
import { useDownloadKronosMutation, useGetRawTripQuery, useTripConvertMutation } from '@/lib/redux/api/trip.api';
import Label from '@/components/label';
import { Button } from '@/components/ui/button';
import { Paperclip } from 'lucide-react';

interface TripJobDetailsProps {

}

const TripJobDetails: React.FC<TripJobDetailsProps> = () => {
    
    const {id} = useParams();
    const getRawTrip = useGetRawTripQuery(id ?? 'N/A');
    const [convert, convertProps] = useTripConvertMutation();
    const [download, downloadProps] = useDownloadKronosMutation();
    
    if(getRawTrip.isLoading) return <>...Loading</>
    if(!getRawTrip.data && getRawTrip.isSuccess) return <Navigate to='/' replace/>


    const handleConvert = async() => {
        await convert(id).unwrap()
    }

    const handleDownload = async() => {
        await download(getRawTrip.data.file_path)
    }
   
    return <>
        <div className='flex flex-col'>
            <Text size='5' weight={'bold'}>Trip Conversion Details</Text>
            <Text size='1' weight={'bold'} color='gray'>Conversion Details: {id}</Text>
        </div>
        <Grid rows={'2'} gap='2'>
            <Flex className='border border-gray rounded-md' direction={'column'} p={'2'} gap='2'>
                <Text weight={'bold'}>Trip Upload Information</Text>
                
                <Grid columns={'2'} rows={'3'} gap='2'>
                    <Label label='Job ID' value={id}/>
                    <Label label='Upload ID' value={getRawTrip.data.upload_id}/>
                    <Label label='Upload Status' value={getRawTrip.data.upload_status}/>
                    <Label label='Status' value={getRawTrip.data.status}/>
                    <Label label='Error Message' value={getRawTrip.data.err_message}/>
                    <Flex align={'center'}>
                        <Text size={'2'} weight={'bold'}>File:</Text>
                        {getRawTrip.data?.file_path ?  <Button isLoading={downloadProps.isLoading} onClick={handleDownload} variant={'link'} size={'sm'} className='text-blue-600'><Paperclip className='h-5'/> Download</Button> : 'N/A'}
                    </Flex>
                    {/* <Label label='File'> {getRawTrip.data?.file_path ? <Button variant={'link'} size={'sm'} className='text-blue-600'><Paperclip className='h-5'/> Download</Button> : 'N/A'} </Label> */}
                </Grid>
                <Flex gap='2'>
                    <Flex grow={'1'}>
                        <Button isLoading={getRawTrip.isFetching} size={'sm'} variant={'outline'} onClick={getRawTrip.refetch}>Refresh</Button>
                    </Flex>
                    <Button size={'sm'} variant={'destructive'}>Cancel</Button>
                    <Button size={'sm'} isLoading={convertProps.isLoading} onClick={handleConvert} disabled={getRawTrip.data.status !== 'DRAFT' || getRawTrip.data.upload_status !== 'COMPLETED'}>Confirm</Button>
                </Flex>
            </Flex>
            <Flex>
                
            </Flex>
        </Grid>
    </>;
}

export default TripJobDetails
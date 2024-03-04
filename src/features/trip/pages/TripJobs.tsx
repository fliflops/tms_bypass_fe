import React from 'react'
import SubHeader from '@/layout/SubHeader';
import {Text, Flex } from '@radix-ui/themes';
import TripJobTable from '../components/tables/TripJobTable';

interface TripJobsProps {

}

const TripJobs: React.FC<TripJobsProps> = () => {
    return <>
        <SubHeader title='Trip Convert'/>
        <Flex className='border border-gray p-2 rounded-md' direction={'column'} gap={'2'}>
            <div className='flex flex-col'>
                <Text size='5' weight={'bold'}>Trip Jobs</Text>
                <Text size='1' weight={'bold'} color='gray'>List of Ongoing Jobs</Text>
            </div>
            <div>
                <TripJobTable/>
            </div>
        </Flex>
    </>;
}

export default TripJobs
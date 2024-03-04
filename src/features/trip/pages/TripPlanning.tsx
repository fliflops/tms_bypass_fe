import React from 'react';
import SubHeader from '@/layout/SubHeader';
import { Flex } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';

interface TripPlanningProps {

}

const TripPlanning: React.FC<TripPlanningProps> = () => {
    return <>
        <SubHeader title='Trip Planning'/>
        <Flex className='border border-gray rounded-sm' direction='column' gap='2' px='3' py={'3'}>
            <Outlet/>
        </Flex>
    </>;
}

export default TripPlanning
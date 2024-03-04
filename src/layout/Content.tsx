import React from 'react';
import {Flex} from '@radix-ui/themes'
import { Outlet } from 'react-router-dom';

interface ContentProps {

}

const Content: React.FC<ContentProps> = () => {
    return <Flex className='top-5 relative' px='9' direction={'column'}>
        <div className='h-screen flex flex-col gap-2'>
            <Outlet/>
        </div>
    </Flex>;
}

export default Content
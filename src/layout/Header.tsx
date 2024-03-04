import React from 'react';
import {Flex} from '@radix-ui/themes';
// import {Menu} from 'lucide-react';
import Sidenav from './Sidenav';

interface HeaderProps {
    children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({
    children
}) => {
    return <>
        <Flex className='border border-gray backdrop-blur-sm z-10' px='9' align={'center'} height={'9'} position={'sticky'} top='0'>
            <Flex grow={'1'}>
                <Flex gap='2'>
                    <Sidenav/>
                    Header
                </Flex>
            </Flex>
            <Flex>
                {children}
            </Flex>
        </Flex>
    </>;
}

export default Header

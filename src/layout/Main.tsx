import React from 'react'
import Header from './Header';
import UserMenu from './UserMenu';
import Content from './Content';
import { Box } from '@radix-ui/themes';

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
    return <Box position={'relative'}>
        <Header>
            <UserMenu/>
        </Header>
        <Content/>
    </Box>;
}

export default Main
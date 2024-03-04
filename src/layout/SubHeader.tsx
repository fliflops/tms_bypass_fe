import { Flex, Text } from '@radix-ui/themes';
import React from 'react'

interface SubHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode
}

const SubHeader: React.FC<SubHeaderProps> = (props) => {
    return <Flex className='border border-gray rounded-sm' height={'9'} pl={'3'} align='center'>
            <Flex grow={'1'}>
                <Text size={'6'} weight={'bold'}>{props.title}</Text>    
            </Flex>
            <Flex gap={'2'}>
                {props.children}
            </Flex>
    </Flex>
}

export default SubHeader
import { Text } from '@radix-ui/themes';
import React from 'react'


interface labelProps {
    label: string;
    value?: string;
    size?: "2" | "1" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
    children?: React.ReactNode
}

const label: React.FC<labelProps> = ({size='2',...props}) => {
    return <Text size={size}><Text weight={'bold'}>{props.label}: </Text> {props.value} {props.children}</Text>
}

export default label
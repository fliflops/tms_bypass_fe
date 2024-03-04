import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Flex, IconButton } from '@radix-ui/themes'
import { CircleUser } from 'lucide-react'
import {Button} from '@/components/ui/button';
import {useLogOutMutation} from '@api/auth.api';
import {setLogOut} from '@slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/lib/redux/reduxHooks';

interface UserMenuProps {

}

const UserMenu: React.FC<UserMenuProps> = () => {
    const [logOut, {isLoading}] = useLogOutMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const handleSignOut = async() => {
        
        await logOut('')
        .unwrap()
        .then(() => {
            dispatch(setLogOut())
            navigate('/login', {replace:true})
        })
    }

    return <Popover>
        <PopoverTrigger asChild>
            <IconButton color='gray' variant='ghost'><CircleUser/></IconButton>
        </PopoverTrigger>
        <PopoverContent>
            <Flex dir='column' justify={'end'}>
                <Button isLoading={isLoading} className='w-full' onClick={handleSignOut}>Sign Out</Button>
            </Flex>
        </PopoverContent>
    </Popover>
}

export default UserMenu
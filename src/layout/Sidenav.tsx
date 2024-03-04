import React from 'react'
import {
    Sheet,
    // SheetClose,
    SheetContent,
    //SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {Separator} from '@/components/ui/separator';
import { NavLink } from 'react-router-dom';

import { Flex, IconButton } from '@radix-ui/themes'
import { Menu } from 'lucide-react';
import modules from '@/lib/modules';

interface SidenavProps {
 
}

const Sidenav: React.FC<SidenavProps> = () => {
    const [open,setOpen] = React.useState(false)

    const renderSideNavItems = () => {
        return modules.map(item => (
            <AccordionItem key={item.header_id} value={item.header_id}>
                <AccordionTrigger>{item.header}</AccordionTrigger>
                <AccordionContent>
                    <Flex direction={'column'} gap='2'>
                        {
                            item.childrens.map(c => (
                                <NavLink onClick={() => setOpen(false)} key={c.path} to={c.path}>
                                    <Flex className='border border-gray-300 h-12 p-5 rounded-sm hover:bg-primary hover:text-primary-foreground' align={'center'}>
                                        <span className='font-semibold'>{c.pathName}</span>
                                    </Flex>
                                </NavLink>
                            ))
                        }
                    </Flex>
                </AccordionContent>
            </AccordionItem>
        ))
    }   

    return <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <IconButton variant='ghost' color='gray'>
                <Menu/>
            </IconButton>
        </SheetTrigger>
        <SheetContent side={'left'}>
            <SheetHeader className='h-20'>
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <Separator />
            <Accordion type='single' collapsible className='w-full'>
                {
                    renderSideNavItems()
                }
            </Accordion>
            <SheetFooter>
                
            </SheetFooter>
        </SheetContent>

    </Sheet>
}

export default Sidenav
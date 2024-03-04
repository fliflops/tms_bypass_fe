import React from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Flex, Text } from "@radix-ui/themes"
import { Button } from "../ui/button"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react"
import { useGetPaginatedQuery } from "@/lib/redux/api/table.api";


interface TableProps <TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    route: string;
    defaultPageSize?: 5|10|20|30|40|50;
}

const DataTable = <TData,TValue>({columns, route}: TableProps<TData,TValue>) => {
    const [{pageIndex,pageSize},setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    })

    const {data = {},isFetching,refetch} = useGetPaginatedQuery({
        route:	route,
		result: pageSize,
		page: 	pageIndex,
		// order,
		// filters  
    })

    const table = useReactTable({
        data: data.data || [],
        columns,
        state:{
            pagination:{
                pageIndex,
                pageSize
            },
        },
        onPaginationChange:     setPagination,
        getCoreRowModel:        getCoreRowModel(),
        getFilteredRowModel:    getFilteredRowModel(),
        getPaginationRowModel:  getPaginationRowModel(),
        manualPagination: 		true,
    })

    return <div className='w-full rounded-md border'>
        <div>
            {isFetching ? <>Loading...</> : null}
        </div>
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                        <TableCell className='text-xs' key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
        <Flex p='2'>
        <Flex align={'center'} grow={'1'}>
            <Text size='2'>Page <Text weight={'bold'}>{table.getState().pagination.pageIndex + 1}</Text> of <Text weight={'bold'}>{table.getPageCount()}</Text></Text>
        </Flex>
        <Flex gap='1'>
            <Button className='h-7 p-1' variant={'outline'} disabled={!table.getCanPreviousPage()}  onClick={() => table.setPageIndex(0)}>
                <ChevronFirst/>
            </Button>
            <Button 
                className='h-7 p-1'
                variant={'outline'} 
                size={'sm'}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <ChevronLeft/>
            </Button>
            <Button
                className='h-7 p-1' 
                variant={'outline'} 
                size={'sm'}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <ChevronRight/>
            </Button>
            <Button 
                className='h-7 p-1 text-xs' 
                variant={'outline'} 
                size={'sm'}  
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
                <ChevronLast/>
            </Button>
        </Flex>
    </Flex>
</div>
}


export default DataTable
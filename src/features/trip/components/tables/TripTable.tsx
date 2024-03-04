import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import DataTable  from '@/components/table/Table';
import { Flex, Text } from '@radix-ui/themes';
import { useAppSelector } from '@/lib/redux/reduxHooks';
import { getTripState } from '@/lib/redux/slices/trip.slice';

interface TripTableProps {

}

type TripTable = {
    br_no:            string,	
    invoice_no:       string,	
    principal:        string,	
    trip_no:          string,	
    from_description: string,	
    from_location:    string,	
    to_description:   string,	
    to_location:      string,	
    vehicle_type:     string,	
    volume:           string,	
    weight:           string,	
    sequence:         string,	
    service_type:     string,	
    location:         string,
    rdd:              string
}

const TripTable: React.FC<TripTableProps> = () => {
    const {uploadedTrip} = useAppSelector(getTripState)
    const columns: ColumnDef<TripTable>[] = [
        {
            accessorKey:'br_no',
            header:'BR No'
        },
        {
            accessorKey:'invoice_no',
            header:'Invoice No'
        },
        {
            accessorKey:'principal',
            header:'Principal'
        },
        {
            accessorKey:'trip_no',
            header:'Trip No'
        },
        {
            accessorKey:'from_description',
            header:'From Description'
        },
        {
            accessorKey:'from_location',
            header:'From Location'
        },
        {
            accessorKey:'to_description',
            header:'To Description'
        },
        {
            accessorKey:'to_location',
            header:'To Location'
        },
        {
            accessorKey:'vehicle_type',
            header:'Vehicle Type'
        },
        {
            accessorKey:'volume',
            header:'Volume'
        },
        {
            accessorKey:'weight',
            header:'Weight'
        },
        {
            accessorKey:'sequence',
            header:'Sequence'
        },
        {
            accessorKey:'service_type',
            header:'Service Type'
        },
        {
            accessorKey:'location',
            header:'Location'
        },
        {
            accessorKey:'rdd',
            header:'RDD'
        },
    ]
    return <Flex direction={'column'} gap='2'>
        <Text size={'2'} weight={'bold'}>Uploaded Trips</Text>
        <DataTable columns={columns} data={uploadedTrip}/>
    </Flex>;
}

export default TripTable
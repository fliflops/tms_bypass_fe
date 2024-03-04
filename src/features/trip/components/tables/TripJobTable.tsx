import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import PaginatedTable from '@/components/table/PaginatedTable';
import { Button } from '@/components/ui/button';
import { useDownloadKronosMutation } from '@/lib/redux/api/trip.api';
import { useNavigate } from 'react-router-dom';


interface TripJobTableProps {

}

type TripJobType = {
    job_id: string,
    upload_id: string,
    upload_status: string,
    status: string,
    err_message: string
    createdAt: string,
    file_path: string
}

const TripJobTable: React.FC<TripJobTableProps> = () => {
    const [downloadTemplate,{isLoading}] = useDownloadKronosMutation()
    const navigate = useNavigate()

    const columns: ColumnDef<TripJobType>[] = [
        {
            accessorKey:'job_id',
            header:'Job Id',
            cell(props) {
                const jobId:any = props.getValue(); 
                const handleNav = () => {
                    navigate('/trip-convert/'+jobId)
                }
                return <Button onClick={handleNav} variant={'link'}>{jobId}</Button>
            },
        },
        {
            accessorKey: 'upload_id',
            header:'Upload ID'
        },
        {
            accessorKey:'upload_status',
            header:'Upload Status'
        },
        {
            accessorKey:'status',
            header:'Status'
        },
        {
            accessorKey:'err_message',
            header:'Error Message'
        },
        {
            accessorKey:'createdAt',
            header:'Created Date'
        },
        {
            header:'Download',
            cell(props) {
                const handleDownload = async() => {
                    await downloadTemplate(props.row.original.file_path)
                }
                return <Button isLoading={isLoading} onClick={handleDownload} disabled={!props.row.original.file_path} size='sm'>Download</Button>
            },
        }
    ]

    return <>
        <PaginatedTable
            columns={columns}
            route='/v1/trip/job'
        />
    </>;
}

export default TripJobTable
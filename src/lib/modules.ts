export type moduleType = {
    header_id: string;
    header: string;
    childrens:{
        id: string;
        path:string;
        pathName: string
    }[]
}[]

const modules:moduleType = [
    {
        header_id: 'trip_management',
        header: 'Trip Management',
        childrens:[
            {
                id:'',
                path:'/trip/planning',
                pathName:'Plan Trips'
            },
            {
                id:'',
                path:'trip-convert',
                pathName:'Trip Convert'
            }
        ]
    },
    {
        header_id: 'administration',
        header:'Administration',
        childrens:[
            {
                id:'',
                path:'admin/users',
                pathName:'Users'
            }
        ]
    }
]

export default modules
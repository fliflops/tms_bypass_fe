import App from "@/App";
import Auth from "@/pages/Auth";
import {createBrowserRouter} from "react-router-dom";
import {TripPlanning, TripUpload, TripJobDetails, TripJobs} from '@/features/trip';

const route = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                path:'/trip/planning',
                element:<TripPlanning/>,
                children: [
                    {
                        index:true,
                        element:<TripUpload/>
                    }
                ]
            },
            {
                path:'/trip-convert',
                children:[
                    {
                        index:true,
                        element:<TripJobs/>
                    },
                    {
                        path:':id',
                        element: <TripJobDetails/>
                    }
                ]
            },
            {
                path:'/admin/users',
                element:<></>
            }
        ]
    },
    {
        path:'/login',
        element:<Auth/>
    }
])

export default route;
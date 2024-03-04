
import Main from "./layout/Main";
import {getAccessToken} from '@slices/authSlice';
import { useAppSelector } from "./lib/redux/reduxHooks";
import { Navigate } from "react-router-dom";

function App() {
  const token = useAppSelector(getAccessToken);

  if(!token) {
    return <Navigate to='/login' replace/>
  }

  return (
    <Main/>
  )
}

export default App

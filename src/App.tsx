
import React from 'react';
import Main from "./layout/Main";
import {getAccessToken} from '@slices/authSlice';
import { useAppSelector } from "./lib/redux/reduxHooks";
import { Navigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider"

function App() {
  const token = useAppSelector(getAccessToken);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setTheme('light')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(!token) {
    return <Navigate to='/login' replace/>
  }

  return (
    <Main/>
  )
}

export default App

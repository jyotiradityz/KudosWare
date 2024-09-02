import React, { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth';
import Profile from './pages/profile';
import { useAppStore } from './store';
import apiClient from './lib/api-client';
import { GET_USER_INFO } from './utils/constant';
import Job from './pages/job'; 
import JobUser from './pages/userjobs';

const App = () => {

  const PrivateRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to="/auth" />
  }
  const AuthRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to="/job" /> : children;
  }
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if (res.status === 200 && res.data.id) {
          setUserInfo(res.data);
        }
        else {
          setUserInfo(undefined)
        }
      } catch (error) {
        setUserInfo(undefined)
        console.log(error);
      }
      finally {
        setLoading(false)
      }

    }
    if (!userInfo) {
      getUserData();
    }
    else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo])
  if (loading) {
    return <div>Loading Wait for some time, Render Server is restating.....</div>
  }return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/job" element={<PrivateRoute><Job /></PrivateRoute>} />
        <Route path="/appliedjob" element={<PrivateRoute> <JobUser/> </PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App

import './App.scss'

import { RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import { Box } from '@mui/material';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Menu from './components/atoms/Menu';
import Actions from './components/pages/Actions';
import Login from './components/pages/Authentication/Login';
import SignUp from './components/pages/Authentication/SignUp';
import Dashboard from './components/pages/Dashboard';

const AuthWrapper = () => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) return <RedirectToSignIn />

  return <div className='flex bg-pale-50 h-screen p-3 gap-3'>
    <Menu />
    <Box className="main w-full">
      <Outlet /> 
    </Box>
  </div >
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<AuthWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/actions" element={<Actions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

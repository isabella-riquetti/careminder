import './App.scss'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Authentication/Login';
import SignUp from './components/pages/Authentication/SignUp';
import { RedirectToSignIn, useAuth, UserButton } from '@clerk/clerk-react';
import Dashboard from './components/pages/Dashboard';
import { Box } from '@mui/material';
import Icon from "./assets/icon.svg?react";

const AuthWrapper = () => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) return <RedirectToSignIn />

  return <div className='flex bg-pale-50 h-screen p-3 gap-3'>
    <Box className="flex flex-col w-[80px] items-center bg-pink-200 rounded-xl shadow">
      <Icon className='mt-3 w-[50px] h-[50px]' />
      <div className='mb-2 mt-auto'>
        <UserButton />
      </div>
    </Box>
    <Box className="w-full">
      <Outlet />
    </Box>
  </div>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<AuthWrapper />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

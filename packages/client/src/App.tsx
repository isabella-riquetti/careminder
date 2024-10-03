import './App.scss'

import { RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import { Box } from '@mui/material';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Header from './components/atoms/Header';
import Login from './components/pages/Authentication/Login';
import SignUp from './components/pages/Authentication/SignUp';
import Dashboard from './components/pages/Dashboard';
import { Hero } from './components/pages/Hero';

const AuthWrapper = () => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) return <RedirectToSignIn />

  return <div className='flex flex-col bg-pale-50 h-screen p-3 gap-3'>
    <Header background />
    <Box className="main w-full">
      <Outlet />
    </Box>
  </div >
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Hero />} />
        <Route element={<AuthWrapper />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

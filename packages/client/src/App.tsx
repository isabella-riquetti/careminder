import './App.scss'

import { RedirectToSignIn, useAuth, UserButton, useUser } from '@clerk/clerk-react';
import { Box } from '@mui/material';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Icon from "./assets/icons/sidebar/icon.svg?react";
import SelectOptionIcon from "./assets/icons/sidebar/selectOption.svg?react";
import MenuItem from './components/atoms/MenuItem';
import Actions from './components/pages/Actions';
import Login from './components/pages/Authentication/Login';
import SignUp from './components/pages/Authentication/SignUp';
import Dashboard from './components/pages/Dashboard';

const AuthWrapper = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  if (!isSignedIn) return <RedirectToSignIn />

  return <div className='flex bg-pale-50 h-screen p-3 gap-3'>
    <Box className="group flex p-2 flex-col w-fit items-center bg-pink-200 rounded-xl shadow hover:w-fit lg:items-start hover:items-start transition-all duration-300 gap-3">
      <MenuItem className="mt-3" text="CareMinder" href="/" icon={Icon} />
      <hr />
      <MenuItem text="Actions" href="/actions" icon={SelectOptionIcon} />
      <MenuItem text={user?.firstName ?? "User"} className='mb-2 mt-auto'>
        <UserButton />
      </MenuItem>
    </Box>
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

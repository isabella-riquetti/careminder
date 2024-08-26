import './App.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Authentication/Login';
import SignUp from './components/pages/Authentication/SignUp';
import { RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import Dashboard from './components/pages/Dashboard';

const AuthWrapper = () => {
  const { isSignedIn } = useAuth();

  console.log(isSignedIn)
  if (!isSignedIn) return <RedirectToSignIn />

  return <Outlet />
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

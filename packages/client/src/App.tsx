import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';


function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

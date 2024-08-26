import './App.css'
import { useGetQuery } from './api/tasks';
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/clerk-react";

function App() {
  const { data } = useGetQuery();

  return (
    <div>
      <SignIn />
      {data && <h1>{data}</h1>}
    </div>
  )
}

export default App

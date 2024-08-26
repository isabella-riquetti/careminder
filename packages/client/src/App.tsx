import './App.css'
import { useGetQuery } from './api/tasks';

function App() {
  const { data } = useGetQuery();

  return (
     data &&  <h1>{data}</h1>
  )
}

export default App

import './App.css'
import { useGetQuery } from './api/tasks';
import { SignIn } from "@clerk/clerk-react";

function App() {
  const { data } = useGetQuery();

  return (
    <div className='flex gap-[10%]'>
      <SignIn />
      <div>
        {data && <h1>{data}</h1>}
        <div className='flex flex-wrap gap-2'>
          <button className="btn">Default</button>
          <button className="btn btn-neutral">Neutral</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-ghost">Ghost</button>
          <button className="btn btn-link">Link</button>
          <button className="btn btn-outline">Default</button>
          <button className="btn btn-outline btn-primary">Primary</button>
          <button className="btn btn-outline btn-secondary">Secondary</button>
          <button className="btn btn-outline btn-accent">Accent</button>
        </div>
      </div>
    </div>
  )
}

export default App

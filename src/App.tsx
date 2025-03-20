
import { Link } from 'react-router'
import './App.css'

function App() {


  return (
    <>
      <Link to={'/dashboard'}>
        <button className="bg-black text-white px-4 py-2 rounded">Go to Dashboard</button>
      </Link>
    </>
  )
}

export default App

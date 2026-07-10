import './App.css'

import Header from "./components/Header/Header"
import StatsBar from "./components/Stats/StatsBar"

function App() {

  return (
    <>
        <div className="p-4 bg-black min-h-screen">
            <Header/>
            <StatsBar />

        </div>
    </>
  )
}

export default App

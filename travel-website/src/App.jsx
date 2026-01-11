import Header from "./components/Header"
import Entry from "./components/Entry"
import travelData from "./data.js"

function App() {
  const travelSections = travelData.map(item => 
    <Entry
      key={item.id}
      { ...item }
  />)
  
  return (
    <>
      <Header/>
      <main className="main">
        {travelSections}
      </main>
    </>
  )
}

export default App

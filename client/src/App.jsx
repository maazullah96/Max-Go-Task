import React, { useState } from 'react'
import './App.css'
import DataTable from './components/DataTable'
import CardView from './components/CardView'
import { ListingsProvider } from './ListingsContext'

function App() {
  const [viewType, setViewType] = useState('table')

  return (
    <ListingsProvider>
      <div className='App'>
        <div className='view-switch'>
          <button onClick={() => setViewType('table')}>Table View</button>
          <button onClick={() => setViewType('card')}>Card View</button>
        </div>
        {viewType === 'table' ? <DataTable /> : <CardView />}
      </div>
    </ListingsProvider>
  )
}

export default App

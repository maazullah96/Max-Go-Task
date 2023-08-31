import { useState } from 'react'
import DataTable from './DataTable'
import CardListings from './CardListings'
import { Tab, Tabs } from 'react-bootstrap'

const Listings = () => {
  const [viewType, setViewType] = useState('table')

  return (
    <div className='App'>
      <Tabs
        fill
        variant='pills'
        activeKey={viewType}
        onSelect={(selectedKey) => setViewType(selectedKey)}
        id='view-switch-tabs'
        className='view-switch'
      >
        <Tab eventKey='table' title='Table View'>
          <DataTable />
        </Tab>
        <Tab eventKey='card' title='Card View'>
          <CardListings />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Listings

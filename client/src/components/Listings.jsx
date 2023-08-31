// import DataTable from './DataTable'
// import { useState } from 'react'
// import CardTable from './CardTable'
// const Listings = () => {
//   const [viewType, setViewType] = useState('table')

//   return (
//     <div className='App'>
//       <div className='view-switch'>
//         <button onClick={() => setViewType('table')}>Table View</button>
//         <button onClick={() => setViewType('card')}>Card View</button>
//       </div>
//       {viewType === 'table' ? <DataTable /> : <CardTable />}
//     </div>
//   )
// }
// export default Listings

import React, { useState } from 'react'
import DataTable from './DataTable'
import CardTable from './CardTable'
import { Tab, Tabs } from 'react-bootstrap'

const Listings = () => {
  const [viewType, setViewType] = useState('table')

  return (
    <div className='App'>
      <Tabs
        activeKey={viewType}
        onSelect={(selectedKey) => setViewType(selectedKey)}
        id='view-switch-tabs'
        className='view-switch'
      >
        <Tab eventKey='table' title='Table View'>
          <DataTable />
        </Tab>
        <Tab eventKey='card' title='Card View'>
          <CardTable />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Listings

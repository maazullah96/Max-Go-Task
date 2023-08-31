// import React from 'react'
// import { useListingsContext, useListingsDispatch } from '../ListingsContext'
// import { useState } from 'react'
// import {
//   Pagination,
//   Dropdown,
//   Button,
//   Container,
//   Row,
//   Col
// } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
// import ListingCard from './ListingCard' // Import the ListingCard component

// const CardTable = () => {
//   const { listings, loading, error, currentPage, itemsPerPage, totalItems } =
//     useListingsContext()
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const endIndex = startIndex + itemsPerPage
//   // const listingsForPage = listings.slice(startIndex, endIndex)

//   //   const dispatch = useListingsDispatch()
//   const [sortColumn, setSortColumn] = useState(null)
//   const [sortOrder, setSortOrder] = useState('asc')

//   // ... (other code)

//   const sortedListings = sortColumn
//     ? [...listings].sort((a, b) => {
//         const aValue = a[sortColumn]
//         const bValue = b[sortColumn]

//         if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
//         if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
//         return 0
//       })
//     : listings

//   const listingsForPage = sortedListings.slice(startIndex, endIndex)

//   // ... (other code)

//   return (
//     <div className='p-2'>
//       <Container>
//         <Row>
//           <Col xs={6}>
//             <Dropdown>{/* Dropdown content */}</Dropdown>
//           </Col>
//           <Col xs={6} className='text-end'>
//             <Pagination>{/* Pagination content */}</Pagination>
//           </Col>
//         </Row>
//       </Container>
//       <Container>
//         <Row>
//           {listingsForPage.map((listing) => (
//             <Col key={listing.id} md={2}>
//               {/* <p>{listing.title}</p> */}
//               <ListingCard listing={listing} />
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </div>
//   )
// }

// export default CardTable

import React, { useState } from 'react'
import {
  Pagination,
  Dropdown,
  Button,
  Container,
  Row,
  Col,
  Card
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSort,
  faSortUp,
  faSortDown,
  faTh,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import ListingCard from './ListingCard'
// import ListingList from './ListingList' // Import the ListingList component
import { useListingsContext, useListingsDispatch } from '../ListingsContext'
import DropDowns from './DropDowns'
import Paginations from './Paginations'
const CardTable = () => {
  const { listings, loading, error, currentPage, itemsPerPage, totalItems } =
    useListingsContext()

  const [sortColumn, setSortColumn] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [viewMode, setViewMode] = useState('grid') // State to track view mode

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const toggleViewMode = (mode) => {
    setViewMode(mode)
  }

  const sortedListings = sortColumn
    ? [...listings].sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    : listings

  const listingsForPage = sortedListings.slice(startIndex, endIndex)

  return (
    <Card>
      <div className='p-2'>
        <Container>
          <Row className='mb-3'>
            <Col xs={6}></Col>
            <Col xs={6} className='text-end'>
              <Dropdown>
                <Dropdown.Toggle variant='secondary' id='view-dropdown'>
                  <FontAwesomeIcon icon={viewMode === 'grid' ? faTh : faBars} />{' '}
                  View
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => toggleViewMode('grid')}>
                    <FontAwesomeIcon icon={faTh} /> Grid View
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => toggleViewMode('list')}>
                    <FontAwesomeIcon icon={faBars} /> List View
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <Pagination>Pagination content</Pagination> */}
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            {viewMode === 'grid'
              ? listingsForPage.map((listing) => (
                  <Col key={listing.id} md={4}>
                    <ListingCard listing={listing} />
                  </Col>
                ))
              : // Use the ListingList component for list view
                listingsForPage.map((listing) => (
                  <Col key={listing.id} md={12}>
                    <ListingCard listing={listing} />
                  </Col>
                ))}
          </Row>
        </Container>

        <Card.Footer className='text-muted'>
          <div className='d-flex justify-content-between align-items-center'>
            <DropDowns />
            <Paginations />
          </div>
        </Card.Footer>
      </div>
    </Card>
  )
}

export default CardTable

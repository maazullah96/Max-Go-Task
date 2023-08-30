import React from 'react'
import { useListingsContext } from '../ListingsContext'
import { useState } from 'react'
import {
  Pagination,
  Dropdown,
  Button,
  Container,
  Row,
  Col
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import ListingCard from './ListingCard' // Import the ListingCard component

const DataTable = () => {
  const { listings, loading, error, currentPage, itemsPerPage, totalItems } =
    useListingsContext()
  const dispatch = useListingsDispatch()
  const [sortColumn, setSortColumn] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  // ... (other code)

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

  // ... (other code)

  return (
    <div className='p-2'>
      <Container>
        <Row>
          <Col xs={6}>
            <Dropdown>{/* Dropdown content */}</Dropdown>
          </Col>
          <Col xs={6} className='text-end'>
            <Pagination>{/* Pagination content */}</Pagination>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {listingsForPage.map((listing) => (
            <Col key={listing.id} md={4}>
              <ListingCard listing={listing} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default DataTable

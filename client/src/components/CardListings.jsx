import { useState } from 'react'
import { Dropdown, Container, Row, Col, Card, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faBars } from '@fortawesome/free-solid-svg-icons'
import ListingCard from './ListingCard'
import { useListingsContext } from '../context/ListingsContext'
import DropDowns from './DropDowns'
import Paginations from './Paginations'

const CardListings = () => {
  const { listings, loading, error, currentPage, itemsPerPage } =
    useListingsContext()

  const [viewMode, setViewMode] = useState('grid') // State to track view mode

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const toggleViewMode = (mode) => {
    setViewMode(mode)
  }

  if (loading) {
    return <Spinner animation='grow' size='lg' variant='primary' />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const listingsForPage = listings.slice(startIndex, endIndex)

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

export default CardListings

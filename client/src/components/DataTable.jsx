import { useState, useEffect, useMemo } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { useListingsContext, useListingsDispatch } from '../ListingsContext'
import { Table, Row, Col, Container, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

// import { Dropdown } from 'react-bootstrap'
import TableFooter from './TableFooter'

const DataTable = () => {
  const { listings, loading, error, currentPage, itemsPerPage } =
    useListingsContext()
  const dispatch = useListingsDispatch()
  const [sortColumn, setSortColumn] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [columnFilters, setColumnFilters] = useState({
    id: '',
    title: '',
    address: '',
    beds: '',
    bath: ''
  })

  const navigate = useNavigate()

  // Handle sorting
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortOrder('asc')
    }
  }

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  // Handle column filter change
  const handleColumnFilterChange = (column, value) => {
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value
    }))
  }

  const filteredResult = () => {
    let result = listings
    if (searchQuery || Object.values(columnFilters).some(Boolean)) {
      result = listings.filter((item) => {
        const filterConditions = []

        // Search Query Filtering
        const searchQueryMatches =
          searchQuery === '' ||
          typeof searchQuery === 'undefined' ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(item.beds).includes(searchQuery) ||
          String(item.bath).includes(searchQuery)

        if (searchQueryMatches) {
          filterConditions.push(true)
        }

        // Column Filters
        if (
          columnFilters.id &&
          !String(item.id)
            .toLowerCase()
            .includes(columnFilters.id.toLowerCase())
        ) {
          filterConditions.push(false)
        }
        if (
          columnFilters.title &&
          !item.title.toLowerCase().includes(columnFilters.title.toLowerCase())
        ) {
          filterConditions.push(false)
        }
        if (
          columnFilters.address &&
          !item.address
            .toLowerCase()
            .includes(columnFilters.address.toLowerCase())
        ) {
          filterConditions.push(false)
        }
        if (
          columnFilters.beds &&
          !String(item.beds).includes(columnFilters.beds)
        ) {
          filterConditions.push(false)
        }
        if (
          columnFilters.bath &&
          !String(item.bath).includes(columnFilters.bath)
        ) {
          filterConditions.push(false)
        }

        // If no filter conditions are false, the item passes all filters
        return (
          searchQueryMatches &&
          filterConditions.length > 0 &&
          filterConditions.every((condition) => condition)
        )
      })
      dispatch({ type: 'SET_FILTERED_LISTINGS', payload: result })
    } else {
      dispatch({ type: 'SET_FILTERED_LISTINGS', payload: [] })
    }
    return result
  }
  // Apply filters and search on listings to get filteredListings
  const filteredListings = useMemo(
    () => filteredResult(),
    [listings, searchQuery, columnFilters]
  )

  // Apply sorting
  if (sortColumn) {
    filteredListings.sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const listingsForPage = filteredListings.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage)

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? faSortUp : faSortDown
    }
    return faSort
  }

  const handleRowClick = (listingId) => {
    navigate(`listing/${listingId}`)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Stack gap={3}>
      <div className='p-2'></div>
      <div className='p-2'>
        <Container>
          <Row className='justify-content-md-center'>
            <Col xs lg='2'>
              {/* 1 of 3 */}
            </Col>
            <Col md='auto'>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextSearch'
              >
                <Form.Label column sm='2'>
                  Search
                </Form.Label>
                <Col sm='9'>
                  <Form.Control
                    type='text'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder='Seach in a Table'
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs lg='2'>
              {/* 3 of 3 */}
            </Col>
          </Row>
        </Container>
      </div>
      <div className='p-2'>
        <Container>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      ID{' '}
                      <FontAwesomeIcon
                        icon={getSortIcon('id')}
                        onClick={() => handleSort('id')}
                      />
                      <Form.Control
                        type='text'
                        value={columnFilters.id}
                        onChange={(e) =>
                          handleColumnFilterChange('id', e.target.value)
                        }
                        placeholder='Filter...'
                      />
                    </th>
                    <th>
                      Title{' '}
                      <FontAwesomeIcon
                        icon={getSortIcon('title')}
                        onClick={() => handleSort('title')}
                      />
                      <Form.Control
                        type='text'
                        value={columnFilters.title}
                        onChange={(e) =>
                          handleColumnFilterChange('title', e.target.value)
                        }
                        placeholder='Filter...'
                      />
                    </th>
                    <th>
                      Address{' '}
                      <FontAwesomeIcon
                        icon={getSortIcon('address')}
                        onClick={() => handleSort('address')}
                      />
                      <Form.Control
                        type='text'
                        value={columnFilters.address}
                        onChange={(e) =>
                          handleColumnFilterChange('address', e.target.value)
                        }
                        placeholder='Filter...'
                      />
                    </th>
                    <th>
                      Beds{' '}
                      <FontAwesomeIcon
                        icon={getSortIcon('beds')}
                        onClick={() => handleSort('beds')}
                      />
                      <Form.Control
                        type='text'
                        value={columnFilters.beds}
                        onChange={(e) =>
                          handleColumnFilterChange('beds', e.target.value)
                        }
                        placeholder='Filter...'
                      />
                    </th>
                    <th>
                      Bath{' '}
                      <FontAwesomeIcon
                        icon={getSortIcon('bath')}
                        onClick={() => handleSort('bath')}
                      />
                      <Form.Control
                        type='text'
                        value={columnFilters.bath}
                        onChange={(e) =>
                          handleColumnFilterChange('bath', e.target.value)
                        }
                        placeholder='Filter...'
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listingsForPage.map((item) => (
                    <tr key={item.id} onClick={() => handleRowClick(item.id)}>
                      <td>
                        <Link to={`listing/${item.id}`}> {item.id}</Link>
                      </td>
                      <td>{item.title}</td>
                      <td>{item.address}</td>
                      <td>{item.beds}</td>
                      <td>{item.bath}</td>
                      {/* Add more data cells here */}
                    </tr>
                  ))}
                </tbody>

                <TableFooter />
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
      <div className='p-2'></div>
    </Stack>
  )
}

export default DataTable

import { useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { useListingsContext, useListingsDispatch } from '../ListingsContext'
import { Table, Row, Col, Container, Stack } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

import { Dropdown } from 'react-bootstrap'

const DataTable = () => {
  const { listings, loading, error, currentPage, itemsPerPage } =
    useListingsContext()
  const dispatch = useListingsDispatch()
  const [sortColumn, setSortColumn] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  // Calculate the total number of pages
  const totalPages = Math.ceil(listings.length / itemsPerPage)

  // // Generate an array of page numbers
  // const pageNumbers = Array.from(
  //   { length: totalPages },
  //   (_, index) => index + 1
  // )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  // const listingsForPage = listings.slice(startIndex, endIndex)

  const handleItemsPerPageChange = (newItemsPerPage) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 })
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: newItemsPerPage })
  }

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortOrder('asc')
    }

    const sortedListings = [...listings].sort((a, b) => {
      const aValue = a[column]
      const bValue = b[column]

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    dispatch({ type: 'SORT_LISTINGS', payload: sortedListings })
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

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? (
        <FontAwesomeIcon icon={faSortUp} />
      ) : (
        <FontAwesomeIcon icon={faSortDown} />
      )
    }
    return <FontAwesomeIcon icon={faSort} />
  }

  return (
    <Stack gap={3}>
      <div className='p-2'></div>
      <div className='p-2'>
        <Container>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th onClick={() => handleSort('id')}>
                      ID {getSortIcon('id')}
                    </th>
                    <th onClick={() => handleSort('title')}>
                      Title {getSortIcon('title')}
                    </th>
                    <th onClick={() => handleSort('address')}>
                      Address {getSortIcon('address')}
                    </th>
                    <th onClick={() => handleSort('beds')}>
                      Beds {getSortIcon('beds')}
                    </th>
                    <th onClick={() => handleSort('bath')}>
                      Bath {getSortIcon('bath')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listingsForPage.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.address}</td>
                      <td>{item.beds}</td>
                      <td>{item.bath}</td>
                      {/* Add more data cells here */}
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan='5'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant='primary'
                              id='dropdown-basic'
                            >
                              Rows per Page: {itemsPerPage}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => handleItemsPerPageChange(5)}
                              >
                                5
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleItemsPerPageChange(10)}
                              >
                                10
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleItemsPerPageChange(20)}
                              >
                                20
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleItemsPerPageChange(50)}
                              >
                                50
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div>
                          <Pagination>
                            {Array.from(
                              { length: totalPages },
                              (_, index) => index + 1
                            ).map((pageNumber) => (
                              <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === currentPage}
                                onClick={() =>
                                  dispatch({
                                    type: 'SET_CURRENT_PAGE',
                                    payload: pageNumber
                                  })
                                }
                              >
                                {pageNumber}
                              </Pagination.Item>
                            ))}
                          </Pagination>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
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

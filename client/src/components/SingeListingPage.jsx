import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  useListingsDispatch,
  useListingsContext
} from '../context/ListingsContext'
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faBuilding,
  faBed,
  faBath,
  faRulerCombined,
  faDollarSign,
  faStore
} from '@fortawesome/free-solid-svg-icons'

const API_URL = '/api/listing'

const propertyTypeIcons = {
  house: faHome,
  apartment: faBuilding,
  condo: faBuilding
}

const SingleListingPage = () => {
  const { listingId: id } = useParams()
  const dispatch = useListingsDispatch()
  const { selectedListing } = useListingsContext()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        console.log(id)
        const response = await axios.get(`${API_URL}/${id}`)
        dispatch({ type: 'SELECT_LISTING', payload: response.data })
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error })
      }
    }

    fetchListing()
  }, [dispatch, id])

  if (!selectedListing) {
    return (
      <Container className='mt-5'>
        <Spinner animation='border' role='status' size='lg'>
          {/* <span className='visually-hidden'>Loading...</span> */}
        </Spinner>
      </Container>
    )
  }
  const propertyTypeIcon =
    propertyTypeIcons[selectedListing.propertyType.toLowerCase()]

  const commercialIcon = selectedListing.isCommercial ? (
    <Badge bg='success' className='m-2'>
      commercial <FontAwesomeIcon icon={faStore} />
    </Badge>
  ) : (
    <Badge bg='danger' className='m-2'>
      Not Commercial <FontAwesomeIcon icon={faStore} />
    </Badge>
  )

  return (
    <Container className='mt-5'>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Img
                variant='top'
                src={selectedListing.imageUrl}
                alt={selectedListing.title}
                style={{ height: '100%', objectFit: 'cover' }} // Set fixed height and cover mode
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{selectedListing.title}</Card.Title>
              <Card.Text>{selectedListing.address}</Card.Text>
              <Card.Text>
                <Badge bg='info' className='mb-2'>
                  <FontAwesomeIcon icon={propertyTypeIcon} />{' '}
                  {selectedListing.propertyType}
                </Badge>

                {commercialIcon}
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon icon={faBed} /> Beds: {selectedListing.beds}
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon icon={faBath} /> Bath: {selectedListing.bath}
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon icon={faRulerCombined} /> Covered Area:{' '}
                {selectedListing.coveredAreaSQFT} sqft
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon icon={faDollarSign} /> Price: $
                {selectedListing.price}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SingleListingPage

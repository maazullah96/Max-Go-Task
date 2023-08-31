import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ListingCard = ({ listing }) => {
  return (
    <Card className='mb-3'>
      <Card.Body>
        <Card.Img
          variant='top'
          src={listing.imageUrl}
          alt={listing.title}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <Card.Title>
          {listing.title.length > 20
            ? listing.title.substring(0, 20) + '...'
            : listing.title}
        </Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          ID: {listing.id}
        </Card.Subtitle>
        <Card.Text>{listing.address}</Card.Text>
        <Card.Text>Beds: {listing.beds}</Card.Text>
        <Card.Text>Bath: {listing.bath}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link to={`listing/${listing.id}`}>View Post</Link>
      </Card.Footer>
    </Card>
  )
}

export default ListingCard

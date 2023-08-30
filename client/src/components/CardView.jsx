import React from 'react'

const CardView = ({ data }) => {
  return (
    <div className='card-view'>
      {data.map((listing) => (
        <div key={listing.id} className='card'>
          <img src={listing.imageUrl} alt={listing.title} />
          <h3>{listing.title}</h3>
          <p>{listing.address}</p>
          <p>Beds: {listing.beds}</p>
          <p>Bath: {listing.bath}</p>
          <p>Covered Area: {listing.coveredAreaSQFT} sqft</p>
          <p>Property Type: {listing.propertyType}</p>
          <p>Commercial: {listing.isCommercial ? 'Yes' : 'No'}</p>
          <p>Price: {listing.price}</p>
        </div>
      ))}
    </div>
  )
}

export default CardView

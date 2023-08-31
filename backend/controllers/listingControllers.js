const express = require('express')
const fs = require('fs')
const path = require('path')

// Read mockListings.json

const mockListingsPath = path.join(__dirname, '..', 'data', 'mockListings.json')
const mockListingsData = fs.readFileSync(mockListingsPath, 'utf-8')
const mockListings = JSON.parse(mockListingsData)

const propertyMockListings = (req, res) => {
  res.json(mockListings)
}
// // Property Listings API
// router.get('/property-listings', (req, res) => {
//   res.json(mockListings)
// })

const propertyListingDetail = (req, res) => {
  const listingId = req.params.id
  console.log(`listingId ==> ${listingId}`)
  const listing = mockListings.find((listing) =>
    listing.imageUrl.includes(listingId)
  )
  if (listing) {
    res.json(listing)
  } else {
    res.status(404).json({ message: 'Listing not found' })
  }
}
// // Listing Detail API
// router.get('/listing/:id', (req, res) => {
//   const listingId = req.params.id
//   const listing = mockListings.find((listing) =>
//     listing.imageUrl.includes(listingId)
//   )
//   if (listing) {
//     res.json(listing)
//   } else {
//     res.status(404).json({ message: 'Listing not found' })
//   }
// })

module.exports = { propertyListingDetail, propertyMockListings }

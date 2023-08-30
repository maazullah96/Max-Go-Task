const {
  propertyListingDetail,
  propertyMockListings
} = require('../controllers/listingControllers')
const express = require('express')
const router = express.Router()

router.get('/property-listings', propertyMockListings)
router.get('/listing/:id', propertyListingDetail)

module.exports = router

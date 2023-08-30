const fs = require('fs')
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function getRandomStringFromArray(array) {
  if (array.length === 0) {
    return null // Return null if the array is empty
  }
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

function getRandomBoolean() {
  return Math.random() < 0.5
}

const { faker } = require('@faker-js/faker')

const generateMockListing = (index) => ({
  id: index,
  imageUrl: faker.image.url(400, 400),
  title: faker.word.words({ count: 4 }),
  // faker.location.streetAddress() + ' ' + faker.location.city(),
  address: faker.location.streetAddress() + ', ' + faker.location.city(),
  beds: Math.floor(Math.random() * 10),
  bath: Math.floor(Math.random() * 10),
  coveredAreaSQFT: getRndInteger(1000, 5000),
  propertyType: getRandomStringFromArray(['house', 'apartment', 'condo']),
  isCommercial: getRandomBoolean(),
  price: getRndInteger(100000, 100000000)
})

// Generate a mock dataset with a specific number of listings
const generateMockData = (count) => {
  const mockData = []
  for (let i = 0; i < count; i++) {
    mockData.push(generateMockListing(i))
  }
  return mockData
}

// Generate and print a mock dataset with 10 listings
const mockListings = generateMockData(50)
console.log(mockListings)

// Convert mock listings to JSON format
const jsonData = JSON.stringify(mockListings, null, 2)

// Write JSON data to a file
fs.writeFileSync('mockListings.json', jsonData)

console.log('Mock listings saved to mockListings.json')

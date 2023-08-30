const express = require('express')
const morgan = require('morgan')
const listingRoutes = require('./routes/listingRoutes')
const app = express()
const cors = require('cors')

app.use(morgan('dev'))
app.use(cors({}))
app.use('/api/', listingRoutes)
app.listen(3000, () => {
  console.log('Server is listening at port 3000')
})

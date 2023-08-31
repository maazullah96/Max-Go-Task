import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import SingeListingPage from './components/SingeListingPage'
import { ListingsProvider } from './ListingsContext'
import Listings from './components/Listings.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Listings />}></Route>
      <Route path='listing'>
        <Route path=':listingId' element={<SingeListingPage />}></Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ListingsProvider>
      <RouterProvider router={router}></RouterProvider>
    </ListingsProvider>
  </React.StrictMode>
)

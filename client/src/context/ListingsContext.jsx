import { createContext, useReducer, useContext, useEffect } from 'react'
import axios from 'axios'
const API_URL = 'http://localhost:3000/api/property-listings'

const ListingsContext = createContext()

const ListingsDispatchContext = createContext(null)

const initialState = {
  listings: [],
  loading: true,
  error: null,
  currentPage: 1,
  itemsPerPage: 5 // Default number of items per page
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        listings: action.payload,
        loading: false,
        error: null
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        listings: [],
        loading: false,
        error: action.payload
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      }
    case 'SET_ITEMS_PER_PAGE':
      return {
        ...state,
        itemsPerPage: action.payload
      }
    case 'SORT_LISTINGS':
      return {
        ...state,
        listings: action.payload
      }
    case 'SET_FILTERED_LISTINGS':
      return {
        ...state,
        filteredListings: action.payload
      }

    case 'SELECT_LISTING':
      return {
        ...state,
        selectedListing: action.payload
      }
    default:
      return state
  }
}

const ListingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log(API_URL)
        console.log(response.data)
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_ERROR', payload: error })
      })
  }, [])

  return (
    <ListingsContext.Provider value={state}>
      <ListingsDispatchContext.Provider value={dispatch}>
        {children}
      </ListingsDispatchContext.Provider>
    </ListingsContext.Provider>
  )
}

const useListingsContext = () => {
  const context = useContext(ListingsContext)
  if (context === undefined) {
    throw new Error('useListingsContext must be used within a ListingsProvider')
  }
  return context
}

function useListingsDispatch() {
  const context = useContext(ListingsDispatchContext)
  if (context === undefined) {
    throw new Error('useListingsContext must be used within a ListingsProvider')
  }
  return context
}

export { ListingsProvider, useListingsContext, useListingsDispatch }

// import Pagination from 'react-bootstrap/Pagination'
// import { useListingsContext, useListingsDispatch } from '../ListingsContext'

// const Paginations = () => {
//   const { listings, filteredListings, itemsPerPage, currentPage } =
//     useListingsContext()
//   const dispatch = useListingsDispatch()
//   const totalPages = Math.ceil(
//     (filteredListings.length || listings.length) / itemsPerPage
//   )

//   return (
//     <Pagination>
//       {Array.from({ length: totalPages }, (_, index) => index + 1).map(
//         (pageNumber) => (
//           <Pagination.Item
//             key={pageNumber}
//             active={pageNumber === currentPage}
//             onClick={() =>
//               dispatch({
//                 type: 'SET_CURRENT_PAGE',
//                 payload: pageNumber
//               })
//             }
//           >
//             {pageNumber}
//           </Pagination.Item>
//         )
//       )}
//     </Pagination>
//   )
// }

// export default Paginations

import Pagination from 'react-bootstrap/Pagination'
import { useListingsContext, useListingsDispatch } from '../ListingsContext'

const Paginations = () => {
  const { listings, filteredListings, itemsPerPage, currentPage } =
    useListingsContext()
  const dispatch = useListingsDispatch()
  let paginationListings = listings
  if (filteredListings !== undefined && filteredListings.length > 0) {
    paginationListings = filteredListings
  }
  const totalPages = Math.ceil(paginationListings.length / itemsPerPage)
  // const totalPages = Math.ceil(
  //   (filteredListings.length || listings.length) / itemsPerPage
  // )
  // const paginationListings =
  //   filteredListings.length > 0 ? filteredListings : listings
  console.log(totalPages)
  return (
    <Pagination>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
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
        )
      )}
    </Pagination>
  )
}

export default Paginations

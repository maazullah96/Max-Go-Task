import { Dropdown } from 'react-bootstrap'
import {
  useListingsDispatch,
  useListingsContext
} from '../context/ListingsContext'

const DropDowns = () => {
  const { itemsPerPage } = useListingsContext()
  const dispatch = useListingsDispatch()
  const handleItemsPerPageChange = (newItemsPerPage) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 })
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: newItemsPerPage })
  }
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant='primary' id='dropdown-basic'>
          Rows per Page: {itemsPerPage}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>
            5
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>
            10
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>
            20
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(50)}>
            50
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
export default DropDowns

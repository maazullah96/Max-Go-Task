import DropDowns from './DropDowns'
import Paginations from './Paginations'
const TableFooter = () => {
  return (
    <tfoot>
      <tr>
        <td colSpan='5'>
          <div className='d-flex justify-content-between align-items-center'>
            <DropDowns />
            <Paginations />
          </div>
        </td>
      </tr>
    </tfoot>
  )
}
export default TableFooter

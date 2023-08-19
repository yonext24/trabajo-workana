import { useSelector } from 'react-redux'
import { TableContainer } from '../../table-container'
import { TableHeader } from '../../table-header'
import { TableGeneralRow } from './table-general-row'
import { Spinner } from '../../../common/spinner'

export function TableGeneral () {
  // eslint-disable-next-line no-unused-vars
  const { general: { sectores: { loading, revalidating, data, error } } } = useSelector(s => s.data)

  return <TableContainer>

    <table className='w-full font-semibold min-h-[280px]'>
      <TableHeader columns={[{ text: 'Nombre' }, { text: 'Acciones', className: 'max-w-[40%] w-full' }]} />
      <tbody className='[&>tr:last-of-type_td]:border-b-0'>
        {
          data.map(el => <TableGeneralRow key={el} text={el} />)
        }
      </tbody>
    </table>

    {
      loading && <div className='absolute w-full h-full left-0 top-0 bg-negro/40 flex justify-center items-center'>
        <Spinner />
      </div>
    }

  </TableContainer>
}

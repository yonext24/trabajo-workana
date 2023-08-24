import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'

export function CarreraCarreraTableRow ({ carrera, nivel, estado }) {
  return <RowLayout>
    <td className='border-r'>{carrera}</td>
    <td className='border-r'>{nivel}</td>
    <td className='border-r'>{estado}</td>
    <Row actions={[{ type: 'see', onClick: () => {} }, { type: 'delete', onClick: () => {} }, { type: 'update', onClick: () => {} }]} />
  </RowLayout>
}

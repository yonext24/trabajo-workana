import { RowLayout } from '../row-layout'
import { Row } from '../row'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { CentrosEducativosSeeModal } from '@/components/modals/centros-educativos/centros-educativos-see-modal'

export function CentrosEducativosMainTableRow(props) {
  const { nombre, codigo } = props
  const { handleSee } = useTableDefaultModals({
    see: {
      el: CentrosEducativosSeeModal,
      ...props
    }
  })

  return (
    <RowLayout>
      <td className="border-r !text-center">{codigo}</td>
      <td className="border-r">{nombre}</td>
      <Row actions={[{ type: 'see', onClick: handleSee, text: 'Lista de carreras' }]}></Row>
    </RowLayout>
  )
}

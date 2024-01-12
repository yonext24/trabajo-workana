import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { DefaultModalLayout } from '../default-modal-layout'
import { ModalBackground } from '../modal-background'
import { centros } from '@/utils/routes'
import { CentrosEducativosTitulosTable } from '@/components/tables/centros-educativos/centros-educativos-titulos-table'
import { ButtonsContainer } from '../buttons-container'

const get_titulos = async id_establecimiento => {
  return await centros.get_establecimiento_data({ id_establecimiento })
}

export function CentrosEducativosSeeModal({ closeModal, id_establecimiento, nombre }) {
  const { data, loading, error } = useFetchLocalData({ func: async () => get_titulos(id_establecimiento) })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Lista de carreras" className={'!max-w-[940px] max-h-[98vh]'} closeModal={closeModal}>
        <div className="w-full h-full p-4 flex flex-col gap-4">
          <h4 className="font-bold text-lg">
            Establecimiento: <span className="font-normal">{nombre}</span>
          </h4>
          <CentrosEducativosTitulosTable loading={loading} error={error} data={data} />
          <ButtonsContainer alone>
            <button onClick={closeModal}>Salir</button>
          </ButtonsContainer>
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

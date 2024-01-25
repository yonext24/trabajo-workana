import { InputWLabel } from '@/components/common/input-w-label'
import { SelectInput } from '@/components/common/select-input/select-input'
import { SwitchButton } from '@/components/common/table-buttons'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { RecursoTable } from '@/components/tables/oferta-academica/carrera/recurso/recurso-table'
import { useModalLogic } from '@/hooks/useModalLogic'
import { usePermissions } from '@/hooks/usePermissions'
import { BASE_OFERTA_URL } from '@/utils/consts'
import { appFetch } from '@/utils/fetchHandler'
import { useEffect, useState } from 'react'

export function CarreraSeeModal({
  closeModal,
  id_carrera,
  nivel,
  nombre,
  titulo_femenino,
  titulo_masculino,
  fecha_creacion,
  prerrequisito_tecnico
}) {
  useModalLogic({ closeModal, noScroll: true })
  const [recursos, setRecursos] = useState({ loading: false, error: null, data: [] })

  useEffect(() => {
    setRecursos(prev => ({ ...prev, loading: true, error: null }))
    appFetch(`${BASE_OFERTA_URL}/rye/carrera/recursos?carrera=${id_carrera}&page=1&size=100`)
      .then(data => {
        const items = data?.items ?? []
        setRecursos({ loading: false, error: null, data: items })
      })
      .catch(err => {
        setRecursos({ loading: false, error: err.message, data: [] })
      })
  }, [])

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal} className={'py-1'}>
      <DefaultModalLayout
        title="Ver Carrera"
        className={'!max-h-[900px] h-full !mx-4 overflow-hidden w-full max-w-[800px]'}
        closeModal={closeModal}
      >
        <div className="p-4 flex flex-col gap-4 overflow-y-auto">
          <div className="flex w-full [&>*]:flex-1 gap-4 items-end">
            <div className="flex flex-col">
              <label className="font-semibold text-lg">Nivel carrera</label>
              <SelectInput options={[]} disabled defaultValue={nivel} name="nivel" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <label className="font-semibold text-lg">Prerrequisito técnico</label>
              <SwitchButton disabled estado={prerrequisito_tecnico} />
            </div>
          </div>
          <InputWLabel name="carrera" labelText={'Nombre'} disabled defaultValue={nombre} required />
          <InputWLabel
            name="titulo_femenino"
            disabled
            defaultValue={titulo_femenino}
            labelText="Título femenino"
            required
          />
          <InputWLabel
            name="titulo_masculino"
            disabled
            defaultValue={titulo_masculino}
            labelText="Título masculino"
            required
          />

          <div className="flex">
            <div className="flex-[.9] flex items-center">
              <h5 className="text-2xl font-semibold">Recursos de carrera</h5>
            </div>
            <div className="flex-1 flex gap-3 [&>*]:flex-1">
              <InputWLabel
                disabled
                name="fecha_de_creacion"
                labelText="Fecha de creación"
                type="date"
                defaultValue={fecha_creacion}
                required
              />
            </div>
          </div>

          <RecursoTable
            columns={[{ text: 'Tipo' }, { text: 'Recurso' }]}
            outsideData={recursos.data.map(el => ({ ...el, estado: true }))}
            outsideError={recursos.error}
            outsideLoading={recursos.loading}
            permissions={permissions}
          />
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

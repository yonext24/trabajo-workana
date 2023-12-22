import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../../../default-modal-layout'
import { ModalBackground } from '../../../modal-background'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { unidad } from '@/utils/routes'
import { parseEstado } from '@/utils/consts'
import { carrera } from '@/utils/routes/oferta/carrera'
import { useState } from 'react'
import { SelectInputWithLabel } from '@/components/common/select-input/select-input-w-label'
import { UnidadCarrerasTable } from '@/components/tables/oferta-academica/unidad-academica/unidad/table-unidad-carrera'

export function UnidadSeeCarrerasModal({ closeModal, id_unidad, nombre, estado, abreviatura, codigo, tipo_ua }) {
  const [selectedNivel, setSelectedNivel] = useState(null)

  const {
    loading: loadingNivel,
    error: errorNivel,
    data: dataNivel
  } = useFetchLocalData({
    func: carrera.carrera.param_leer,
    initialData: []
  })

  const { loading, error, data, setState } = useFetchLocalData({
    func: async ([selectedNivel, id_unidad]) => {
      if (!selectedNivel?.id_nivel || !id_unidad) return []
      return await unidad.unidad.get_carreras(id_unidad, selectedNivel?.id_nivel)
    },
    dependencies: [selectedNivel, id_unidad]
  })

  console.log(data)

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout className="!max-w-[840px] max-h-[98vh]" title="Ver Extensión" closeModal={closeModal}>
        <div className="p-1 md:p-6 md:pt-2 pb-6 flex flex-col overflow-y-hidden">
          <div className="flex gap-4 lg:gap-4 w-full mb-2 [&>*]:flex-1 items-end">
            <InputWLabel name="Tipo UA" disabled defaultValue={tipo_ua} />
            <InputWLabel name="Código unidad" disabled defaultValue={codigo} />
            <InputWLabel name="Abreviatura" disabled defaultValue={abreviatura} />
          </div>
          <div className="grid grid-cols-[2fr_1fr] gap-4 w-full justify-between  items-end ">
            <InputWLabel id="nombre" name="nombre" disabled defaultValue={nombre} />
            <InputWLabel id="estado" name="estado" disabled defaultValue={parseEstado(estado)} />
          </div>

          <div className="grid grid-cols-[2fr_1fr] gap-4 mt-6">
            <h4 className="font-bold text-2xl my-2">Carreras de extensión</h4>

            <SelectInputWithLabel
              options={dataNivel}
              show="nombre"
              firstOne
              loading={loadingNivel}
              error={errorNivel}
              handleOptionClick={setSelectedNivel}
              onFirstChange={setSelectedNivel}
            />
          </div>
          <UnidadCarrerasTable
            loading={loading}
            error={error}
            data={data}
            id_unidad={id_unidad}
            unidad={nombre}
            setCarrera={setState}
            nivel={selectedNivel?.nombre}
            tipo_ua={tipo_ua}
          />
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

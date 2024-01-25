import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../../../default-modal-layout'
import { ModalBackground } from '../../../modal-background'
import { CarreraExtensionTable } from '@/components/tables/oferta-academica/carrera/carrera-extension-table'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { extension, geografia } from '@/utils/routes'
import { parseEstado } from '@/utils/consts'
import { useMemo, useState } from 'react'
import { carrera } from '@/utils/routes/oferta/carrera'
import { SelectInputWithLabel } from '@/components/common/select-input/select-input-w-label'

export function ExtensionSeeModal({
  closeModal,
  id_extension,
  unidad,
  codigo,
  nombre,
  estado,
  fecha_creacion,
  abreviatura,
  id_departamento
}) {
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
    func: async () => await extension.get_carreras({ extension: id_extension })
  })
  const {
    loading: loadingDepartamentos,
    error: errorDepartamentos,
    data: dataDepartamentos
  } = useFetchLocalData({ func: geografia.get_departamentos_guatemala })

  const ubicacion = useMemo(() => {
    if (loadingDepartamentos) return 'Cargando...'
    if (errorDepartamentos || dataDepartamentos?.length === 0) return 'Desconocido'

    return dataDepartamentos?.find(({ id_departamento: id }) => id === id_departamento)?.nombre ?? 'Desconocido'
  }, [dataDepartamentos, id_departamento, errorDepartamentos, loadingDepartamentos])

  const nivelOptions = useMemo(() => {
    if (!dataNivel) return []
    return [{ id_nivel: -2, nombre: 'Todos' }, ...dataNivel]
  }, [JSON.stringify(dataNivel)])

  const dataToShow = useMemo(() => {
    if (!selectedNivel?.id_nivel || !data) return []
    if (selectedNivel?.id_nivel === -2) return data
    return data.filter(el => el.id_nivel === selectedNivel?.id_nivel)
  }, [JSON.stringify(data), JSON.stringify(selectedNivel)])

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout className="!max-w-[840px] max-h-[98vh]" title="Ver Extensión" closeModal={closeModal}>
        <div className="p-1 md:p-6 md:pt-2 flex flex-col overflow-y-auto pb-6">
          <div className="flex gap-4 lg:gap-4 w-full [&>*]:flex-1 items-end">
            <InputWLabel id="unidad" name="unidad" disabled defaultValue={unidad} />
            <InputWLabel id="codigo" name="codigo" labelText="Código extensión" disabled defaultValue={codigo} />
            <InputWLabel id="abreviatura" name="abreviatura" disabled defaultValue={abreviatura} />
          </div>
          <InputWLabel id="nombre" name="nombre" disabled defaultValue={nombre} />
          <div className="flex gap-4 lg:gap-4 w-full [&>*]:flex-1 items-end">
            <InputWLabel id="ubicacion" name="departamento" disabled value={ubicacion} />
            <InputWLabel
              id="fecha_creacion"
              name="fecha_creacion"
              labelText="Fecha de Activación"
              disabled
              defaultValue={fecha_creacion}
            />
            <InputWLabel id="estado" name="estado" disabled defaultValue={parseEstado(estado)} />
          </div>

          <div className="grid grid-cols-[2fr_1fr] gap-4 mt-6">
            <h4 className="font-bold text-2xl my-2">Carreras de extensión</h4>

            <SelectInputWithLabel
              options={nivelOptions}
              show="nombre"
              firstOne
              loading={loadingNivel}
              error={errorNivel}
              handleOptionClick={setSelectedNivel}
              onFirstChange={setSelectedNivel}
            />
          </div>
          <CarreraExtensionTable
            data={dataToShow}
            loading={loading}
            error={error}
            id_extension={id_extension}
            extension={nombre}
            unidad={unidad}
            setCarrera={setState}
          />
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

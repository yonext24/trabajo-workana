import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { CarreraExtensionTable } from '@/components/tables/oferta-academica/carrera/carrera-extension-table'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { extension, geografia } from '@/utils/routes'
import { parseEstado } from '@/utils/consts'
import { useMemo } from 'react'

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
  const { loading, error, data, setState } = useFetchLocalData({
    func: async () => await extension.get_carreras({ extension: id_extension })
  })
  const {
    loading: loadingPaises,
    error: errorPaises,
    data: dataPaises
  } = useFetchLocalData({ func: geografia.get_parametros, initialData: { paises: [], departamentos: [] } })

  const ubicacion = useMemo(() => {
    if (loadingPaises) return 'Cargando...'
    if (errorPaises || dataPaises?.departamentos?.length === 0) return 'Desconocido'

    return dataPaises.departamentos.find(({ id_departamento: id }) => id === id_departamento)?.nombre ?? 'Desconocido'
  }, [dataPaises, id_departamento, errorPaises, loadingPaises])

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout className="!max-w-[840px] max-h-[98vh]" title="Ver Extensión" closeModal={closeModal}>
        <div className="p-1 md:p-6 md:py-2 flex flex-col overflow-y-auto">
          <div className="flex gap-4 lg:gap-4 w-full justify-between mb-2 [&>input]:w-full items-end">
            <InputWLabel id="unidad" name="unidad" disabled defaultValue={unidad} />
            <InputWLabel id="codigo" name="codigo" labelText="Código extensión" disabled defaultValue={codigo} />
            <InputWLabel id="abreviatura" name="abreviatura" disabled defaultValue={abreviatura} />
          </div>
          <InputWLabel id="nombre" name="nombre" disabled defaultValue={nombre} />
          <div className="flex gap-4 lg:gap-4 w-full justify-between mt-2 [&>input]:w-full items-end">
            <InputWLabel id="ubicacion" name="ubicacion" disabled value={ubicacion} />
            <InputWLabel
              id="fecha_creacion"
              name="fecha_creacion"
              labelText="Fecha de Activación"
              disabled
              defaultValue={fecha_creacion}
            />
            <InputWLabel id="estado" name="estado" disabled defaultValue={parseEstado(estado)} />
          </div>

          <h4 className="font-bold text-2xl my-2">Carreras de extensión</h4>
          <CarreraExtensionTable
            data={data}
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

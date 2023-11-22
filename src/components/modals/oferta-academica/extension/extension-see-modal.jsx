import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { CarreraExtensionTable } from '@/components/tables/oferta-academica/carrera/carrera-extension-table'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { extension } from '@/utils/routes'

export function ExtensionSeeModal({
  closeModal,
  id_extension,
  unidad,
  codigo,
  nombre,
  estado,
  fecha_de_creacion,
  abreviatura,
  ubicacion
}) {
  const { loading, error, data } = useFetchLocalData({
    func: async () => await extension.get_carreras({ extension: id_extension })
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout className="!max-w-[840px] max-h-[98vh]" title="Ver Extensión" closeModal={closeModal}>
        <div className="p-6 py-2 flex flex-col overflow-y-auto">
          <div className="flex gap-4 lg:gap-4 w-full justify-between mb-2 [&>input]:w-full">
            <InputWLabel id="unidad" name="unidad" disabled defaultValue={unidad} />
            <InputWLabel id="codigo" name="codigo" labelText="Código extensión" disabled defaultValue={codigo} />
            <InputWLabel id="abreviatura" name="abreviatura" disabled defaultValue={abreviatura} />
          </div>
          <InputWLabel id="nombre" name="nombre" disabled defaultValue={nombre} />
          <div className="flex gap-4 lg:gap-4 w-full justify-between mt-2 [&>input]:w-full">
            <InputWLabel id="ubicacion" name="ubicacion" disabled defaultValue={ubicacion} />
            <InputWLabel
              id="fecha_de_creacion"
              name="fecha_de_creacion"
              labelText="Fecha de creación"
              disabled
              defaultValue={fecha_de_creacion}
            />
            <InputWLabel id="estado" name="estado" disabled defaultValue={estado} />
          </div>

          <h4 className="font-bold text-2xl my-2">Carreras de extensión</h4>
          <CarreraExtensionTable
            data={data}
            loading={loading}
            error={error}
            id_extension={id_extension}
            extension={nombre}
            unidad={unidad}
          />
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

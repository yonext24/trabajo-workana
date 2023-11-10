import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { CarreraExtensionTable } from '@/components/tables/oferta-academica/carrera/carrera-extension-table'

export function ExtensionSeeModal({
  closeModal,
  ua,
  codigo,
  nombre,
  estado,
  fecha_de_creacion,
  abreviatura,
  ubicacion
}) {
  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout className="!max-w-3xl" title="Ver Extensión" closeModal={closeModal}>
        <div className="p-6 flex flex-col">
          <div className="flex gap-4 lg:gap-4 w-full justify-between [&>input]:w-full">
            <InputWLabel id="unidad" name="unidad" disabled defaultValue={ua} />
            <InputWLabel id="codigo" name="codigo" labelText="Código extensión" disabled defaultValue={codigo} />
            <InputWLabel id="abreviatura" name="abreviatura" disabled defaultValue={abreviatura} />
          </div>
          <InputWLabel id="nombre" name="nombre" disabled defaultValue={nombre} />
          <div className="flex gap-4 lg:gap-4 w-full justify-between [&>input]:w-full">
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
          <CarreraExtensionTable data={[{ id: 1 }, { id: 3 }, { id: 4 }]} />
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

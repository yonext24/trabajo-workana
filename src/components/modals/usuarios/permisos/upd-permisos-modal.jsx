import { SelectInputControlled } from '@/components/common/select-input/select-input-controlled'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'

export function UpdPermisosModal({ closeModal, id, modulo, operacion, unidad, extension, nivel }) {
  const { control, handleSubmit } = useForm()
  const {
    data: {
      general: {
        modulos: { data: modulosData }
      }
    }
  } = useSelector(s => s)
  const { updatePermission } = useUsuariosActions()

  const handleUpload = data => {
    if (JSON.stringify(data) === JSON.stringify({ modulo, operacion, unidad, extension, nivel })) {
      return
    }
    updatePermission({ ...data, id })
    closeModal()
  }

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Actualizar Permiso">
        <form
          onSubmit={handleSubmit(handleUpload)}
          className="flex flex-col gap-y-4 p-6 [&_label]:font-semibold [&>label]:text-lg [&>label]:-mb-4 [&>label]:block"
        >
          <label>Módulo</label>
          <SelectInputControlled
            name="modulo"
            control={control}
            rules={{ required: true }}
            defaultValue={modulo}
            options={modulosData}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Operación</label>
              <SelectInputControlled
                name="operacion"
                control={control}
                rules={{ required: true }}
                defaultValue={operacion}
                options={['Create', 'Read', 'Delete', 'Update']}
              />
            </div>
            <div>
              <label>Unidad</label>
              <SelectInputControlled
                name="unidad"
                control={control}
                rules={{ required: true }}
                defaultValue={unidad}
                options={[1, 2, 3, 4, 5]}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label>Extensión</label>
              <SelectInputControlled
                name="extension"
                control={control}
                rules={{ required: true }}
                defaultValue={extension}
                options={[1, 2, 3, 4, 5]}
              />
            </div>
            <div>
              <label>Nivel</label>
              <SelectInputControlled
                name="nivel"
                control={control}
                rules={{ required: true }}
                defaultValue={nivel}
                options={[1, 2, 3, 4, 5]}
              />
            </div>
          </div>

          <ButtonsContainer closeModal={closeModal}>
            <button>Guardar</button>
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { SelectInputControlled } from '@/components/common/select-input-controlled'
import { useSelector } from 'react-redux'
import { ButtonsContainer } from '../../buttons-container'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'

export function AddPermisosModal ({ closeModal }) {
  const { control, handleSubmit } = useForm()
  const { addPermission } = useUsuariosActions()
  const { data: { general: { modulos: { data: modulosData } } } } = useSelector(s => s)

  const handleUpload = (data) => {
    addPermission(data)
  }

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>
    <DefaultModalLayout title='Agregar Permiso'>
      <form onSubmit={handleSubmit(handleUpload)}
      className='flex flex-col gap-y-4 p-6 [&_label]:font-semibold [&>label]:text-lg [&>label]:-mb-4 [&>label]:block'>

        <label>Módulo</label>
        <SelectInputControlled
         name='modulo'
         control={control}
         rules={{ required: true }}
         options={modulosData} />

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label>Operación</label>
            <SelectInputControlled
            name='operacion'
            control={control}
            rules={{ required: true }}
            options={['Create', 'Read', 'Delete', 'Update']} />
         </div>
          <div>
            <label>Unidad</label>
            <SelectInputControlled
            name='unidad'
            control={control}
            rules={{ required: true }}
            options={[1, 2, 3, 4, 5]} />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div>
            <label>Extensión</label>
            <SelectInputControlled
            name='extension'
            control={control}
            rules={{ required: true }}
            options={[1, 2, 3, 4, 5]} />
         </div>
          <div>
            <label>Nivel</label>
            <SelectInputControlled
            name='nivel'
            control={control}
            rules={{ required: true }}
            options={[1, 2, 3, 4, 5]} />
          </div>
        </div>

        <ButtonsContainer>
          <button>Guardar</button>
        </ButtonsContainer>

      </form>

    </DefaultModalLayout>
  </ModalBackground>
}

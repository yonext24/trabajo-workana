import { useForm } from 'react-hook-form'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { compareValues } from '@/utils/compareValues'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'

export function AddModulosModal ({ closeModal }) {
  const { register, handleSubmit, control } = useForm()
  const modulosData = useSelector(s => s.data.modulos.data)
  const { addModulos } = useDataActions()

  const handleUpdate = (data) => {
    if (compareValues(data, modulosData)) {
      toast.error('Ya existe un puesto de esas características.')
      return
    }
    addModulos(data)
    closeModal()
  }

  return <ModalBackground onClick={closeModal} closeModal={closeModal} >

    <DefaultModalLayout title='Agregar Modulo' closeModal={closeModal}>
      <form onSubmit={handleSubmit(handleUpdate)} className='py-8 px-4 font-semibold flex flex-col gap-4'>

      <SelectInputControlledWithLabel labelText={'Tipo'} id='tipo' name='tipo' control={control} options={['Operación', 'Módulo']} />
      <InputWLabel id='nombre' name='nombre' labelText='Nombre' type='text' register={register} required />

        <ButtonsContainer closeModal={closeModal} className='mt-12'>
          <button type='submit'>Agregar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}

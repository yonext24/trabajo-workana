import { useForm } from 'react-hook-form'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function AddModulosModal ({ closeModal }) {
  const { register, handleSubmit } = useForm()
  const modulosData = useSelector(s => s.data.modulos.data)
  const { addModulos } = useDataActions()

  const handleUpdate = (data) => {
    if (modulosData.some(el => el === data.nombre)) {
      toast.error('Ya existe un puesto de esas características.')
      return
    }
    addModulos(data)
  }

  return <ModalBackground onClick={closeModal} closeModal={closeModal} >

    <DefaultModalLayout title='Agregar Modulo' >
      <form onSubmit={handleSubmit(handleUpdate)} className='py-8 px-4 font-semibold flex flex-col gap-4'>

      <InputWLabel id='tipo' name='tipo' labelText='Tipo' type='text' autoFocus register={register} required />
      <InputWLabel id='nombre' name='nombre' labelText='Nombre' type='text' register={register} required />

        <ButtonsContainer closeModal={closeModal} className='mt-12'>
          <button type='submit'>Agregar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}

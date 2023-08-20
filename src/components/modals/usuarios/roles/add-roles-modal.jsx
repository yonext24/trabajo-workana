import { useForm } from 'react-hook-form'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'

export function AddRolesModal ({ closeModal }) {
  const { register, handleSubmit } = useForm()
  const { data: rolesData } = useSelector(s => s.usuarios).roles
  const { addRole } = useUsuariosActions()

  const handleUpdate = (data) => {
    if (rolesData.some(el => el.nombre === data.nombre)) {
      toast.error('Ya existe un rol de esas características.')
      return
    }
    addRole(data)
  }
  console.log(rolesData)

  return <ModalBackground onClick={closeModal} closeModal={closeModal} >

    <DefaultModalLayout title='Agregar Modulo' >
      <form onSubmit={handleSubmit(handleUpdate)} className='py-8 px-4 font-semibold'>

      <InputWLabel id='nombre' name='nombre' labelText='Nombre' type='text' autoFocus register={register} required />
      <InputWLabel id='descripcion' name='descripcion' labelText='Descripción' type='text' inputClassName={'mb-12 resize-none'} rows={4} isTextArea register={register} required />

        <ButtonsContainer closeModal={closeModal}>
          <button type='submit'>Agregar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}

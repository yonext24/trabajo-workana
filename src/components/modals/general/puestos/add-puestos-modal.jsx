import { useForm } from 'react-hook-form'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function AddPuestosModal ({ closeModal }) {
  const { register, handleSubmit } = useForm()
  const puestosData = useSelector(s => s.data.puestos.data)
  const { addPuestosData } = useDataActions()

  const handleUpdate = ({ descripcion }) => {
    if (puestosData.some(el => el.descripcion === descripcion)) {
      toast.error('Ya existe un puesto de esas características.')
      return
    }

    addPuestosData({ descripcion })
  }

  return <ModalBackground onClick={closeModal} closeModal={closeModal} >

    <DefaultModalLayout title='Agregar Puesto' >
      <form onSubmit={handleSubmit(handleUpdate)} className='py-8 px-4 font-semibold'>

      <InputWLabel id='descripcion' name='descripcion' labelText='Nombre' type='text' inputClassName={'mb-12'} autoFocus register={register} required />

        <ButtonsContainer closeModal={closeModal}>
          <button type='submit'>Agregar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}

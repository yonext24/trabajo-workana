import { useSelector } from 'react-redux'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useForm } from 'react-hook-form'
import { InputWLabel } from '../../../common/input-w-label'
import { toast } from 'react-toastify'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'

export function UpdateModulosModal ({ closeModal, nombre, tipo, estado }) {
  const { updModulos } = useDataActions()
  const modulosData = useSelector(s => s.data.modulos.data)

  const { register, handleSubmit, control } = useForm()

  const handleUpdate = (data) => {
    if (data.name === nombre) {
      return
    }
    if (modulosData.some(el => el === data.name)) {
      toast.error('Ya hay un elemento de esas características.')
      return
    }
    updModulos({ nombre: data.nombre, newData: data })
    closeModal()
  }

  return <ModalBackground onClick={closeModal} closeModal={closeModal} >

    <DefaultModalLayout title='Actualizar Modulo' >
      <form onSubmit={handleSubmit(handleUpdate)} className='py-8 px-4 font-semibold flex flex-col gap-4'>

        <InputWLabel id='tipo' name='tipo' labelText='Tipo' type='text' autoFocus register={register} disabled defaultValue={nombre} />
        <InputWLabel id='name' name='name' labelText='Nombre' type='text' autoFocus register={register} disabled defaultValue={tipo} />

        <SelectInputControlledWithLabel
          control={control}
          name='estado'
          defaultValue={estado}
          rules={{ required: true }}
          options={[{ text: 'Activado', value: 1 }, { text: 'Desactivado', value: 0 }]}
        />

        <ButtonsContainer closeModal={closeModal} className={'mt-8'}>
          <button type='submit'>Actualizar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}

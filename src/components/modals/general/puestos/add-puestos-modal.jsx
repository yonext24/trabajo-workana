import { useForm } from 'react-hook-form'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { useSelector } from 'react-redux'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'

export function AddPuestosModal ({ closeModal }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const puestosData = useSelector(s => s.data.puestos.data)
  const { addPuestosData } = useDataActions()

  const handleUpdate = handleLoading(async ({ descripcion }) => {
    await addPuestosData({ descripcion })
  })

  return <ModalBackground onClick={closeModal} closeModal={closeModal} >

    <DefaultModalLayout title='Agregar Puesto' closeModal={closeModal} loading={loading} errors={errors} >
      <form onSubmit={handleSubmit(handleUpdate)} className='py-8 px-4 font-semibold'>

      <InputWLabel id='descripcion' name='descripcion' labelText='Nombre' type='text' inputClassName={'mb-12'} autoFocus register={register} required
      registerProps={{
        validate: nombre => {
          if (puestosData.some(puesto => puesto.descripcion.toLowerCase() === nombre.toLowerCase())) {
            return 'Este puesto ya existe'
          }
        }
      }}/>

        <ButtonsContainer closeModal={closeModal} disabled={loading}>
          <SubmitButton loading={loading} />
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}

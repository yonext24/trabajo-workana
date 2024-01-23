import { useForm } from 'react-hook-form'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'
import { handleErrorInFormResponse } from '@/utils/consts'

export function AddModulosModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm()
  const { handleLoading, loading } = useFormCustom()

  const { addModulos } = useDataActions()

  const handleUpdate = handleLoading(async data => {
    const res = await addModulos(data)
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title="Agregar Módulo" closeModal={closeModal} loading={loading} errors={errors}>
        <form onSubmit={handleSubmit(handleUpdate)} className="py-8 px-4 font-semibold flex flex-col gap-4">
          <InputWLabel id="nombre" name="nombre" labelText="Nombre" type="text" register={register} required />
          <SelectInputControlledWithLabel
            labelText={'Tipo'}
            id="tipo"
            name="tipo"
            control={control}
            options={['Operación', 'Módulo']}
          />

          <ButtonsContainer closeModal={closeModal} disabled={loading} className="mt-12">
            <SubmitButton loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

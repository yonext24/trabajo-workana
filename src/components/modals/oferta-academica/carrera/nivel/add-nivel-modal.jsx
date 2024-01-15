import { InputWLabel } from '@/components/common/input-w-label'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useForm } from 'react-hook-form'

export function AddNivelModal({ closeModal }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { addCarreraNivel } = useOfertaAcademicaActions()

  const handleUpload = handleLoading(async data => {
    const res = await addCarreraNivel(data)
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Nivel" closeModal={closeModal} loading={loading} errors={errors}>
        <form className="p-6 gap-4 flex flex-col" onSubmit={handleSubmit(handleUpload)}>
          <InputWLabel
            name="nombre"
            registerProps={{ minLength: { value: 2, message: 'La longitud del nombre debe ser mayor a 1 carácter.' } }}
            required
            register={register}
          />
          <InputWLabel name="descripcion" register={register} isTextArea />

          <ButtonsContainer className={'mt-6'} disabled={loading}>
            <SubmitButton text="Agregar" loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

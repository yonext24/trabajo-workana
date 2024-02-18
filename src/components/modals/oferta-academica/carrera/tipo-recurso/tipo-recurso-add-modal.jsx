import { InputWLabel } from '@/components/common/input-w-label'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useForm } from 'react-hook-form'

export function AddTipoRecursoModal({ closeModal }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { addCarreraTipoRecurso } = useOfertaAcademicaActions()

  const handleUpload = handleLoading(async data => {
    const res = await addCarreraTipoRecurso(data)
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Tipo de Recurso" closeModal={closeModal} loading={loading} errors={errors}>
        <form className="p-6 gap-4 flex flex-col" onSubmit={handleSubmit(handleUpload)}>
          <InputWLabel
            name="nombre"
            required
            registerProps={{
              maxLength: { value: 50, message: 'El nombre debe tener como máximo 50 caracteres.' }
            }}
            maxLength={50}
            register={register}
          />
          <InputWLabel
            name="descripcion"
            labelText={'Descripción'}
            maxLength={50}
            registerProps={{
              maxLength: { value: 50, message: 'La descripción debe tener como máximo 50 caracteres.' }
            }}
            required
            register={register}
            isTextArea
          />

          <ButtonsContainer className={'mt-6'} disabled={loading} closeModal={closeModal}>
            <SubmitButton text="Enviar" laoding={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

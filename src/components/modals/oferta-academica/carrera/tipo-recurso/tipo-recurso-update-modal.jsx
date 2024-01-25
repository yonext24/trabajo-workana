import { InputWLabel } from '@/components/common/input-w-label'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useForm } from 'react-hook-form'

export function UpdateTipoRecursoModal({ nombre, descripcion, id_tipo_recurso, closeModal }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { updateCarreraTipoRecurso } = useOfertaAcademicaActions()

  const handleUpload = handleLoading(async data => {
    const res = await updateCarreraTipoRecurso({ ...data, id_tipo_recurso })
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Actualizar Tipo de Recurso" closeModal={closeModal} errors={errors} loading={loading}>
        <form className="p-6 gap-4 flex flex-col" onSubmit={handleSubmit(handleUpload)}>
          <InputWLabel
            name="nombre"
            maxLength={50}
            registerProps={{
              maxLength: { value: 50, message: 'El nombre debe tener como máximo 50 caracteres.' }
            }}
            disabled
            defaultValue={nombre}
          />
          <InputWLabel
            name="descripcion"
            maxLength={50}
            registerProps={{
              maxLength: { value: 50, message: 'La descripción debe tener como máximo 50 caracteres.' }
            }}
            required
            register={register}
            isTextArea
            defaultValue={descripcion}
          />

          <ButtonsContainer className={'mt-6'} disabled={loading} closeModal={closeModal}>
            <SubmitButton loading={loading} text="Actualizar" />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

import { InputWLabel } from '@/components/common/input-w-label'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useForm } from 'react-hook-form'

export function RecursoUpdateModal({ closeModal, id_recurso, descripcion, nombre, tipo }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { updateCarreraRecurso } = useOfertaAcademicaActions()

  const handleUpload = handleLoading(async data => {
    const res = await updateCarreraRecurso({ id_recurso, ...data })
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Recurso" closeModal={closeModal} errors={errors} loading={loading}>
        <form className="p-6 flex flex-col gap-3 overflow-hidden" onSubmit={handleSubmit(handleUpload)}>
          <InputWLabel labelText={'Tipo'} disabled name="tipo" defaultValue={tipo} />

          <InputWLabel name="nombre" defaultValue={nombre} disabled />
          <InputWLabel
            name="descripcion"
            defaultValue={descripcion}
            registerProps={{ maxLength: { value: 20, message: 'Máximo 20 caracteres.' } }}
            required
            register={register}
            isTextArea
          />

          <ButtonsContainer className={'mt-6'}>
            <SubmitButton text="Actualizar" loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

import { InputWLabel } from '@/components/common/input-w-label'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useForm } from 'react-hook-form'

export function UpdateNivelModal({ closeModal, nombre, descripcion, id_nivel }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { updateCarreraNivel } = useOfertaAcademicaActions()

  const handleUpload = handleLoading(async data => {
    const res = await updateCarreraNivel({ ...data, id_nivel })
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Modificar Nivel" closeModal={closeModal} loading={loading} errors={errors}>
        <form className="p-6 gap-4 flex flex-col" onSubmit={handleSubmit(handleUpload)}>
          <InputWLabel name="nombre" disabled defaultValue={nombre} />
          <InputWLabel name="descripcion" required register={register} isTextArea defaultValue={descripcion} />

          <ButtonsContainer className={'mt-6'} disabled={loading}>
            <SubmitButton text="Actualizar" loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

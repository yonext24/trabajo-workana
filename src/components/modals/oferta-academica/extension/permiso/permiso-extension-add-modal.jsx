import { InputWLabel } from '@/components/common/input-w-label'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useForm } from 'react-hook-form'

export function PermisoExtensionAddModal({ closeModal }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting: loading },
    setError
  } = useForm()

  const { addOfertaAcademicaPermiso } = useOfertaAcademicaActions()

  const onSubmit = async data => {
    const res = await addOfertaAcademicaPermiso(data)
    handleErrorInFormResponse(res, setError, closeModal)
  }

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout
        closeModal={closeModal}
        loading={loading}
        title="Agregar Permiso de Extensión"
        errors={errors}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-3 py-6 gap-2">
          <InputWLabel
            register={register}
            name="nombre"
            required
            registerProps={{
              minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres.' },
              maxLength: { value: 50, message: 'El nombre debe tener como máximo 50 caracteres.' }
            }}
            maxLength={50}
            autoFocus
          />
          <InputWLabel
            register={register}
            isTextArea
            maxLength={50}
            registerProps={{
              maxLength: { value: 50, message: 'La descripción debe tener como máximo 50 caracteres.' }
            }}
            rows={3}
            name="descripcion"
            labelText="Descripción"
          />

          <ButtonsContainer closeModal={closeModal} disabled={loading} className={'mt-8'}>
            <SubmitButton loading={loading} text="Agregar" />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

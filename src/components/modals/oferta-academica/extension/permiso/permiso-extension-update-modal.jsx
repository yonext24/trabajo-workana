import { InputWLabel } from '@/components/common/input-w-label'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useForm } from 'react-hook-form'

export function PermisoExtensionUpdateModal({ closeModal, id_permiso, nombre, descripcion }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting: loading },
    setError
  } = useForm()

  const { updateOfertaAcademicaPermiso } = useOfertaAcademicaActions()

  const onSubmit = async data => {
    const res = await updateOfertaAcademicaPermiso({ ...data, id_permiso })
    handleErrorInFormResponse(res, setError, closeModal)
  }

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout
        closeModal={closeModal}
        loading={loading}
        title="Actualizar Permiso de Extensión"
        errors={errors}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-3 py-6 gap-2">
          <InputWLabel name="nombre" defaultValue={nombre} disabled />
          <InputWLabel
            isTextArea
            rows={3}
            autoFocus
            defaultValue={descripcion}
            register={register}
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

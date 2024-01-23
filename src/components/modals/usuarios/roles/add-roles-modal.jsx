import { useForm } from 'react-hook-form'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { SubmitButton } from '@/components/common/submit-button'
import { handleErrorInFormResponse } from '@/utils/consts'

export function AddRolesModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: loading },
    setError
  } = useForm()

  const { addRole } = useUsuariosActions()

  const handleUpdate = async data => {
    const res = await addRole(data)
    handleErrorInFormResponse(res, setError, closeModal)
  }

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title="Agregar Rol" loading={loading} errors={errors} closeModal={closeModal}>
        <form onSubmit={handleSubmit(handleUpdate)} className="py-8 px-4 flex flex-col gap-2 font-semibold">
          <InputWLabel
            id="nombre"
            name="nombre"
            labelText="Nombre"
            type="text"
            autoFocus
            register={register}
            required
          />
          <InputWLabel
            id="descripcion"
            name="descripcion"
            labelText="Descripción"
            type="text"
            inputClassName={'mb-12 resize-none'}
            rows={4}
            isTextArea
            register={register}
            required
          />

          <ButtonsContainer closeModal={closeModal} disabled={loading}>
            <SubmitButton loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

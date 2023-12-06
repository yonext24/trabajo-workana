import { useForm } from 'react-hook-form'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { useSelector } from 'react-redux'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'

export function AddRolesModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { data: rolesData } = useSelector(s => s.usuarios).roles
  const { addRole } = useUsuariosActions()

  const handleUpdate = handleLoading(async data => {
    await addRole(data)
  })

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
            registerProps={{
              validate: nombre => {
                if (rolesData.some(el => el.nombre === nombre)) {
                  return 'Ya existe un rol de esas características.'
                }
              }
            }}
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

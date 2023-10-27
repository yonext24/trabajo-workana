import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../default-modal-layout'
import { ModalBackground } from '../modal-background'
import { useForm } from 'react-hook-form'
import { ButtonsContainer } from '../buttons-container'
import { FormErrorMessage } from '@/components/common/form-error-message'
import { useModalLogic } from '@/hooks/useModalLogic'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useAuthActions } from '@/hooks/useAuthActions'

export function ChangePasswordModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  useModalLogic({ closeModal: () => {}, noScroll: true })
  const { ChangePassword } = useAuthActions()

  const handleUpdate = handleLoading(async data => {
    const { error } = await ChangePassword(data)
    if (error) {
      setError('actual', { message: error.message ?? error })
      return
    }
    closeModal()
  })

  return (
    <ModalBackground closeModal={() => {}}>
      <DefaultModalLayout
        noButton
        className="max-w-lg"
        title="Cambiar Contraseña"
      >
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-col px-12 gap-4 py-4"
        >
          <h5 className="font-semibold text-xl text-center">
            Deberás cambiar tu contraseña para poder seguir
          </h5>

          <InputWLabel
            type="password"
            labelText={'Contraseña Actual'}
            required
            name="actual"
            id="actual"
            register={register}
          />
          <InputWLabel
            type="password"
            labelText={'Nueva Contraseña'}
            required
            name="nuevo"
            id="nuevo"
            register={register}
            registerProps={{
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres'
              },
              maxLength: {
                value: 25,
                message: 'La contraseña debe tener menos de 25 caracteres'
              }
            }}
          />
          <InputWLabel
            type="password"
            labelText={'Confirmar'}
            name="confirmacion"
            id="confirmacion"
            register={register}
            registerProps={{
              validate: value => {
                if (watch('nuevo') !== value) {
                  return 'Las contraseñas no coinciden'
                }
              }
            }}
          />

          <ButtonsContainer
            alone
            className={'[&>button]:w-auto [&>button]:px-4 mt-4'}
          >
            <button type="submit" disabled={loading}>
              Cambiar Contraseña
            </button>
          </ButtonsContainer>

          <FormErrorMessage errors={errors} />
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

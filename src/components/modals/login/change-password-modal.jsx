import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../default-modal-layout'
import { ModalBackground } from '../modal-background'
import { useForm } from 'react-hook-form'
import { ButtonsContainer } from '../buttons-container'
import { FormErrorMessage } from '@/components/common/form-error-message'
import { useModalLogic } from '@/hooks/useModalLogic'
import { SubmitButton } from '@/components/common/submit-button'
import { confirmar_contraseña_validations, nueva_contraseña_validations } from '@/utils/validations/passwords'
import { auth } from '@/utils/routes'
import { toast } from 'react-toastify'

export function ChangePasswordModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm()

  useModalLogic({ closeModal: () => {}, noScroll: true })

  const handleUpdate = async data => {
    try {
      await auth.changePassword(data)
      toast.success('La contraseña se actualizó correctamente.')
      closeModal()
    } catch (err) {
      setError('root.fetchError', { message: err.message ?? 'Algo salió mal.' })
    }
  }

  return (
    <ModalBackground closeModal={() => {}}>
      <DefaultModalLayout noButton className="max-w-lg" title="Cambiar Contraseña">
        <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col px-12 gap-4 py-4">
          <h5 className="font-semibold text-xl text-center">Deberás cambiar tu contraseña para poder seguir</h5>

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
            registerProps={nueva_contraseña_validations}
          />
          <InputWLabel
            type="password"
            labelText={'Confirmar'}
            name="confirmacion"
            id="confirmacion"
            register={register}
            registerProps={confirmar_contraseña_validations}
          />

          <ButtonsContainer alone className={'[&>button]:w-auto [&>button]:px-4 [&>button]:!max-w-[260px] mt-4'}>
            <SubmitButton loading={isSubmitting} text="Cambiar Contraseña" />
          </ButtonsContainer>

          <FormErrorMessage errors={errors} />
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

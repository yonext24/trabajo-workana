import { FormErrorMessage } from '@/components/common/form-error-message'
import { InputWLabel } from '@/components/common/input-w-label'
import { Spinner } from '@/components/common/spinner'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { USER_POSSIBLE_STATES } from '@/store/auth/slice'
import { auth } from '@/utils/routes'
import { confirmar_contraseña_validations, nueva_contraseña_validations } from '@/utils/validations/passwords'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function CambiarContrasena() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm()
  const { user, logged } = useSelector(s => s.auth)

  const handleUpload = async data => {
    try {
      await auth.changePassword(data)
      toast.success('La contraseña se ha cambiado correctamente.')
      reset()
    } catch (err) {
      setError('root.fetchError', { message: err.message ?? 'Algo salió mal.' })
    }
  }

  return (
    <div id="page-content">
      {logged === USER_POSSIBLE_STATES.LOGGED && (
        <form
          onSubmit={handleSubmit(handleUpload)}
          className="grid grid-cols-[auto_1fr] py-6 gap-y-6 gap-x-2 lg:gap-x-12 [&>#input-w-label]:col-[2]"
        >
          <label htmlFor={'username'} className="font-semibold text-2xl">
            Usuario actual
          </label>
          <InputWLabel noLabel name="username" disabled value={user?.usuario} labelText="Usuario actual" />
          <label htmlFor={'rol'} className="font-semibold text-2xl">
            Contraseña Actual
          </label>
          <InputWLabel noLabel name="actual" autoFocus type="password" required register={register} />
          <label htmlFor={'puesto'} className="font-semibold text-2xl">
            Nueva contraseña
          </label>
          <InputWLabel
            noLabel
            name="nuevo"
            type="password"
            required
            register={register}
            registerProps={nueva_contraseña_validations}
          />
          <label htmlFor={'nombre'} className="font-semibold text-2xl">
            Confirmar nueva contraseña
          </label>
          <InputWLabel
            noLabel
            name="confirmacion"
            type="password"
            register={register}
            registerProps={confirmar_contraseña_validations}
            required
          />

          <ButtonsContainer alone className={'col-start-1 col-end-3'}>
            <SubmitButton loading={isSubmitting} text="Actualizar" />
          </ButtonsContainer>
          <div className="col-start-1 col-end-3 text-center">
            <FormErrorMessage errors={errors} />
          </div>
        </form>
      )}

      {logged === USER_POSSIBLE_STATES.NOT_KNOWN && (
        <div
          className="bg-black/20 absolute top-0 left-0 w-full h-full rounded-xl flex
    justify-center items-center"
        >
          <Spinner className={'h-12 w-12'} />
        </div>
      )}
    </div>
  )
}

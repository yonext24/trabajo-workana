import { FormErrorMessage } from '@/components/common/form-error-message'
import { InputWLabel } from '@/components/common/input-w-label'
import { Spinner } from '@/components/common/spinner'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { USER_POSSIBLE_STATES, changeUser } from '@/store/auth/slice'
import { auth } from '@/utils/routes'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function Perfil() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    setError
  } = useForm()

  const dispatch = useDispatch()
  const { user, logged } = useSelector(s => s.auth)

  const usuario = user?.usuario
  const rol = user?.rol
  const puesto = user?.puesto
  const apellidos = user?.apellidos
  const CUI = user?.CUI
  const celular = user?.celular
  const correo = user?.correo
  const nombres = user?.nombres
  const telefono = user?.telefono

  const handleUpload = async data => {
    if (Object.entries(touchedFields).length < 1) return
    try {
      await auth.actualzar_perfil(data)
      dispatch(changeUser(data))
      toast.success('Perfil actualizado.')
    } catch (e) {
      setError('root.fetchError', { message: e?.message ?? 'Algo salió mal.' })
    }
  }

  const pattern = { value: /[0-9]+/, message: 'El valor del teléfono debe ser un número.' }

  return (
    <div id="page-content">
      {logged === USER_POSSIBLE_STATES.LOGGED && (
        <form
          onSubmit={handleSubmit(handleUpload)}
          className="grid grid-cols-[auto_1fr] py-6 gap-y-8 gap-x-2 lg:gap-x-12 [&>#input-w-label]:col-[2]"
        >
          <label htmlFor={'username'} className="font-semibold text-2xl">
            Usuario actual
          </label>
          <InputWLabel noLabel name="username" disabled value={usuario} labelText="Usuario actual" />
          <label htmlFor={'rol'} className="font-semibold text-2xl">
            Rol de usuario
          </label>
          <InputWLabel noLabel name="rol" disabled value={rol} labelText="Rol de usuario" />
          <label htmlFor={'puesto'} className="font-semibold text-2xl">
            Puesto de usuario
          </label>
          <InputWLabel noLabel name="puesto" disabled value={puesto} labelText="Puesto" />
          <label htmlFor={'nombres'} className="font-semibold text-2xl">
            Nombres
          </label>
          <InputWLabel noLabel name="nombres" disabled value={nombres} labelText="nombres" />
          <label htmlFor={'apellidos'} className="font-semibold text-2xl">
            Apellidos
          </label>
          <InputWLabel noLabel name="apellidos" disabled value={apellidos} labelText="apellidos" />
          <label htmlFor={'telefono'} autoFocus className="font-semibold text-2xl">
            Teléfono
          </label>
          <InputWLabel
            noLabel
            name="telefono"
            type="number"
            registerProps={{ pattern }}
            register={register}
            required
            defaultValue={telefono}
            labelText="telefono"
          />
          <label htmlFor={'celular'} type="number" className="font-semibold text-2xl">
            Celular
          </label>
          <InputWLabel
            noLabel
            name="celular"
            required
            defaultValue={celular}
            registerProps={{ pattern }}
            register={register}
            labelText="celular"
          />
          <label htmlFor={'CUI'} className="font-semibold text-2xl">
            CUI
          </label>
          <InputWLabel noLabel name="CUI" disabled value={CUI} labelText="CUI" />
          <label htmlFor={'correo'} className="font-semibold text-2xl">
            Correo
          </label>
          <InputWLabel noLabel name="correo" register={register} required defaultValue={correo} labelText="correo" />

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

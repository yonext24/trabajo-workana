import { useSelector } from 'react-redux'
import { InputWLabel } from '../components/common/input-w-label'
import { ReactPortal } from '../components/modals/react-portal'
import { useLayoutActions } from '../hooks/useLayoutActions'
import { PasswordRecoveryModal } from '../components/modals/login/password-recovery-modal'
import { useForm } from 'react-hook-form'
import { useAuthActions } from '@/hooks/useAuthActions'
import { useEffect, useRef } from 'react'
import { USER_POSSIBLE_STATES } from '@/store/auth/slice'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { toast } from 'react-toastify'

export function Login() {
  const { handleSubmit, register } = useForm()
  const { loading, handleLoading } = useFormCustom()
  const { modals } = useSelector(s => s.layout)
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()
  const { Login } = useAuthActions()
  const { logged, error } = useSelector(s => s.auth)

  const hasExpiredMessageShown = useRef(false)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const expired = searchParams.get('expired')

  useEffect(() => {
    if (!expired || hasExpiredMessageShown.current) return
    hasExpiredMessageShown.current = true
    toast.error('Su sesión ha expirado, por favor inicie sesión nuevamente')
  }, [expired])

  useEffect(() => {
    if (expired) return
    if (logged === USER_POSSIBLE_STATES.LOGGED) navigate('/general/sectores')
  }, [logged])

  const handleRecoveryClick = () => {
    const id = 'password-recovery-modal-root'
    openModal({
      Element: PasswordRecoveryModal,
      props: {
        closeModal: () => {
          closeModalFunc(id)
        }
      },
      id
    })
  }

  const handleUpdate = handleLoading(async ({ username, password }) => {
    const formData = new URLSearchParams()
    formData.append('username', username)
    formData.append('password', password)
    const res = await Login({ formData })
    if (!res.error) {
      navigate('/perfil', { replace: true })
    }
  })

  return (
    <>
      <main className="bg-gris flex-1 py-8 px-4">
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="bg-white rounded-lg w-full gap-y-3 flex flex-col max-w-lg mx-auto px-16 py-8"
        >
          <h1 className="text-3xl font-semibold text-center mb-2">Iniciar Sesion</h1>
          <InputWLabel
            autoFocus
            labelText={'Nombre'}
            register={register}
            required
            name="username"
            inputClassName="mt-2"
          />
          <InputWLabel
            type="password"
            labelText={'Contraseña'}
            register={register}
            required
            name="password"
            inputClassName="mt-2"
          />
          <ButtonsContainer alone>
            <SubmitButton text="Entrar" loading={loading} className="!py-2" />
          </ButtonsContainer>

          {error && <p className="text-red-500">{error}</p>}

          <div className="w-full border-t-2 border-gris flex">
            <button
              disabled={loading}
              role="button"
              onClick={handleRecoveryClick}
              type="button"
              className="underline text-blue-500 font-semibold mx-auto mt-1"
            >
              Recuperar contraseña
            </button>
          </div>
        </form>
      </main>
      <ReactPortal wrapperId="login-modals-wrapper">
        {modals.map(({ Element, id, props }) => (
          <Element key={id} {...props} />
        ))}
      </ReactPortal>
    </>
  )
}

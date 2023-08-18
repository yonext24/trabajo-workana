import { useSelector } from 'react-redux'
import { InputWLabel } from '../components/common/input-w-label'
import { ReactPortal } from '../components/modals/react-portal'
import { useLayoutActions } from '../hooks/useLayoutActions'
import { PasswordRecoveryModal } from '../components/modals/login/password-recovery-modal'

export function Login () {
  const { modals } = useSelector(s => s.layout)
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handleRecoveryClick = () => {
    const id = 'password-recovery-modal-root'
    openModal({
      Element: PasswordRecoveryModal,
      props: {
        closeModal: () => { closeModalFunc(id) }
      },
      id
    })
  }
  return <>
    <main className="bg-gris flex-1 py-8 px-4">

      <form className="bg-white rounded-lg h-full w-full gap-y-3 flex flex-col max-w-lg mx-auto px-16 py-8">
        <h1 className='text-3xl font-semibold text-center mb-2'>Iniciar Sesion</h1>
        <InputWLabel labelText={'Nombre'} id='name' name='name' inputClassName='mt-2' />
        <InputWLabel labelText={'Contraseña'} id='password' name='password' inputClassName='mt-2' />
        <button className='text-button bg-gris-oscuro py-1 px-16 w-max text-white mx-auto rounded-md'>Entrar</button>
        <div className='w-full border-t-2 border-gris flex'>
          <button onClick={handleRecoveryClick} type='button' className='underline text-blue-500 font-semibold mx-auto mt-1'>Recuperar contraseña</button>
        </div>

      </form>

    </main>
    <ReactPortal wrapperId='login-modals-wrapper'>
      {
        modals.map(({ Element, id, props }) => <Element key={id} {...props} />)
      }
    </ReactPortal>
  </>
}

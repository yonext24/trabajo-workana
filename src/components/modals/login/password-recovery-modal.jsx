import { InputWLabel } from '../../common/input-w-label'
import { ModalBackground } from '../modal-background'

export function PasswordRecoveryModal ({ closeModal }) {
  return <ModalBackground onClick={closeModal}>
    <form className="bg-white rounded-lg w-full h-[60vh] gap-y-3 flex flex-col max-w-lg mx-auto px-16 py-8">

        <h1 className='text-2xl font-semibold text-center mb-2'>Recuperar contraseña</h1>
        <InputWLabel labelText={'Correo'} id='email' name='email' inputClassName='mt-2' />
        <button className='text-button bg-azulfondo mt-12 py-1 px-16 w-max text-white mx-auto rounded-md'>Enviar</button>

      </form>

  </ModalBackground>
}

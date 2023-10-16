import { InputWLabel } from '@/components/common/input-w-label'
import { Spinner } from '@/components/common/spinner'
import { USER_POSSIBLE_STATES } from '@/store/auth/slice'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function CambiarContrasena () {
  const { register, handleSubmit } = useForm()
  const { user, logged } = useSelector(s => s.auth)

  const handleUpload = data => {
    toast('Esperando api')
  }

  return <div id='page-content'>

  {
    logged === USER_POSSIBLE_STATES.LOGGED &&
    <form onSubmit={handleSubmit(handleUpload)} className="grid grid-cols-[auto_1fr] py-6 gap-y-6 gap-x-2 lg:gap-x-12 [&>#input-w-label]:col-[2]">
      <label htmlFor={'username'} className='font-semibold text-2xl'>Usuario actual</label>
      <InputWLabel noLabel name='username' register={register} disabled value={user?.usuario} labelText='Usuario actual' />
      <label htmlFor={'rol'} className='font-semibold text-2xl'>Contraseña Actual</label>
      <InputWLabel noLabel name='actual_password' autoFocus required register={register} />
      <label htmlFor={'puesto'} className='font-semibold text-2xl'>Nueva contraseña</label>
      <InputWLabel noLabel name='new_password' required register={register} />
      <label htmlFor={'nombre'} className='font-semibold text-2xl'>Confirmar nueva contraseña</label>
      <InputWLabel noLabel name='confirm_new_password' register={register} required />

      <button type='submit' className='bg-gris-oscuro text-white font-semibold px-12 py-3 rounded-md text-xl col-start-1 col-end-3 mx-auto'>Actualizar</button>
    </form>
  }

  {
    logged === USER_POSSIBLE_STATES.NOT_KNOWN && <div className='bg-black/20 absolute top-0 left-0 w-full h-full rounded-xl flex
    justify-center items-center'>
      <Spinner className={'h-12 w-12'} />
    </div>
  }
</div>
}

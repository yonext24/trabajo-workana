import { InputWLabel } from '@/components/common/input-w-label'
import { Spinner } from '@/components/common/spinner'
import { USER_POSSIBLE_STATES } from '@/store/auth/slice'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

export function Perfil () {
  const { register, handleSubmit } = useForm()
  const { user, logged } = useSelector(s => s.auth)

  const handleUpload = data => {
    console.log(data)
    console.log(user)
  }

  return <div id='page-content'>

    {
      logged === USER_POSSIBLE_STATES.LOGGED &&
      <form onSubmit={handleSubmit(handleUpload)} className="grid grid-cols-[auto_1fr] py-6 gap-y-6 gap-x-2 lg:gap-x-12 [&>#input-w-label]:col-[2]">
        <label htmlFor={'username'} className='font-semibold text-2xl'>Usuario actual</label>
        <InputWLabel noLabel name='username' register={register} disabled value={user?.username} labelText='Usuario actual' />
        <label htmlFor={'rol'} className='font-semibold text-2xl'>Rol de usuario</label>
        <InputWLabel noLabel name='rol' register={register} disabled value={user?.rol} labelText='Rol de usuario' />
        <label htmlFor={'puesto'} className='font-semibold text-2xl'>Puesto de usuario</label>
        <InputWLabel noLabel name='puesto' register={register} disabled value={user?.puesto} labelText='Puesto' />
        <label htmlFor={'nombre'} className='font-semibold text-2xl'>Nombre</label>
        <InputWLabel noLabel name='nombre' register={register} disabled value={user?.nombre} labelText='nombre' />
        <label htmlFor={'telefono'} autoFocus className='font-semibold text-2xl'>Teléfono</label>
        <InputWLabel noLabel name='telefono' register={register} required defaultValue={user?.telefono} labelText='telefono' />
        <label htmlFor={'celular'} className='font-semibold text-2xl'>Celular</label>
        <InputWLabel noLabel name='celular' register={register} required defaultValue={user?.celular} labelText='celular' />
        <label htmlFor={'CUI'} className='font-semibold text-2xl'>CUI</label>
        <InputWLabel noLabel name='CUI' register={register} disabled value={user?.CUI} labelText='CUI' />
        <label htmlFor={'correo'} className='font-semibold text-2xl'>Correo</label>
        <InputWLabel noLabel name='correo' register={register} required defaultValue={user?.correo} labelText='correo' />

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

import { useForm } from 'react-hook-form'
import { Spinner } from '../common/spinner'
import { SelectInputControlledWithLabel } from '../common/select-input-controlled-with-label'
import { SearchButton } from '../common/table-buttons'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { toast } from 'react-toastify'

export function UsuariosFilter({ usuariosLoading }) {
  const { handleSubmit, register, control } = useForm()

  const { searchUsuario } = useUsuariosActions()

  const onSubmit = async ({ searchFor, search }) => {
    const res = await searchUsuario({ [searchFor]: search })
    if (res.error) {
      toast.error(res.error?.message ?? 'Hubo un error al buscar el usuario.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex md:items-end gap-x-4 gap-y-2 flex-col lg:flex-row">
      <div className="flex items-center gap-2 w-full min-w-[200px]">
        <SelectInputControlledWithLabel
          control={control}
          id="searchFor"
          name="searchFor"
          labelText={'Buscar por'}
          options={['correo', 'cui']}
          className="!w-44"
          firstOne
        />
        <div className="w-9 lg:w-4 flex self-end justify-center mb-3">
          {usuariosLoading && <Spinner className={'h-4 w-4'} />}
        </div>
      </div>

      <div className="flex">
        <input
          type="text"
          className="border border-gris rounded-md py-1 px-4 w-full"
          {...register('search', { required: true })}
        />
        <SearchButton style={{ top: '-70%' }} handleClick={() => {}} />
      </div>
    </form>
  )
}

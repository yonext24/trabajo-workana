import { useForm } from 'react-hook-form'
import { Spinner } from '../common/spinner'
import { SelectInputControlledWithLabel } from '../common/select-input-controlled-with-label'
import { SearchButton } from '../common/table-buttons'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'

export function UsuariosFilter({ usuariosLoading }) {
  const { handleSubmit, register, control } = useForm()

  const { searchUsuario } = useUsuariosActions()

  const onSubmit = async ({ searchFor, search }) => {
    const res = await searchUsuario({ [searchFor]: search })
    console.log(res)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex md:items-end gap-4 flex-col md:flex-row">
      <SelectInputControlledWithLabel
        control={control}
        id="searchFor"
        name="searchFor"
        labelText={'Buscar por'}
        options={['correo', 'cui']}
        firstOne
      />
      <div className="h-9 w-4 flex justify-center items-center">
        {usuariosLoading && <Spinner className={'h-4 w-4'} />}
      </div>

      <div className="flex">
        <input
          type="text"
          className="border border-gris rounded-md py-1 px-4"
          {...register('search', { required: true })}
        />
        <SearchButton handleClick={() => {}} />
      </div>
    </form>
  )
}

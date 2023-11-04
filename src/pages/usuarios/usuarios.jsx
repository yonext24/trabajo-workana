import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input'
import { Spinner } from '@/components/common/spinner'
import {
  ChangeRoleButton,
  DeactivateButton,
  UpdateButton
} from '@/components/common/table-buttons'
import { PlusRoundedIcon, SearchIcon } from '@/components/icons'
import { TableUsuarios } from '@/components/tables/usuarios/table-usuarios/table-usuarios'
import { useUsuariosPage } from '@/hooks/useUsuariosPage'

// Esta página y todas las de la carpeta /usuarios tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Usuarios() {
  const {
    onSubmit,
    handleRole,
    handleInfo,
    handleDel,
    handleUpd,
    handleAdd,
    register,
    handleSubmit,
    setSearchFor,
    canShow,
    usuariosLoading,
    UPDATE,
    CREATE
  } = useUsuariosPage()

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <NuevoButton handleClick={handleAdd} CREATE={CREATE} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex md:items-end gap-4 flex-col md:flex-row"
        >
          <div className="flex flex-col w-48">
            <label className="font-semibold text-lg">Buscar por</label>
            <SelectInput
              options={['correo', 'cui']}
              handleOptionClick={setSearchFor}
              firstOne
            />
          </div>
          <div className="h-9 w-4 flex justify-center items-center">
            {usuariosLoading && <Spinner className={'h-4 w-4'} />}
          </div>

          <div className="flex">
            <input
              type="text"
              className="border border-gris rounded-md py-1 px-4"
              {...register('search', { required: true })}
            />
            <button type="submit" className="bg-gray-800 p-1 rounded-lg ml-1">
              <SearchIcon className="h-7 w-7 text-white" />
            </button>
          </div>
        </form>
      </div>

      <TableUsuarios />
      <button
        onClick={handleInfo}
        className="bg-neutral-800 text-white p-1 self-start -mt-7 rounded-md"
      >
        <PlusRoundedIcon className="h-6 w-6" />
      </button>

      {UPDATE && (
        <div className="w-full flex gap-3 justify-center">
          <UpdateButton
            handleClick={() => {
              canShow && handleUpd()
            }}
            iconProps={{ className: '!h-10 !w-10' }}
          />
          <ChangeRoleButton
            handleClick={() => {
              canShow && handleRole()
            }}
            iconProps={{ className: 'h-10 w-10' }}
          />
          <DeactivateButton
            handleClick={() => {
              canShow && handleDel()
            }}
            iconProps={{ className: 'h-10 w-10' }}
          />
        </div>
      )}
    </div>
  )
}

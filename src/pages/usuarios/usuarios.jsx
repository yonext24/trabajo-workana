import { NuevoButton } from '@/components/common/nuevo-button'
import {
  ChangeRoleButton,
  DeactivateButton,
  SeeMoreOfUserButton,
  UpdateButton
} from '@/components/common/table-buttons'
import { UsuariosFilter } from '@/components/filters/usuarios-filter'
import { TableUsuarios } from '@/components/tables/usuarios/table-usuarios/table-usuarios'
import { useUsuariosPage } from '@/hooks/useUsuariosPage'

// Esta página y todas las de la carpeta /usuarios tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Usuarios() {
  const { handleRole, handleInfo, handleDel, handleUpd, handleAdd, canShow, usuariosLoading, UPDATE, CREATE } =
    useUsuariosPage()

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <NuevoButton handleClick={handleAdd} CREATE={CREATE} />

        <UsuariosFilter usuariosLoading={usuariosLoading} />
      </div>

      <TableUsuarios />
      <SeeMoreOfUserButton handleClick={handleInfo} style={{ top: '-150%' }} />

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

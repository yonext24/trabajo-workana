import { useEffect, useMemo } from 'react'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useSelector } from 'react-redux'
import { TablePermisos } from '@/components/tables/usuarios/table-permisos/table-permisos'
import { usePermissions } from '@/hooks/usePermissions'

export function RolePermissionsModal({ closeModal, nombre, id_rol }) {
  const permissions = useSelector(s => s.usuarios.roles.permissionsData)

  const pagePermissions = usePermissions('USUARIOS')

  const rolePermissions = useMemo(() => {
    return permissions.find(p => p.id_rol === id_rol)?.permissions ?? []
  }, [permissions, id_rol])

  const { getRolePermissions } = useUsuariosActions()

  useEffect(() => {
    getRolePermissions(id_rol)
  }, [])

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Lista de permisos" className={'!max-w-5xl h-[90vh]'} closeModal={closeModal}>
        <div className="px-6 flex flex-col gap-y-5 py-4 justify-between h-full overflow-y-auto">
          <h3 className="text-2xl font-bold">Rol: {nombre}</h3>

          {rolePermissions && <TablePermisos outsideData={rolePermissions} permissions={pagePermissions} />}

          <button
            onClick={closeModal}
            className="mx-auto mt-auto py-2 text-button bg-gris-oscuro text-white px-16 rounded-md"
          >
            Salir
          </button>
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

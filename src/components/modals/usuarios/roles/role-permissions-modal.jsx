import { useEffect } from 'react'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useSelector } from 'react-redux'
import { TablePermisos } from '@/components/tables/usuarios/table-permisos/table-permisos'

export function RolePermissionsModal ({ closeModal, role }) {
  const { data } = useSelector(s => s.usuarios).roles
  const actualRole = data.find(el => el.nombre === role.nombre)

  const { getRolePermissions } = useUsuariosActions()
  useEffect(() => {
    getRolePermissions(role.nombre)
  }, [])

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>
    <DefaultModalLayout title='Lista de permisos' className={'!max-w-5xl h-[90vh]'}>

      <div className='px-6 flex flex-col gap-y-5 py-4 justify-between h-full overflow-y-auto'>

        <h3 className='text-2xl font-bold'>Rol: {role.nombre}</h3>

        {
          actualRole?.permissions && <TablePermisos outsideData={actualRole.permissions} />
        }

        <button onClick={closeModal} className='mx-auto mt-auto py-2 text-button bg-gris-oscuro text-white px-16 rounded-md'>Salir</button>

      </div>

    </DefaultModalLayout>
  </ModalBackground>
}

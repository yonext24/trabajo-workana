/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { PermisosFilter } from '@/components/usuarios/permisos-filter'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { TablePermisos } from '@/components/tables/usuarios/table-permisos/table-permisos'

export function UpdRolesModal ({ closeModal }) {
  const { permisos: { data: permisosData }, roles: { data: rolesData } } = useSelector(s => s.usuarios)
  const { register } = useForm()
  const { getPermisosData } = useUsuariosActions()
  const [filteredRows, setFilteredRows] = useState(permisosData)
  const [addedPermissions, setAddedPermissions] = useState([])

  useEffect(() => {
    getPermisosData(false)
  }, [])

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>
    <DefaultModalLayout title='Modificar Rol' className={'!max-w-5xl !max-h-[95vh] !mx-4 overflow-auto'}>
      <form className='p-6 px-8 flex flex-col gap-y-3'>

        <div className='grid gap-3 grid-cols-[.7fr_1fr]'>
          <InputWLabel register={register} name='nombre' id='nombre' labelText='Nombre' required type='text' />
          <InputWLabel register={register} name='descripcion' id='descripcion' labelText='Descripcion' required type='text' />
        </div>

        <h4 className='text-2xl'>Agregar Permisos</h4>

        <PermisosFilter outsideFunc={setFilteredRows} />

        <TablePermisos outsideData={filteredRows} selectFunction={setAddedPermissions} columns={[{ text: 'Agregar' }]} />

      </form>

    </DefaultModalLayout>
  </ModalBackground>
}

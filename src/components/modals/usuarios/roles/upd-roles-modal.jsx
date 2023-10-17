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
import { ButtonsContainer } from '../../buttons-container'

export function UpdRolesModal ({ closeModal, nombre, descripcion, permissions }) {
  const permisosData = useSelector(s => s.usuarios.permisos.data)
  const rolesData = useSelector(s => s.usuarios.roles.data)

  const { register } = useForm()
  const { getPermisosData, getRolePermissions } = useUsuariosActions()
  const [filteredRows, setFilteredRows] = useState(permisosData)
  const [addedPermissions, setAddedPermissions] = useState([])

  useEffect(() => {
    getPermisosData()
    getRolePermissions(nombre)
  }, [])

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>
    <DefaultModalLayout closeModal={closeModal} title='Modificar Rol' className={'!max-w-5xl !max-h-[98vh] !mx-4 overflow-hidden'}>
      <form className='p-6 px-8 flex flex-col gap-y-3 overflow-y-auto'>

        <div className='grid gap-3 grid-cols-[.7fr_1fr]'>
          <InputWLabel register={register} name='nombre' value={nombre} labelText='Nombre' disabled type='text' />
          <InputWLabel register={register} name='descripcion' defaultValue={descripcion} id='descripcion' labelText='Descripcion' required type='text' />
        </div>

        <h4 className='text-2xl'>Agregar Permisos</h4>

        <PermisosFilter outsideFunc={setFilteredRows} />

        <TablePermisos permissions={permissions} outsideData={filteredRows} selectFunction={setAddedPermissions} columns={[{ text: 'Agregar' }]} />

        <ButtonsContainer className={'[&>button]:py-[6px]'} closeModal={closeModal}>
          <button type='submit'>
            Actualizar
          </button>
        </ButtonsContainer>

      </form>

    </DefaultModalLayout>
  </ModalBackground>
}
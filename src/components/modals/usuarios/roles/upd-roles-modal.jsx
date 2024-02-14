import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { PermisosFilter } from '@/components/filters/permisos-filter'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { TablePermisos } from '@/components/tables/usuarios/table-permisos/table-permisos'
import { ButtonsContainer } from '../../buttons-container'
import { useModalLogic } from '@/hooks/useModalLogic'
import { useFormCustom } from '@/hooks/useFormCustom'
import { usePermissions } from '@/hooks/usePermissions'
import { SubmitButton } from '@/components/common/submit-button'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useAuthActions } from '@/hooks/useAuthActions'
import { useLayoutActions } from '@/hooks/useLayoutActions'
import { ShouldReLoginModal } from '../../login/should-re-login-modal'

export function UpdRolesModal({ closeModal, nombre, descripcion, id_rol }) {
  // ***************** SELECTORS *****************

  const roles = useSelector(s => s.usuarios.roles.data) // En esta modal se recuperan los datos de esta forma
  // porque se actualizan dinámicamente después de que la modal es invocada, y las props no se actualizan
  const currentRole = useMemo(() => roles.find(r => r.id_rol === id_rol), [roles])

  // ***************** CUSTOM HOOKS *****************

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm()
  const { loading, handleLoading } = useFormCustom()
  const permissions = usePermissions('USUARIOS')
  useModalLogic({ closeModal, noScroll: true })
  const { getPermisos, getRolePermissions, getMappedRolePermissions, updateRole } = useUsuariosActions()
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()
  const { Logout } = useAuthActions()

  // **************** STATES *******************

  const [parsedRows, setParsedRows] = useState([])
  const [filteredRows, setFilteredRows] = useState([])
  const [updatedPermissions, setUpdatedPermissions] = useState([])

  // ****************** CALLBACKS *********************

  const uncheckPermission = useCallback(
    ({ id_permiso, actionInUpdateState /*: 'remove' | 'add' */ }) => {
      if (actionInUpdateState === 'add') setUpdatedPermissions(prev => prev.concat({ id_permiso, estado: false }))
      else if (actionInUpdateState === 'remove')
        setUpdatedPermissions(prev => prev.filter(p => p.id_permiso !== id_permiso))

      setParsedRows(prev =>
        prev.map(p => {
          if (p.id_permiso === id_permiso) return { ...p, checked: false }
          return p
        })
      )
    },
    [setUpdatedPermissions]
  )

  const checkPermission = useCallback(({ id_permiso, actionInUpdateState /*: 'remove' | 'add' */ }) => {
    if (actionInUpdateState === 'add') setUpdatedPermissions(prev => prev.concat({ id_permiso, estado: true }))
    else if (actionInUpdateState === 'remove')
      setUpdatedPermissions(prev => prev.filter(p => p.id_permiso !== id_permiso))

    setParsedRows(prev =>
      prev.map(p => {
        if (p.id_permiso === id_permiso) return { ...p, checked: true }
        return p
      })
    )
  })

  const selectFunction = useCallback(
    ({ checked, wasOriginallyInRole, id_permiso }) => {
      if (wasOriginallyInRole && checked) {
        uncheckPermission({ id_permiso, actionInUpdateState: 'add' })
        return
      } else if (wasOriginallyInRole && !checked) {
        checkPermission({ id_permiso, actionInUpdateState: 'remove' })
        return
      } else if (!wasOriginallyInRole && checked) {
        uncheckPermission({ id_permiso, actionInUpdateState: 'remove' })
        return
      } else if (!wasOriginallyInRole && !checked) {
        checkPermission({ id_permiso, actionInUpdateState: 'add' })
        return
      }
    },
    [setUpdatedPermissions]
  )

  const handleSelfRoleChange = () => {
    closeModal()
    Logout()
    openModal({
      Element: ShouldReLoginModal,
      id: 'should-re-login',
      props: {
        closeModal: () => closeModalFunc('should-re-login')
      }
    })
  }

  const user = useSelector(s => s.auth.user)

  const onSubmit = useCallback(
    handleLoading(async value => {
      const { descripcion } = value
      if (descripcion === currentRole.descripcion && !updatedPermissions.length) return

      const rol = {
        id_rol,
        descripcion,
        estado: true
      }

      const res = await updateRole({ rol, actualizar: updatedPermissions })

      handleErrorInFormResponse(res, setError, () => {
        setUpdatedPermissions([])
        if (currentRole.nombre === user.rol) {
          handleSelfRoleChange()
        }
      })
    }),
    [handleLoading, id_rol, updatedPermissions, user]
  )

  // **************** EFFECTS *******************

  useEffect(() => {
    getPermisos()
    getRolePermissions(id_rol)
    getMappedRolePermissions(id_rol)
  }, [])

  useEffect(() => {
    if (!currentRole.permisos) return
    setParsedRows(
      currentRole.permisos.map(p => ({
        ...p,
        checked: p.estado,
        wasOriginallyInRole: p.estado
      }))
    )
    setFilteredRows(
      currentRole.permisos.map(p => ({
        ...p,
        checked: p.estado,
        wasOriginallyInRole: p.estado
      }))
    )
  }, [currentRole])

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        closeModal={closeModal}
        errors={errors}
        loading={loading}
        title="Actualizar Rol"
        info="Recuerda que si no le das permisos de lectura a un rol en un módulo, no podrá acceder a la página de ese módulo aunque tenga otros permisos."
        className={'!max-w-5xl !max-h-[98vh] h-full mx-1 sm:mx-4 overflow-hidden'}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-6 px-2 sm:px-8 flex flex-col gap-y-3 overflow-y-auto h-full [&>#table-container]:!min-h-[auto]"
        >
          <div className="grid gap-3 grid-cols-[.7fr_1fr]">
            <InputWLabel register={register} name="nombre" value={nombre} labelText="Nombre" disabled type="text" />
            <InputWLabel
              register={register}
              name="descripcion"
              defaultValue={descripcion}
              id="descripcion"
              labelText="Descripción"
              required
              registerProps={{
                maxLength: {
                  value: 50,
                  message: 'Máximo 50 caracteres en la descripción.'
                }
              }}
              type="text"
            />
          </div>
          <h4 className="text-2xl">Agregar Permisos</h4>
          <div className="flex justify-between items-end">
            <PermisosFilter sort outsideFunc={setFilteredRows} outsideData={parsedRows} />
            {updatedPermissions.length > 0 && (
              <span className="text-xl font-semibold">Permisos a actualizar: {updatedPermissions.length}</span>
            )}
          </div>
          <div className="h-full overflow-y-scroll flex-1">
            <TablePermisos
              permissions={permissions}
              outsideData={filteredRows}
              selectFunction={selectFunction}
              noMinHeight
              columns={[{ text: 'Agregar', className: 'flex justify-center' }]}
            />
          </div>
          <ButtonsContainer className={'[&>button]:py-[6px]'} closeModal={closeModal} disabled={loading}>
            <SubmitButton text="Actualizar" loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

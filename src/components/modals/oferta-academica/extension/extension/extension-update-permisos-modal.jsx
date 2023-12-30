import { InputWLabel } from '@/components/common/input-w-label'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { PermisoExtensionUpdateModalTable } from '@/components/tables/oferta-academica/extension/permiso/permiso-extension-see-modal-table'
import {
  INITIAL_STATE,
  MODAL_PERMISOS_ACTIONS,
  ModalUpdatePermisosReducer
} from '@/reducers/extension-permisos-reducer'
import { extension } from '@/utils/routes'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'

const { INITIALIZE, TOGGLE_PERMISO, UPDATE_PERMISOS } = MODAL_PERMISOS_ACTIONS

export function ExtensionUpdatePermisosModal({ closeModal, fetchPermisos, unidad, nombre, id_extension }) {
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  const [status, setStatus] = useState({ type: 'idle' })
  const [state, dispatch] = useReducer(ModalUpdatePermisosReducer, INITIAL_STATE)

  console.log(state)

  useEffect(() => {
    setStatus({ type: 'loading' })
    extension
      .get_all_permisos({ id_extension })
      .then(res => {
        const payload = res.map(({ ...el }) => ({
          ...el,
          isIn: el.estado
        }))
        dispatch({ type: INITIALIZE, payload })
        setStatus({ type: 'success' })
      })
      .catch(err => {
        setStatus({ type: 'error', message: err?.message ?? 'Algo salió mal' })
      })
  }, [])

  const onSwitch = useCallback(
    ({ id_permiso, estado, isIn }) => {
      dispatch({ type: TOGGLE_PERMISO, payload: { id_permiso, estado, isIn } })
    },
    [dispatch]
  )

  const onSubmit = useCallback(() => {
    setStatus({ type: 'loading' })
    extension
      .update_permisos({ data: state.actualizando, id_extension })
      .then(() => {
        dispatch({ type: UPDATE_PERMISOS })
        setStatus({ type: 'success' })
        fetchPermisos()
      })
      .catch(err => {
        setStatus({ type: 'error', message: err?.message ?? 'Algo salió mal' })
      })
  }, [fetchPermisos, state.actualizando])

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout
        className={'!max-w-[900px] w-full overflow-hidden max-h-[98vh] overflow-y-hidden'}
        title="Actualizar permisos de extensión"
        closeModal={closeModal}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 p-4">
          <div className="flex gap-4 w-full [&>*]:flex-1">
            <InputWLabel disabled value={unidad} name="Unidad académica" />
            <InputWLabel disabled value={nombre} name="Extensión" />
          </div>
          <div className="flex gap-4 flex-wrap items-end justify-between">
            <h4 className="text-2xl">Actualizar permisos de extensión</h4>
            <span>Permisos a actualizar: {state.actualizando.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <PermisoExtensionUpdateModalTable
              loading={status.type === 'loading' || isSubmitting}
              error={status.type === 'error' && status.message}
              onSwitch={onSwitch}
              data={state.permisos}
              id_extension={id_extension}
            />
          </div>
          <ButtonsContainer closeModal={closeModal} className="mt-4">
            <SubmitButton loading={isSubmitting} disabled={status.type === 'loading'} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

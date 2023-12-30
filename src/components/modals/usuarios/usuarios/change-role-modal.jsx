import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useSelector } from 'react-redux'
import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '../../buttons-container'
import { toast } from 'react-toastify'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect } from 'react'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { SubmitButton } from '@/components/common/submit-button'
import { validateDate } from '@/utils/validations/dates'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { usuarios } from '@/utils/routes'
import { handleErrorInFormResponse } from '@/utils/consts'
import isEqual from 'lodash.isequal'

export function ChangeRoleModal({ closeModal }) {
  const {
    data: { dependencias: dependenciasData, roles: rolesData, puestos: puestosData },
    loading: loadingParams,
    error: errorParams
  } = useFetchLocalData({
    func: getParametros,
    initialData: { puestos: [], dependencias: [], roles: [] }
  })
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting: loading },
    setError
  } = useForm()
  const { searchUsuario } = useUsuariosActions()

  const showing = useSelector(s => s.usuarios.usuarios.showing)
  const { otros, id_usuario, correo } = showing

  const rol = { nombre: otros?.rol, id_rol: otros?.id_rol }
  const dependencia = { nombre: otros?.dependencia, id_dependencia: otros?.id_dependencia }
  const puesto = { nombre: otros?.puesto, id_puesto: otros?.id_puesto }

  const ref_oficio = otros?.ref_oficio
  const fecha_desactivacion = otros?.fecha_desactivacion

  const { getCreateUsuarioParametros, changeRoleUsuario } = useUsuariosActions()

  const handleUpdate = async allData => {
    const { dependencia: localDependencia, puesto: localPuesto, rol: localRol, ...data } = allData
    if (isEqual({ fecha_desactivacion, rol, dependencia, puesto, ref_oficio }, allData)) {
      return
    }

    const dataToUpdate = {
      ...data,
      id_usuario,
      id_dependencia: localDependencia.id_dependencia,
      id_puesto: localPuesto.id_puesto,
      id_rol: localRol.id_rol
    }

    const res = await changeRoleUsuario(dataToUpdate)
    handleErrorInFormResponse(res, setError, () => {
      searchUsuario({ correo })
      toast.success('El usuario se actualizó correctamente.')
      closeModal()
    })
  }

  useEffect(() => {
    getCreateUsuarioParametros()
  }, [])

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        title="Cambiar rol de usuario"
        className={'!max-h-[95vh]'}
        loading={loading}
        errors={errors}
        closeModal={closeModal}
      >
        <form
          className="p-6 [&_label]:font-semibold [&_label]:text-lg flex flex-col gap-3 overflow-y-scroll"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <SelectInputControlledWithLabel
            labelText={'Rol'}
            control={control}
            name="rol"
            rules={{ required: true }}
            options={rolesData}
            show="nombre"
            defaultValue={rol}
            loading={loadingParams}
            error={errorParams}
          />
          <SelectInputControlledWithLabel
            labelText={'Dependencia'}
            control={control}
            name="dependencia"
            rules={{ required: true }}
            options={dependenciasData}
            show="nombre"
            defaultValue={dependencia}
            loading={loadingParams}
            error={errorParams}
          />
          <SelectInputControlledWithLabel
            labelText={'Puesto'}
            control={control}
            name="puesto"
            rules={{ required: true }}
            options={puestosData}
            show="nombre"
            defaultValue={puesto}
            loading={loadingParams}
            error={errorParams}
          />
          <InputWLabel
            register={register}
            type="text"
            id="ref_oficio"
            labelText="Referencia de oficio"
            name="ref_oficio"
            defaultValue={ref_oficio}
          />
          <InputWLabel
            register={register}
            type="date"
            id="fecha_desactivacion"
            labelText="Fecha de desactivación"
            name="fecha_desactivacion"
            defaultValue={fecha_desactivacion}
            registerProps={{
              validate: validateDate
            }}
          />

          <ButtonsContainer className="[&>button]:!py-2 mt-6" disabled={loading} closeModal={closeModal}>
            <SubmitButton text="Actualizar" loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

async function getParametros() {
  const rawData = await usuarios.usuarios.getParameters()

  const rawPuestos = rawData?.puestos
  const rawDependencias = rawData?.dependencias
  const rawRoles = rawData?.roles

  const puestos = rawPuestos.map(({ id, ...el }) => ({ id_puesto: id, ...el }))
  const dependencias = rawDependencias.map(({ id, ...el }) => ({ id_dependencia: id, ...el }))
  const roles = rawRoles.map(({ id, ...el }) => ({ id_rol: id, ...el }))

  return { puestos, dependencias, roles }
}

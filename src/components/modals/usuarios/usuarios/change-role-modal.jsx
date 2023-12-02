import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useSelector } from 'react-redux'
import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '../../buttons-container'
import { toast } from 'react-toastify'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect } from 'react'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'
import { validateDate } from '@/utils/validations/dates'

export function ChangeRoleModal({ closeModal }) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const showing = useSelector(s => s.usuarios.usuarios.showing)
  const rolesData = useSelector(s => s.usuarios.roles.data)
  const rolesLoading = useSelector(s => s.usuarios.roles.revalidating)
  const rolesError = useSelector(s => s.usuarios.roles.error)
  const dependenciasData = useSelector(s => s.data.dependencias.data)
  const dependenciasLoading = useSelector(s => s.data.dependencias.revalidating)
  const dependenciasError = useSelector(s => s.data.dependencias.error)
  const puestosData = useSelector(s => s.data.puestos.data)
  const puestosLoading = useSelector(s => s.data.puestos.revalidating)
  const puestosError = useSelector(s => s.data.puestos.error)

  const { otros, usuario } = showing
  const rol = otros?.rol
  const dependencia = otros?.dependencia
  const puesto = otros?.puesto
  const ref_oficio = otros?.ref_oficio
  const fecha_desactivacion = otros?.fecha_desactivacion

  const { getCreateUsuarioParametros, updateUsuario } = useUsuariosActions()

  const handleUpdate = handleLoading(async data => {
    const { dependencia, puesto, rol, ...rest } = data

    const dataToUpdate = { ...rest, usuario }

    if (typeof dependencia !== 'string') {
      dataToUpdate.id_dependencia = dependencia.id
      dataToUpdate.dependencia = dependencia.nombre
    }
    if (typeof puesto !== 'string') {
      dataToUpdate.id_puesto = puesto.id
      dataToUpdate.puesto = puesto.nombre
    }
    if (typeof rol !== 'string') {
      dataToUpdate.id_rol = rol.id
      dataToUpdate.rol = rol.nombre
    }

    const res = await updateUsuario(dataToUpdate)
    if (res?.error) {
      const message = res.error?.message ?? 'Ocurrió un error inesperado, si persiste porfavor contacta a soporte.'
      setError('root.fetchError', { type: 'to-not-invalidate', message })
      return
    }

    toast.success('El usuario se actualizó correctamente.')
    closeModal()
  })

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
            loading={rolesLoading}
            error={rolesError}
          />
          <SelectInputControlledWithLabel
            labelText={'Dependencia'}
            control={control}
            name="dependencia"
            rules={{ required: true }}
            options={dependenciasData}
            show="nombre"
            defaultValue={dependencia}
            loading={dependenciasLoading}
            error={dependenciasError}
          />
          <SelectInputControlledWithLabel
            labelText={'Puesto'}
            control={control}
            name="puesto"
            rules={{ required: true }}
            options={puestosData}
            show="nombre"
            defaultValue={puesto}
            loading={puestosLoading}
            error={puestosError}
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

          <ButtonsContainer className="[&>button]:!py-2 mt-6" disabled={loading}>
            <SubmitButton text="Actualizar" loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

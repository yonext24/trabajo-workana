import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { useSelector } from 'react-redux'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useCallback, useEffect } from 'react'
import { ButtonsContainer } from '../../buttons-container'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useModalLogic } from '@/hooks/useModalLogic'
import { toast } from 'react-toastify'
import { SubmitButton } from '@/components/common/submit-button'

export function AddUsuariosModal({ closeModal }) {
  const dependencias = useSelector(s => s.data.dependencias.data)
  const dependenciasLoading = useSelector(s => s.data.dependencias.revalidating)
  const puestos = useSelector(s => s.data.puestos.data)
  const puestosLoading = useSelector(s => s.data.puestos.revalidating)
  const roles = useSelector(s => s.usuarios.roles.data)
  const rolesLoading = useSelector(s => s.usuarios.roles.revalidating)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()
  const { getCreateUsuarioParametros, createUsuario } = useUsuariosActions()
  useModalLogic({ closeModal, noScroll: true })

  const onSubmit = useCallback(
    handleLoading(async data => {
      const {
        rol,
        dependencia,
        puesto,
        ref_oficio,
        fecha_desactivacion,
        ...restOfUser
      } = data
      const { id: id_dependencia } = dependencia
      const { id: id_rol } = rol
      const { id: id_puesto } = puesto

      const otros = {
        id_dependencia,
        id_rol,
        id_puesto,
        ref_oficio,
        fecha_desactivacion
      }

      const parsedUserToSend = { usuario: { ...restOfUser }, otros }

      const res = await createUsuario(parsedUserToSend)
      if (res?.error) {
        const message =
          res.error?.message ??
          'Ocurrió un error inesperado, si persiste porfavor contacta a soporte.'
        setError('root.fetchError', { type: 'to-not-invalidate', message })
        return
      }

      toast.success('El usuario se creó correctamente.')
      closeModal()
    }),
    [handleLoading]
  )

  useEffect(() => {
    getCreateUsuarioParametros()
  }, [])

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        errors={errors}
        loading={loading}
        closeModal={closeModal}
        className="!max-w-4xl !max-h-[95vh]"
        title="Agregar usuario"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 grid grid-cols-2 gap-2 gap-x-12 font-semibold text-lg overflow-y-scroll"
        >
          <InputWLabel
            register={register}
            type="text"
            id="nombres"
            name="nombres"
            required
          />
          <InputWLabel
            register={register}
            type="text"
            id="apellidos"
            name="apellidos"
            required
          />
          <InputWLabel
            register={register}
            type="text"
            id="telefono"
            name="telefono"
            required
          />
          <InputWLabel
            register={register}
            type="text"
            id="celular"
            name="celular"
            required
          />
          <InputWLabel
            register={register}
            type="text"
            id="CUI"
            name="CUI"
            required
          />
          <InputWLabel
            register={register}
            type="text"
            id="registro_personal"
            name="registro_personal"
            labelText="Registro de personal"
            required
          />
          <InputWLabel
            register={register}
            type="email"
            id="correo"
            name="correo"
            required
          />
          <SelectInputControlledWithLabel
            labelText={'País'}
            control={control}
            options={[
              'Mexico',
              'Guatemala',
              'Argentina',
              'Uruguay',
              'El Salvador'
            ]}
            name="pais"
            rules={{ required: true }}
          />
          <InputWLabel
            register={register}
            type="text"
            id="usuario"
            name="usuario"
            registerProps={{
              minLength: {
                value: 6,
                message: 'El usuario debe tener al menos 6 caracteres!'
              },
              maxLength: {
                value: 20,
                message: 'El usuario no puede tener más de 20 caracteres!'
              }
            }}
            required
          />
          <SelectInputControlledWithLabel
            labelText={'Rol'}
            control={control}
            options={roles}
            show="nombre"
            name="rol"
            loading={rolesLoading}
          />
          <SelectInputControlledWithLabel
            labelText={'Dependencia'}
            control={control}
            options={dependencias}
            show={'nombre'}
            name="dependencia"
            loading={dependenciasLoading}
          />
          <SelectInputControlledWithLabel
            labelText={'Puesto'}
            control={control}
            options={puestos}
            show="nombre"
            name="puesto"
            loading={puestosLoading}
          />
          <InputWLabel
            register={register}
            type="text"
            id="ref_oficio"
            labelText="Referencia de oficio"
            name="ref_oficio"
          />
          <InputWLabel
            register={register}
            type="date"
            id="fecha_desactivacion"
            labelText="Fecha de desactivación"
            registerProps={{
              validate: date => {
                if (new Date(date) < new Date()) {
                  return 'La fecha de desactivación no puede ser menor a la fecha actual.'
                }
              }
            }}
            required
          />

          <div className="col-start-1 col-end-3">
            <ButtonsContainer closeModal={closeModal} disabled={loading}>
              <SubmitButton loading={loading} />
            </ButtonsContainer>
          </div>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

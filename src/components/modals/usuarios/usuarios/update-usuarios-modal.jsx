import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { useSelector } from 'react-redux'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { ButtonsContainer } from '../../buttons-container'
import { toast } from 'react-toastify'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'
import { SubmitButton } from '@/components/common/submit-button'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useModalLogic } from '@/hooks/useModalLogic'

export function UpdateUsuariosModal({ closeModal }) {
  const showing = useSelector(s => s.usuarios.usuarios.showing)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()
  const { updateUsuario } = useUsuariosActions()
  useModalLogic({ closeModal, noScroll: true })

  const { nombres, apellidos, telefono, celular, CUI, registro_personal, correo, usuario, otros } = showing
  const { rol } = otros

  const handleUpdate = handleLoading(async data => {
    console.log({ data })

    const res = await updateUsuario(data)
    if (res?.error) {
      const message = res.error?.message ?? 'Ocurrió un error inesperado, si persiste porfavor contacta a soporte.'
      setError('root.fetchError', { type: 'to-not-invalidate', message })
      return
    }

    toast.success('El usuario se creó correctamente.')
    closeModal()
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        closeModal={closeModal}
        className="!max-w-4xl !max-h-[95vh]"
        title="Agregar usuario"
        errors={errors}
        loading={loading}
      >
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="p-6 grid grid-cols-2 gap-2 gap-x-12 font-semibold text-lg "
        >
          <InputWLabel register={register} type="text" id="usuario" name="usuario" disabled defaultValue={usuario} />
          <SelectInputControlledWithLabel labelText="Rol" control={control} name="rol" disabled defaultValue={rol} />
          <InputWLabel register={register} type="text" id="nombres" name="nombres" defaultValue={nombres} required />
          <InputWLabel
            register={register}
            type="text"
            id="apellidos"
            name="apellidos"
            defaultValue={apellidos}
            required
          />
          <InputWLabel register={register} type="text" id="telefono" name="telefono" defaultValue={telefono} required />
          <InputWLabel register={register} type="text" id="celular" name="celular" defaultValue={celular} required />
          <InputWLabel register={register} type="text" id="CUI" name="CUI" defaultValue={CUI} disabled />
          <InputWLabel
            register={register}
            type="text"
            id="registro_personal"
            disabled
            name="registro_personal"
            defaultValue={registro_personal}
            labelText="Registro de personal"
          />
          <InputWLabel register={register} type="text" id="correo" name="correo" defaultValue={correo} required />
          <SelectInputControlledWithLabel
            labelText={'País'}
            control={control}
            name="pais"
            defaultValue={'Argentina'}
            rules={{ required: true }}
          />

          <div className="col-start-1 col-end-3 mt-6">
            <ButtonsContainer closeModal={closeModal}>
              <SubmitButton text="Actualizar" loading={loading} />
            </ButtonsContainer>
          </div>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

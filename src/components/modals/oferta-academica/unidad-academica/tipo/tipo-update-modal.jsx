import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../../default-modal-layout'
import { ModalBackground } from '../../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { ButtonsContainer } from '../../../buttons-container'
import { useFormCustom } from '@/hooks/useFormCustom'
import { handleErrorInFormResponse } from '@/utils/consts'
import { SubmitButton } from '@/components/common/submit-button'

export function TipoUpdateModal({ closeModal, nombre, descripcion, id_tipo_ua }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { updateUnidadAcademicaTipos } = useOfertaAcademicaActions()

  const handleUpdate = handleLoading(async ({ descripcion }) => {
    const res = await updateUnidadAcademicaTipos({ descripcion, id_tipo_ua })
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title="Actualizar Tipo" closeModal={closeModal} loading={loading} errors={errors}>
        <form className="p-6 flex flex-col gap-3" onSubmit={handleSubmit(handleUpdate)}>
          <InputWLabel
            defaultValue={nombre}
            name="nombre"
            id="nombre"
            register={register}
            type="text"
            disabled
            required
          />
          <InputWLabel
            defaultValue={descripcion}
            labelText={'Descripción'}
            name="descripcion"
            id="descripcion"
            register={register}
            type="text"
            inputClassName="mb-12"
            isTextArea
            rows={3}
            maxlength={50}
            registerProps={{
              maxLength: {
                value: 50,
                message: 'Debe tener menos de 50 caracteres'
              }
            }}
          />

          <ButtonsContainer closeModal={closeModal} disabled={loading}>
            <SubmitButton text="Actualizar" loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

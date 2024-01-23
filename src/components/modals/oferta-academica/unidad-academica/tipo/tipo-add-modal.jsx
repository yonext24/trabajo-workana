import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../../default-modal-layout'
import { ModalBackground } from '../../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { ButtonsContainer } from '../../../buttons-container'
import { useFormCustom } from '@/hooks/useFormCustom'
import { handleErrorInFormResponse } from '@/utils/consts'
import { SubmitButton } from '@/components/common/submit-button'

export function TipoAddModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()
  const { handleLoading, loading } = useFormCustom()
  const { addUnidadAcademicaTipos } = useOfertaAcademicaActions()

  const handleUpdate = handleLoading(async data => {
    const res = await addUnidadAcademicaTipos(data)
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title="Agregar Tipo" closeModal={closeModal} errors={errors} loading={loading}>
        <form className="p-6 flex flex-col gap-3" onSubmit={handleSubmit(handleUpdate)}>
          <InputWLabel
            name="nombre"
            id="nombre"
            register={register}
            registerProps={{
              minLength: {
                value: 2,
                message: 'Debe tener al menos 3 caracteres'
              }
            }}
            type="text"
            required
          />
          <InputWLabel
            name="descripcion"
            id="descripcion"
            register={register}
            type="text"
            inputClassName="mb-12"
            isTextArea
            rows={3}
          />

          <ButtonsContainer closeModal={closeModal} disabled={loading}>
            <SubmitButton loading={loading} text="Crear" />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

import { InputWLabel } from '@/components/common/input-w-label'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function AddTipoRecursoModal({ closeModal }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const tipoRecursoData = useSelector(s => s.ofertaAcademica.carrera.tipo_recurso.data)
  const { addCarreraTipoRecurso } = useOfertaAcademicaActions()

  const handleUpload = handleLoading(async data => {
    const res = await addCarreraTipoRecurso(data)
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Tipo de Recurso" closeModal={closeModal} loading={loading} errors={errors}>
        <form className="p-6 gap-4 flex flex-col" onSubmit={handleSubmit(handleUpload)}>
          <InputWLabel
            name="nombre"
            required
            registerProps={{
              validate: nombre => {
                if (tipoRecursoData.some(el => el.nombre === nombre)) {
                  toast.error('Ya hay un nivel con ese nombre.')
                  return
                }
              }
            }}
            register={register}
          />
          <InputWLabel name="descripcion" required register={register} isTextArea />

          <ButtonsContainer className={'mt-6'} disabled={loading}>
            <SubmitButton text="Enviar" laoding={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

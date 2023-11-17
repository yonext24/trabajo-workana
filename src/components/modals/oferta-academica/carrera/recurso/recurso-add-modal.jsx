import { InputWLabel } from '@/components/common/input-w-label'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'
import { SubmitButton } from '@/components/common/submit-button'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

export function RecursoAddModal({ closeModal }) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const recursoData = useSelector(s => s.ofertaAcademica.carrera.recurso.data)
  const {
    data: tipoRecursoData,
    revalidating: tipoRecursoLoading,
    error: tipoRecursoError
  } = useSelector(s => s.ofertaAcademica.carrera.tipo_recurso)

  const { addCarreraRecurso } = useOfertaAcademicaActions()

  const handleUpload = handleLoading(async ({ tipo, ...data }) => {
    const id_tipo_recurso = tipo.id_tipo_recurso

    const res = addCarreraRecurso({ ...data, id_tipo_recurso })
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Recurso" closeModal={closeModal} errors={errors} loading={loading}>
        <form className="p-6 flex flex-col gap-3 overflow-hidden" onSubmit={handleSubmit(handleUpload)}>
          <SelectInputControlledWithLabel
            labelText={'Tipo'}
            control={control}
            loading={tipoRecursoLoading}
            error={tipoRecursoError}
            name="tipo"
            rules={{ required: true }}
            show={'nombre'}
            options={tipoRecursoData}
          />

          <InputWLabel
            name="nombre"
            required
            register={register}
            registerProps={{
              validate: nombre => {
                if (recursoData.some(el => el.nombre === nombre)) {
                  return 'Ya hay un recurso con ese nombre.'
                }
              }
            }}
          />
          <InputWLabel name="descripcion" required register={register} isTextArea />

          <ButtonsContainer className={'mt-6'}>
            <SubmitButton text="Agregar" loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

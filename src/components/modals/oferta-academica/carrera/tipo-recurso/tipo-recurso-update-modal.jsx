import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useForm } from 'react-hook-form'

export function UpdateTipoRecursoModal ({ closeModal, nombre, descripcion }) {
  const { handleSubmit, register } = useForm()
  const { updateCarreraTipoRecurso } = useOfertaAcademicaActions()

  const handleUpload = newData => {
    updateCarreraTipoRecurso({ newData: { ...newData, nombre }, nombre })
      .then(closeModal)
  }

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>
    <DefaultModalLayout title='Modificar Nivel' closeModal={closeModal}>
      <form className='p-6 flex flex-col' onSubmit={handleSubmit(handleUpload)}>
        <InputWLabel name='nombre' disabled defaultValue={nombre} />
        <InputWLabel name='descripcion' required register={register} isTextArea defaultValue={descripcion} />

        <ButtonsContainer className={'mt-6'}>
          <button type='submit'>Actualizar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>
  </ModalBackground>
}

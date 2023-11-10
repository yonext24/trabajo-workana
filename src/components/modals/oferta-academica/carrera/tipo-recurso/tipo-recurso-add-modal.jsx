import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function AddTipoRecursoModal({ closeModal }) {
  const { handleSubmit, register } = useForm()
  const { data: tipoRecursoData } = useSelector(s => s.ofertaAcademica.carrera.tipo_recurso)
  const { addCarreraTipoRecurso } = useOfertaAcademicaActions()

  const handleUpload = data => {
    if (tipoRecursoData.some(el => el.nombre === data.nombre)) {
      toast.error('Ya hay un nivel con ese nombre.')
      return
    }
    addCarreraTipoRecurso(data).then(closeModal)
  }

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Tipo de Recurso" closeModal={closeModal}>
        <form className="p-6 flex flex-col" onSubmit={handleSubmit(handleUpload)}>
          <InputWLabel name="nombre" required register={register} />
          <InputWLabel name="descripcion" required register={register} isTextArea />

          <ButtonsContainer className={'mt-6'}>
            <button type="submit">Agregar</button>
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

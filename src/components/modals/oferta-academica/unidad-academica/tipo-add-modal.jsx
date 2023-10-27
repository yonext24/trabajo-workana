import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ButtonsContainer } from '../../buttons-container'

export function TipoAddModal({ closeModal }) {
  const { data: tiposData } = useSelector(s => s.ofertaAcademica)
    .unidadAcademica.tipo
  const { register, handleSubmit } = useForm()
  const { addUnidadAcademicaTipos } = useOfertaAcademicaActions()

  const handleUpdate = data => {
    if (tiposData.some(el => el.nombre === data.nombre)) {
      toast.error('Ya hay un tipo de esas características.')
      return
    }
    addUnidadAcademicaTipos(data)
  }

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title="Agregar Tipo">
        <form
          className="p-6 flex flex-col gap-3"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <InputWLabel
            name="nombre"
            id="nombre"
            register={register}
            type="text"
            required
          />
          <InputWLabel
            name="descripcion"
            id="descripcion"
            register={register}
            type="text"
            required
            inputClassName="mb-12"
            isTextArea
            rows={3}
          />

          <ButtonsContainer closeModal={closeModal}>
            <button type="submit">Enviar</button>
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

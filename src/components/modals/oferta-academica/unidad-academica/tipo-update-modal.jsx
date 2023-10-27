import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ButtonsContainer } from '../../buttons-container'

export function TipoUpdateModal({ closeModal, nombre, descripcion }) {
  const { data: tiposData } = useSelector(s => s.ofertaAcademica)
    .unidadAcademica.tipo
  const { register, handleSubmit } = useForm()
  const { updateUnidadAcademicaTipos } = useOfertaAcademicaActions()

  const handleUpdate = data => {
    if (
      tiposData.some(el => el.nombre === data.nombre && data.nombre !== nombre)
    ) {
      toast.error('Ya hay un tipo de esas características.')
      return
    }
    updateUnidadAcademicaTipos({ nombre, newData: data })
  }

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title="Agregar Tipo">
        <form
          className="p-6 flex flex-col gap-3"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <InputWLabel
            defaultValue={nombre}
            name="nombre"
            id="nombre"
            register={register}
            type="text"
            required
          />
          <InputWLabel
            defaultValue={descripcion}
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

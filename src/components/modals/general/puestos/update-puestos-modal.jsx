import { useSelector } from 'react-redux'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useForm } from 'react-hook-form'
import { InputWLabel } from '../../../common/input-w-label'
import { toast } from 'react-toastify'

export function UpdatePuestosModal({ closeModal, entry }) {
  const { updPuestosData } = useDataActions()
  const puestosData = useSelector(s => s.data.puestos.data)

  const { register, handleSubmit } = useForm()

  const handleUpdate = data => {
    if (data.name === entry) {
      return
    }
    if (puestosData.some(el => el === data.name)) {
      toast.error('Ya hay un elemento de esas características.')
      return
    }
    updPuestosData({ nombre: entry, newData: data.name })
    closeModal()
  }

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title="Actualizar Puesto" closeModal={closeModal}>
        <form onSubmit={handleSubmit(handleUpdate)} className="py-8 px-4 font-semibold">
          <InputWLabel
            id="name"
            name="name"
            labelText="Nombre"
            type="text"
            autoFocus
            register={register}
            required
            defaultValue={entry}
            inputClassName="mb-12"
          />

          <ButtonsContainer closeModal={closeModal}>
            <button type="submit">Actualizar</button>
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

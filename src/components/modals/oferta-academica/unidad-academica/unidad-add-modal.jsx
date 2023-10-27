import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { SelectInputControlled } from '@/components/common/select-input-controlled'
import { ButtonsContainer } from '../../buttons-container'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function UnidadAddModal({ closeModal }) {
  const { data } = useSelector(s => s.ofertaAcademica).unidadAcademica.unidad
  const { register, handleSubmit, control } = useForm()
  const { addUnidadAcademicaUnidad } = useOfertaAcademicaActions()

  const handleUpdate = newData => {
    if (data.some(el => el.nombre === newData.nombre)) {
      toast.error('Ya existe una unidad con ese nombre.')
      return
    }
    addUnidadAcademicaUnidad(newData).then(closeModal)
  }

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Unidad">
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="px-8 py-4 pb-12 flex flex-col gap-y-3"
        >
          <div className="flex flex-col">
            <label className="font-semibold text-lg">Tipo UA</label>
            <SelectInputControlled
              control={control}
              name="tipo"
              rules={{ required: true }}
              options={['Escuela', 'Test']}
            />
          </div>
          <InputWLabel
            name="codigo"
            id="codigo"
            labelText="Código"
            required
            register={register}
          />
          <InputWLabel
            name="nombre"
            id="nombre"
            labelText="Nombre"
            required
            register={register}
          />
          <InputWLabel
            inputClassName="mb-12"
            name="abreviatura"
            id="abreviatura"
            required
            register={register}
          />

          <ButtonsContainer closeModal={closeModal}>
            <button type="submit">Agregar</button>
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

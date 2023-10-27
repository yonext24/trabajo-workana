import { InputWLabel } from '@/components/common/input-w-label'
import { SelectInputControlled } from '@/components/common/select-input-controlled'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

export function CarreraAddModal({ closeModal }) {
  const { handleSubmit, control, register } = useForm()
  const { data } = useSelector(s => s.ofertaAcademica.carrera.nivel)

  const handleUpdate = data => {}

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Carrera">
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="p-6 flex flex-col gap-4"
        >
          <div className="flex w-full [&>*]:flex-1 gap-4 items-end">
            <div className="flex flex-col">
              <label className="font-semibold text-lg">Nivel carrera</label>
              <SelectInputControlled
                control={control}
                name="nivel"
                rules={{ required: true }}
                options={Array.from(new Set(data.map(el => el.nombre)))}
              />
            </div>
            <div className="flex">
              <label className="font-semibold text-lg">
                Prerrequisito técnico
              </label>
            </div>
          </div>
          <InputWLabel name="nombre" register={register} required />
          <InputWLabel
            name="titulo_femenino"
            labelText="Título femenino"
            register={register}
            required
          />
          <InputWLabel
            name="titulo_masculino"
            labelText="Título masculino"
            register={register}
            required
          />
          <InputWLabel
            name="fecha_de_creacion"
            labelText="Fecha de creación"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            register={register}
            required
          />
          <ButtonsContainer className="[&>button]:py-[7px] mt-4">
            <button type="submit">Guardar</button>
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

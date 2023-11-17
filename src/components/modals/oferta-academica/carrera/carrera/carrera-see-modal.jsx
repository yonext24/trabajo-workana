import { InputWLabel } from '@/components/common/input-w-label'
import { SelectInput } from '@/components/common/select-input'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'

export function CarreraSeeModal({ closeModal, nivel, nombre, titulo_femenino, titulo_masculino }) {
  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Ver Carrera" className="!max-w-2xl" closeModal={closeModal}>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex w-full [&>*]:flex-1 gap-4 items-end">
            <div className="flex flex-col">
              <label className="font-semibold text-lg">Nivel carrera</label>
              <SelectInput options={[]} disabled defaultValue={nivel} name="nivel" />
            </div>
            <div className="flex">
              <label className="font-semibold text-lg">Prerrequisito técnico</label>
            </div>
          </div>
          <InputWLabel name="carrera" labelText={'Nombre'} disabled defaultValue={nombre} required />
          <InputWLabel
            name="titulo_femenino"
            disabled
            defaultValue={titulo_femenino}
            labelText="Título femenino"
            required
          />
          <InputWLabel
            name="titulo_masculino"
            disabled
            defaultValue={titulo_masculino}
            labelText="Título masculino"
            required
          />

          <div className="flex">
            <div className="flex-[.9] flex items-center">
              <h5 className="text-2xl font-semibold">Recursos de carrera</h5>
            </div>
            <div className="flex-1 flex gap-3 [&>*]:flex-1">
              <InputWLabel
                disabled
                name="fecha_de_creacion"
                labelText="Fecha de creación"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <ButtonsContainer className="[&>button]:py-[7px] mt-4"></ButtonsContainer>
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

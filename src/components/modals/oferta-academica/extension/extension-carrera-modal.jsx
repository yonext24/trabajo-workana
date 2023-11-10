import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useForm } from 'react-hook-form'
import { SelectInputControlled } from '@/components/common/select-input-controlled'
import { ButtonsContainer } from '../../buttons-container'

export function ExtensionCarreraModal({ closeModal }) {
  const { register, control } = useForm()

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title={'Carreras de extensión'} className={'!max-w-3xl'} closeModal={closeModal}>
        <form className="p-6 w-full flex gap-4 flex-col [&_label]:text-lg [&_label]:font-semibold">
          <div className="flex [&>*]:flex-1 gap-4">
            <InputWLabel name="unidad" disabled />
            <InputWLabel name="extension" disabled />
          </div>
          <h5 className="text-2xl my-2">Agregar carrera a extensión</h5>
          <div className="flex [&>*]:flex-1 gap-3">
            <div className="flex flex-col">
              <label>Nivel carrera</label>
              <SelectInputControlled
                id="nivel"
                name="nivel"
                options={['Técnico', 'Inicial']}
                firstOne
                control={control}
              />
            </div>
            <div className="flex flex-col">
              <label>Carrera</label>
              <SelectInputControlled
                id="carrera"
                name="carrera"
                options={['Enfermería profesional', 'Profesor de Geografía']}
                firstOne
                control={control}
              />
            </div>
          </div>
          <div className="flex [&>*]:flex-1 gap-3">
            <InputWLabel
              type="date"
              labelText="Fecha de creación"
              name="fecha_de_creacion"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
            <InputWLabel id="codigo" name="codigo" register={register} />
          </div>

          <ButtonsContainer className="[&>button]:py-2 mt-2">
            <button type="submit">Agregar</button>
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

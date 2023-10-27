import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { SelectInputControlled } from '@/components/common/select-input-controlled'
import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '../../buttons-container'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function ExtensionAddModal({ closeModal }) {
  const { register, control, handleSubmit } = useForm()
  const { data: extensionData } = useSelector(s => s.ofertaAcademica.extension)
  const { addOfertaAcademicaExtension } = useOfertaAcademicaActions()

  const handleUpdate = data => {
    if (extensionData.some(el => el.nombre === data.nombre)) {
      toast.error('Ya hay una extensión con ese nombre.')
      return
    }
    addOfertaAcademicaExtension({ ...data, estado: 'Activo' }).then(closeModal)
  }

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout
        title={'Agregar extensión'}
        className={'!max-h-[calc(100vh_-_5px)]'}
      >
        <form
          className="p-6 gap-4 flex flex-col [&_label]:text-lg [&_label]:font-semibold overflow-y-auto"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <label>Tipo Unidad</label>
              <SelectInputControlled
                tabindex="0"
                control={control}
                name={'tipo'}
                options={['1', '2', '3', '4']}
                rules={{ required: true }}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Unidad</label>
              <SelectInputControlled
                control={control}
                name="unidad"
                options={['1', '2', '3', '4']}
                rules={{ required: true }}
              />
            </div>
          </div>
          <InputWLabel
            id={'codigo'}
            name="codigo"
            register={register}
            labelText={'Código'}
            required
          />
          <InputWLabel
            id={'nombre'}
            name="nombre"
            register={register}
            required
          />
          <InputWLabel
            id={'abreviatura'}
            name="abreviatura"
            register={register}
            required
          />

          <div className="flex flex-col w-full">
            <label>Ubicación</label>
            <SelectInputControlled
              control={control}
              name="unidad"
              options={['México', 'Guatemala', 'El Salvador', 'Estados Unidos']}
              rules={{ required: true }}
            />
          </div>
          <InputWLabel
            type="date"
            register={register}
            id="fecha_de_creacion"
            name="fecha_de_creacion"
            required
            labelText={'Fecha de creación'}
            defaultValue={new Date().toISOString().split('T')[0]}
          />

          <ButtonsContainer closeModal={closeModal}>
            <button type="submit">Agregar</button>
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

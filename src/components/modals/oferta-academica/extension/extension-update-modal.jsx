import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { SelectInputControlled } from '@/components/common/select-input-controlled'
import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '../../buttons-container'
// import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function ExtensionUpdateModal({
  closeModal,
  codigo,
  nombre,
  abreviatura,
  fecha_de_creacion,
  estado
}) {
  const { register, control, handleSubmit } = useForm()
  const { data: extensionData } = useSelector(s => s.ofertaAcademica.extension)
  // const { addOfertaAcademicaExtension } = useOfertaAcademicaActions()

  const handleUpdate = data => {
    if (extensionData.some(el => el.nombre === data.nombre)) {
      toast.error('Ya hay una extensión con ese nombre.')
    }
    // addOfertaAcademicaExtension(data)
    // .then(closeModal)
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
          <InputWLabel
            defaultValue={codigo}
            id={'codigo'}
            name="codigo"
            register={register}
            labelText={'Código'}
            required
          />
          <InputWLabel
            defaultValue={nombre}
            id={'nombre'}
            disabled
            name="nombre"
            register={register}
            required
          />
          <InputWLabel
            defaultValue={abreviatura}
            id={'abreviatura'}
            name="abreviatura"
            register={register}
            required
          />

          <div className="flex flex-col w-full">
            <label>Ubicación</label>
            <SelectInputControlled
              disabled
              control={control}
              name="unidad"
              options={['México', 'Guatemala', 'El Salvador', 'Estados Unidos']}
              rules={{ required: true }}
            />
          </div>
          <InputWLabel
            type="date"
            register={register}
            id="date"
            name="date"
            required
            labelText={'Fecha de creación'}
            defaultValue={fecha_de_creacion}
          />
          <div className="flex flex-col w-full">
            <label>Estado</label>
            <SelectInputControlled
              defaultValue={estado}
              disabled
              control={control}
              name="unidad"
              options={['Activo', 'Desactivado']}
              rules={{ required: true }}
            />
          </div>

          <ButtonsContainer closeModal={closeModal}>
            <button type="submit">Agregar</button>
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

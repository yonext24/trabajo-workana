import { useForm } from 'react-hook-form'
import { ModalBackground } from '../../../modal-background'
import { DefaultModalLayout } from '../../../default-modal-layout'
import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '../../../buttons-container'
import { SubmitButton } from '@/components/common/submit-button'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { extension as extensionRouter } from '@/utils/routes'
import { toast } from 'react-toastify'

export function ExtensionUpdateCarreraModal({
  closeModal,
  id_carrera,
  id_extension,
  unidad,
  extension,
  nivel,
  nombre,
  codigo,
  fecha_creacion,
  estado,
  setCarrera
}) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    setError
  } = useForm()

  const handleUpdate = async ({ rawEstado: { estado }, ...rest }) => {
    const data = { ...rest, estado, id_extension, id_carrera }
    await extensionRouter
      .update_carrera(data)
      .then(() => {
        setCarrera(prev => {
          const data = prev.data
          return { ...prev, data: data.map(el => (el.id_carrera === id_carrera ? { ...el, ...rest, estado } : el)) }
        })
        toast.success('Carrera actualizada con éxito')
        closeModal()
      })
      .catch(err => {
        const message = err?.message ?? 'Ocurrió un error inesperado, si persiste porfavor contacta a soporte.'
        setError('root.fetchError', { type: 'to-not-invalidate', message })
      })
  }

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout
        className="!max-w-3xl max-h-[98vh]"
        title="Actualizar carrera de extensión"
        closeModal={closeModal}
        errors={errors}
        loading={isSubmitting}
      >
        <form onSubmit={handleSubmit(handleUpdate)} className="p-6 py-4 gap-4 flex flex-col overflow-y-auto">
          <HorizontalDiv>
            <InputWLabel id="unidad" name="unidad" disabled defaultValue={unidad} />
            <InputWLabel name="Extensión" disabled defaultValue={extension} />
          </HorizontalDiv>
          <HorizontalDiv>
            <InputWLabel name="Nivel" disabled defaultValue={nivel} />
            <InputWLabel labelText="Carrera" name="nombre" disabled defaultValue={nombre} />
          </HorizontalDiv>
          <HorizontalDiv>
            <InputWLabel
              id="codigo"
              name="codigo"
              labelText="Código"
              type="number"
              required
              register={register}
              defaultValue={codigo}
            />
            <SelectInputControlledWithLabel
              control={control}
              id="rawEstado"
              name="rawEstado"
              labelText={'Estado'}
              options={[
                { text: 'Activo', estado: true },
                { text: 'Inactivo', estado: false }
              ]}
              defaultValue={estado ? { text: 'Activo', estado: estado } : { text: 'Inactivo', estado: estado }}
              show="text"
            />
          </HorizontalDiv>
          <InputWLabel
            id="fecha_creacion"
            name="fecha_creacion"
            labelText="Fecha de Activación"
            type="date"
            register={register}
            defaultValue={fecha_creacion}
          />

          <ButtonsContainer className={'mt-2 mb-2'} closeModal={closeModal} disabled={isSubmitting}>
            <SubmitButton text="Actualizar" loading={isSubmitting} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

function HorizontalDiv({ children }) {
  return <div className="flex gap-2 w-full [&>*]:flex-1">{children}</div>
}

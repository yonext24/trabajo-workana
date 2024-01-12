import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../../../default-modal-layout'
import { ModalBackground } from '../../../modal-background'
import { useForm } from 'react-hook-form'
import { ButtonsContainer } from '../../../buttons-container'
import { SubmitButton } from '@/components/common/submit-button'
import { useModalLogic } from '@/hooks/useModalLogic'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { unidad as unidadRoute } from '@/utils/routes'
import { toast } from 'react-toastify'
import { number_input_pattern_validation } from '@/utils/validations/numbers'

export function UnidadUpdateCarreraModal({
  closeModal,
  id_carrera,
  unidad,
  carrera,
  nivel,
  codigo,
  estado: pEstado,
  setCarrera,
  id_unidad
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
    setFocus,
    setError
  } = useForm()
  useModalLogic({ closeModal, noScroll: true })

  const handleUpdate = async ({ rawEstado: { estado }, ...rest }) => {
    const data = { estado, ...rest }
    if (estado === pEstado && rest.codigo === String(codigo)) {
      setFocus('codigo')
      return
    }
    unidadRoute.unidad
      .update_carrera({ ...data, id_unidad, id_carrera })
      .then(() => {
        setCarrera(prev => {
          const newData =
            prev?.data?.map?.(el => {
              if (el.id_carrera === id_carrera) {
                return { ...el, ...data }
              }
              return el
            }) ?? []

          return { ...prev, data: newData }
        })
        toast.success('La carrera se modificó correctamente.')
        closeModal()
      })
      .catch(err => {
        setError('root.fetchError', {
          type: 'to-not-invalidate',
          message: err?.message ?? err ?? 'Ocurrió un error al modificar la carrera'
        })
        toast.error('Ocurrió un error al modificar la carrera.')
      })
  }

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        title={'Actualizar carrera de unidad académica'}
        className={'!max-w-3xl'}
        closeModal={closeModal}
        errors={errors}
        loading={isSubmitting}
      >
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="p-6 w-full flex gap-4 flex-col [&_label]:text-lg [&_label]:font-semibold"
        >
          <InputWLabel name="Unidad" defaultValue={unidad} disabled />
          <h5 className="text-2xl my-2">Agregar carrera a unidad</h5>
          <div className="flex [&>*]:flex-1 gap-3">
            <InputWLabel labelText={'Nivel carrera'} defaultValue={nivel} disabled />
            <InputWLabel labelText={'Carrera'} defaultValue={carrera} disabled />
          </div>
          <div className="flex [&>*]:flex-1 gap-3">
            <InputWLabel
              id="codigo"
              name="codigo"
              type="number"
              pattern={number_input_pattern_validation.pattern}
              defaultValue={codigo}
              register={register}
              required
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
              defaultValue={pEstado ? { text: 'Activo', estado: pEstado } : { text: 'Inactivo', estado: pEstado }}
              show="text"
            />
          </div>

          <ButtonsContainer className="[&>button]:py-2 mt-2" disabled={isSubmitting}>
            <SubmitButton text="Guardar" loading={isSubmitting} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../../../default-modal-layout'
import { ModalBackground } from '../../../modal-background'
import { useForm } from 'react-hook-form'
import { ButtonsContainer } from '../../../buttons-container'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { extension } from '@/utils/routes'
import { SubmitButton } from '@/components/common/submit-button'
import { toast } from 'react-toastify'
import { useModalLogic } from '@/hooks/useModalLogic'
import { carrera } from '@/utils/routes/oferta/carrera'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

export function ExtensionAddCarreraModal({ closeModal, id_extension, unidad, nombre }) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    setError,
    watch
  } = useForm()
  useModalLogic({ closeModal, noScroll: true })

  const selectedNivel = watch('nivel')
  const selectedCarrera = watch('carrera')
  const selectedUnidadGlobal = useSelector(s => s.ofertaAcademica.extension.extension.selectedUnidad)

  const {
    loading: carrerasLoading,
    error: carrerasError,
    data: carrerasData
  } = useFetchLocalData({
    func: async ([currentSelectedNivel, selectedUnidadGlobal]) => {
      if (
        !currentSelectedNivel ||
        ['Seleccionar', 'Cargando...', 'Error'].includes(currentSelectedNivel) ||
        !selectedUnidadGlobal?.id_unidad
      )
        return []

      return await extension.add_carrera_params({
        nivel: currentSelectedNivel.id_nivel,
        id_unidad: selectedUnidadGlobal.id_unidad
      })
    },
    dependencies: [selectedNivel, selectedUnidadGlobal]
  })

  const {
    loading: nivelesLoading,
    error: nivelesError,
    data: nivelesData
  } = useFetchLocalData({
    func: carrera.carrera.param_crear
  })

  const handleUpdate = async ({ carrera, ...rest }) => {
    const id_unidad_carrera = carrera?.id_unidad_carrera
    const data = { id_extension, id_unidad_carrera, ...rest }
    await extension
      .add_carrera(data)
      .then(() => {
        toast.success('Carrera agregada con éxito')
        closeModal()
      })
      .catch(err => {
        const message = err?.message ?? 'Ocurrió un error inesperado, si persiste porfavor contacta a soporte.'
        setError('root.fetchError', { type: 'to-not-invalidate', message })
      })
  }

  console.log({ selectedCarrera })
  const codigo = useMemo(() => {
    if (!selectedCarrera) return ''
    return selectedCarrera.codigo
  }, [selectedCarrera])

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        title={'Agregar carrera a extensión'}
        className={'!max-w-3xl'}
        closeModal={closeModal}
        errors={errors}
        loading={isSubmitting}
      >
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="p-6 w-full flex gap-4 flex-col [&_label]:text-lg [&_label]:font-semibold"
        >
          <div className="flex [&>*]:flex-1 gap-4">
            <InputWLabel name="unidad" defaultValue={unidad} disabled />
            <InputWLabel name="extension" defaultValue={nombre} disabled />
          </div>
          <h5 className="text-2xl my-2">Agregar carrera a extensión</h5>
          <div className="flex [&>*]:flex-1 gap-3">
            <SelectInputControlledWithLabel
              labelText={'Nivel carrera'}
              options={nivelesData}
              loading={nivelesLoading}
              error={nivelesError}
              show="nombre"
              name="nivel"
              id="nivel"
              firstOne
              control={control}
            />
            <SelectInputControlledWithLabel
              labelText={'Carrera'}
              resetOnOptionsChange
              id="carrera"
              name="carrera"
              options={carrerasData}
              loading={carrerasLoading || nivelesLoading}
              error={carrerasError || nivelesError}
              show={'nombre'}
              firstOne
              control={control}
              disabled={!selectedNivel || carrerasData.length === 0}
              disabledMessage={
                selectedNivel && selectedNivel !== 'Seleccionar'
                  ? `No hay carreras en el nivel ${selectedNivel.nombre}`
                  : 'Selecciona un nivel antes'
              }
            />
          </div>
          <div className="flex [&>*]:flex-1 gap-3">
            <InputWLabel
              type="date"
              labelText="Fecha de creación"
              name="fecha_creacion"
              register={register}
              defaultValue={new Date().toISOString().split('T')[0]}
              required
            />
            <InputWLabel id="codigo" name="codigo" register={register} value={codigo} disabled />
          </div>

          <ButtonsContainer className="[&>button]:py-2 mt-2" disabled={isSubmitting} closeModal={closeModal}>
            <SubmitButton text="Guardar" loading={isSubmitting} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useForm } from 'react-hook-form'
import { ButtonsContainer } from '../../buttons-container'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { extension } from '@/utils/routes'
import { SubmitButton } from '@/components/common/submit-button'
import { toast } from 'react-toastify'
import { useModalLogic } from '@/hooks/useModalLogic'

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

  const {
    loading: carrerasLoading,
    error: carrerasError,
    data: carrerasData
  } = useFetchLocalData({
    func: async ([currentSelectedNivel]) => {
      if (!currentSelectedNivel || ['Seleccionar', 'Cargando...', 'Error'].includes(currentSelectedNivel)) return []
      console.log({ currentSelectedNivel })
      return await extension.add_carrera_params({ nivel: currentSelectedNivel.id_nivel })
    },
    dependencies: [selectedNivel]
  })

  const {
    data: nivelesData,
    revalidating: nivelesLoading,
    error: nivelesError
  } = useSelector(s => s.ofertaAcademica.carrera.nivel)
  const { getCarreraNivelData } = useOfertaAcademicaActions()

  useEffect(() => {
    getCarreraNivelData()
  }, [])

  const handleUpdate = async ({ carrera, ...rest }) => {
    const data = { id_extension, id_carrera: carrera?.id_carrera, ...rest }
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
            <InputWLabel id="codigo" name="codigo" register={register} required />
          </div>

          <ButtonsContainer className="[&>button]:py-2 mt-2" disabled={isSubmitting}>
            <SubmitButton text="Guardar" loading={isSubmitting} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

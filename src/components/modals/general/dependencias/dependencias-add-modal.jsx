import { useForm } from 'react-hook-form'
import { InputWLabel } from '../../../common/input-w-label'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useDataActions } from '../../../../hooks/useDataActions'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'
import { useSelector } from 'react-redux'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useEffect } from 'react'
import { handleErrorInFormResponse } from '@/utils/consts'

export function DependenciasAddModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm()
  const { addDependenciasData } = useDataActions()
  const { loading, handleLoading } = useFormCustom()

  const { data: sectoresData, revalidating: sectoresLoading, error: sectoresError } = useSelector(s => s.data.sectores)
  const {
    data: unidadesData,
    loading: unidadesLoading,
    error: unidadesError
  } = useSelector(s => s.ofertaAcademica.unidadAcademica.unidad)

  const { getUnidadAcademicaUnidad } = useOfertaAcademicaActions()

  useEffect(() => {
    getUnidadAcademicaUnidad()
  }, [])

  const dependenciasData = useSelector(s => s.data.dependencias.data)

  const onSubmit = handleLoading(async data => {
    const { sector, unidad } = data
    const id_sector = sector.id_sector
    const id_unidad = unidad.id_unidad

    const finalData = {
      ...data,
      sector: sector.nombre,
      unidad: unidad.nombre,
      id_unidad,
      id_sector
    }

    const res = await addDependenciasData(finalData)
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Dependencia" closeModal={closeModal} loading={loading} errors={errors}>
        <form onSubmit={handleSubmit(onSubmit)} className="py-8 px-4 font-semibold flex flex-col gap-y-4">
          <InputWLabel
            id="nombre"
            labelText="Nombre"
            type="text"
            autoFocus
            register={register}
            required
            registerProps={{
              validate: nombre => {
                if (dependenciasData.some(d => d.nombre === nombre)) return 'Ya existe una dependencia con ese nombre'
              }
            }}
          />
          <InputWLabel
            id="abreviatura"
            name="abreviatura"
            labelText="Abreviatura"
            type="text"
            register={register}
            required
            registerProps={{
              maxLength: { value: 20, message: 'Máximo 20 caracteres' },
              validate: abreviatura => {
                if (dependenciasData.some(d => d.abreviatura === abreviatura))
                  return 'Ya existe una dependencia con esa abreviatura'
              }
            }}
          />

          <SelectInputControlledWithLabel
            name="sector"
            control={control}
            show="nombre"
            rules={{ required: true }}
            options={sectoresData}
            loading={sectoresLoading}
            error={sectoresError}
            labelText={'Sector'}
          />

          <SelectInputControlledWithLabel
            name="unidad"
            control={control}
            rules={{ required: true }}
            options={unidadesData}
            loading={unidadesLoading}
            error={unidadesError}
            show="nombre"
            labelText="Unidad"
          />

          <ButtonsContainer closeModal={closeModal} disabled={loading}>
            <SubmitButton loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

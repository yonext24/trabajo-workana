import { useForm } from 'react-hook-form'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { compareValues } from '../../../../utils/compareValues'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'

export function UpdateDependenciaModal({ closeModal, entryData }) {
  const { nombre, abreviatura, id_dependencia, id_sector, id_unidad } = entryData

  const { data: sectoresData, error: sectoresError, revalidating: sectoresLoading } = useSelector(s => s.data.sectores)
  const dependenciasData = useSelector(s => s.data.dependencias.data)
  const {
    data: unidadesData,
    error: unidadesError,
    loading: unidadesLoading
  } = useSelector(s => s.ofertaAcademica.unidadAcademica.unidad)

  useEffect(() => {
    getSectoresData()
    getUnidadAcademicaUnidad()
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields }
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { updDependenciasData, getSectoresData } = useDataActions()
  const { getUnidadAcademicaUnidad } = useOfertaAcademicaActions()

  const handleUpdate = handleLoading(async data => {
    if (Object.entries(touchedFields).length < 1) return

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
    if (compareValues(entryData, finalData)) return

    await updDependenciasData({ ...finalData, id_dependencia })
    closeModal()
  })

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title="Actualizar Dependencia" closeModal={closeModal} loading={loading} errors={errors}>
        <form onSubmit={handleSubmit(handleUpdate)} className="py-8 px-4 font-semibold flex flex-col gap-y-3">
          <InputWLabel
            readOnly
            required
            id="nombre"
            labelText="Nombre"
            type="text"
            autoFocus
            register={register}
            defaultValue={nombre}
          />
          <InputWLabel
            id="abreviatura"
            name="abreviatura"
            labelText="Abreviatura"
            type="text"
            register={register}
            required
            defaultValue={abreviatura}
            registerProps={{
              validate: abreviatura => {
                if (dependenciasData.some(d => d.abreviatura === abreviatura && d.id_dependencia !== id_dependencia))
                  return 'Ya existe una dependencia con esa abreviatura'
              }
            }}
          />

          <SelectInputControlledWithLabel
            name="sector"
            control={control}
            rules={{ required: true }}
            defaultValue={sectoresData.find(el => el.id_sector === id_sector)}
            options={sectoresData}
            loading={sectoresLoading}
            error={sectoresError}
            show="nombre"
            labelText={'Sector'}
          />
          <SelectInputControlledWithLabel
            name="unidad"
            control={control}
            rules={{ required: true }}
            defaultValue={unidadesData.find(el => el.id_unidad === id_unidad)}
            show={'nombre'}
            loading={unidadesLoading}
            error={unidadesError}
            options={unidadesData}
          />

          <div className="mt-5" />
          <ButtonsContainer closeModal={closeModal} disabled={loading}>
            <SubmitButton loading={loading} text="Actualizar" />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}

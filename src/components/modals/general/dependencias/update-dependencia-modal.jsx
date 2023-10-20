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

export function UpdateDependenciaModal ({ closeModal, entryData }) {
  const { nombre, abreviatura, id_dependencia, id_sector, id_unidad } = entryData

  const { data: sectoresData, error: sectoresError, loading: sectoresLoading } = useSelector(s => s.data.sectores)
  const { data: unidadesData, error: unidadesError, loading: unidadesLoading } = useSelector(s => s.ofertaAcademica.unidadAcademica.unidad)

  useEffect(() => {
    getSectoresData()
    getUnidadAcademicaUnidad()
  }, [])

  const { register, handleSubmit, control } = useForm()
  const { updDependenciasData, getSectoresData } = useDataActions()
  const { getUnidadAcademicaUnidad } = useOfertaAcademicaActions()

  const onSubmit = (newData) => {
    updDependenciasData({ ...newData, id_dependencia })
    closeModal()
  }

  const handleUpdate = (data) => {
    const id_sector = data.sector.id_sector
    const id_unidad = data.unidad.id_unidad
    const sector = data.sector.nombre
    const unidad = 'placeholder'

    const newEntryData = { ...entryData, ...data, id_sector, id_unidad, sector, unidad }
    if (compareValues(entryData, newEntryData)) return

    onSubmit(newEntryData)
  }

  return <ModalBackground onClick={closeModal} closeModal={closeModal}>

    <DefaultModalLayout title='Actualizar Dependencia' closeModal={closeModal}>
      <form onSubmit={handleSubmit(handleUpdate)} className='py-8 px-4 font-semibold flex flex-col gap-y-3'>

        <InputWLabel readOnly required id='nombre' labelText='Nombre' type='text' autoFocus register={register} defaultValue={nombre} />
        <InputWLabel id='abreviatura' name='abreviatura' labelText='Abreviatura' type='text' register={register} required defaultValue={abreviatura} />

         <SelectInputControlledWithLabel
          name='sector'
          control={control}
          rules={{ required: true }}
          defaultValue={sectoresData.find(el => el.id_sector === id_sector)}
          options={sectoresData}
          loading={sectoresLoading}
          error={sectoresError}
          show='nombre'
          labelText={'Sector'}
         />
        <SelectInputControlledWithLabel
         name='unidad'
         control={control}
         rules={{ required: true }}
         defaultValue={unidadesData.find(el => el.id_unidad === id_unidad)}
         show={'nombre'}
         loading={unidadesLoading}
         error={unidadesError}
         options={unidadesData}
        />

        <div className='mt-5' />
        <ButtonsContainer closeModal={closeModal}>
          <button type='submit'>Actualizar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}

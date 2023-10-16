import { useForm } from 'react-hook-form'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { compareValues } from '../../../../utils/compareValues'
import { SelectInputControlled } from '../../../common/select-input-controlled'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

export function UpdateDependenciaModal ({ closeModal, entryData }) {
  const { sector, nombre, abreviatura, unidad } = entryData
  const sectoresData = useSelector(s => s.data.general.sectores.data)
  const dependenciasData = useSelector(s => s.data.general.dependencias.data.complete)

  const allUnidades = useMemo(() => {
    return dependenciasData.map(el => el.unidad)
  }, [dependenciasData])

  const { register, handleSubmit, control } = useForm()
  const { updDependenciasData } = useDataActions()

  const onSubmit = (newData) => {
    updDependenciasData({ newData, nombre })
  }

  const handleUpdate = (data) => {
    const newEntryData = { ...entryData }
    delete newEntryData.id
    if (compareValues(data, newEntryData)) return
    onSubmit(data)
  }

  return <ModalBackground onClick={closeModal} closeModal={closeModal}>

    <DefaultModalLayout title='Actualizar Dependencia' closeModal={closeModal}>
      <form onSubmit={handleSubmit(handleUpdate)} className='py-8 px-4 font-semibold flex flex-col gap-y-3'>

        <InputWLabel id='nombre' labelText='Nombre' type='text' autoFocus register={register} required defaultValue={nombre} />
        <InputWLabel id='abreviatura' name='abreviatura' labelText='Abreviatura' type='text' register={register} required defaultValue={abreviatura} />

        <label className='-mb-3 text-lg'>Sector</label>
        <SelectInputControlled
         name='sector'
         control={control}
         rules={{ required: true }}
         defaultValue={sector}
         options={sectoresData} />

        <label className='-mb-3 text-lg'>Unidad</label>
        <SelectInputControlled
         name='unidad'
         control={control}
         rules={{ required: true }}
         defaultValue={unidad}
         options={allUnidades} />
         <div className='mb-4' />

        <div className='mt-5' />
        <ButtonsContainer closeModal={closeModal}>
          <button type='submit'>Actualizar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}

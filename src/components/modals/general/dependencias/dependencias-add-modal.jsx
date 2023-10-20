import { useForm } from 'react-hook-form'
import { InputWLabel } from '../../../common/input-w-label'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useDataActions } from '../../../../hooks/useDataActions'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'
import { useSelector } from 'react-redux'

export function DependenciasAddModal ({ closeModal }) {
  const { register, handleSubmit, control } = useForm()
  const { addDependenciasData } = useDataActions()

  const { data: sectoresData, loading: sectoresLoading, error: sectoresError } = useSelector(s => s.data.sectores)

  const onSubmit = (data) => {
    const { sector, unidad } = data
    const id_sector = sector.id_sector
    const id_unidad = unidad.id_unidad

    addDependenciasData({ ...data, sector: sector.nombre, unidad: unidad.nombre, id_unidad, id_sector })
  }

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>

    <DefaultModalLayout title='Agregar Sector' closeModal={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)} className='py-8 px-4 font-semibold flex flex-col gap-y-4'>

        <InputWLabel id='nombre' labelText='Nombre' type='text' autoFocus register={register} required />
        <InputWLabel id='abreviatura' name='abreviatura' labelText='Abreviatura' type='text' register={register} required />

        <SelectInputControlledWithLabel
         name='sector'
         control={control}
         show='nombre'
         rules={{ required: true }}
         options={sectoresData}
         loading={sectoresLoading}
         error={sectoresError}
         labelText={'Sector'} />

        <SelectInputControlledWithLabel
         name='unidad'
         control={control}
         rules={{ required: true }}
         options={['Abc', 'Abc2', 'Abc3', 'Abc4']}
         labelText='Unidad'
         />

        <ButtonsContainer closeModal={closeModal} >
          <button type='submit'>Agregar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}

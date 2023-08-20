import { useForm } from 'react-hook-form'
import { InputWLabel } from '../../../common/input-w-label'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { SelectInputControlled } from '../../../common/select-input-controlled'
import { useDataActions } from '../../../../hooks/useDataActions'

export function DependenciasAddModal ({ closeModal }) {
  const { register, handleSubmit, control } = useForm()
  const { addDependenciasData } = useDataActions()

  const onSubmit = (data) => {
    const { sector, unidad } = data
    addDependenciasData({ ...data, sector: sector.value, unidad: unidad.value })
  }

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>

    <DefaultModalLayout title='Agregar Sector' >
      <form onSubmit={handleSubmit(onSubmit)} className='py-8 px-4 font-semibold flex flex-col gap-y-4'>

        <InputWLabel id='nombre' labelText='Nombre' type='text' autoFocus register={register} required />
        <InputWLabel id='abreviatura' name='abreviatura' labelText='Abreviatura' type='text' register={register} required />

        <label className='-mb-3 text-lg'>Sector</label>
        <SelectInputControlled
         name='sector'
         control={control}
         rules={{ required: true }}
         defaultValue={null}
         options={['Central', 'Externo', 'Interno', 'Unidad']} />

        <label className='-mb-3 text-lg'>Unidad</label>
        <SelectInputControlled
         name='unidad'
         control={control}
         rules={{ required: true }}
         defaultValue={null}
         options={['Abc', 'Abc2', 'Abc3', 'Abc4']} />
         <div className='mb-4' />

        <ButtonsContainer closeModal={closeModal} >
          <button type='submit'>Agregar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}

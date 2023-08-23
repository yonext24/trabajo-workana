import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { SelectInputControlled } from '@/components/common/select-input-controlled'
import { ButtonsContainer } from '../../buttons-container'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'

export function UnidadUpdateModal ({ closeModal, tipo, abreviatura, nombre, codigo }) {
  const { register, handleSubmit, control } = useForm()
  const { updateUnidadAcademicaUnidad } = useOfertaAcademicaActions()

  const handleUpdate = (newData) => {
    updateUnidadAcademicaUnidad({ nombre, newData: { ...newData, nombre } })
      .then(closeModal)
  }

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>
    <DefaultModalLayout title='Actualizar Unidad'>
      <form onSubmit={handleSubmit(handleUpdate)} className='px-8 py-4 pb-12 flex flex-col gap-y-3'>
        <div className='flex flex-col'>
          <label className='font-semibold text-lg'>Tipo UA</label>
          <SelectInputControlled defaultValue={tipo} control={control} name='tipo' rules={{ required: true }} options={['Escuela', 'Test']} />
        </div>
        <InputWLabel name='codigo' id='codigo' labelText='Código' required register={register} defaultValue={codigo} />
        <InputWLabel name='nombre' id='nombre' labelText='Nombre' register={register} disabled defaultValue={nombre} />
        <InputWLabel inputClassName='mb-12' name='abreviatura' id='abreviatura' required register={register} defaultValue={abreviatura} />

        <ButtonsContainer closeModal={closeModal}>
          <button type='submit'>
            Actualizar
          </button>
        </ButtonsContainer>

      </form>

    </DefaultModalLayout>
  </ModalBackground>
}

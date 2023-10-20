import { InputWLabel } from '@/components/common/input-w-label'
import { SelectInputControlled } from '@/components/common/select-input-controlled'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function RecursoAddModal ({ closeModal }) {
  const { handleSubmit, register, control } = useForm()
  const { data: recursoData } = useSelector(s => s.ofertaAcademica.carrera.recurso)
  const { data: tipoRecursoData } = useSelector(s => s.ofertaAcademica.carrera.tipo_recurso)
  const { addCarreraRecurso } = useOfertaAcademicaActions()

  const handleUpload = data => {
    if (recursoData.some(el => el.nombre === data.nombre)) {
      toast.error('Ya hay un recurso con ese nombre.')
      return
    }
    addCarreraRecurso(data)
      .then(closeModal)
  }

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>
    <DefaultModalLayout title='Agregar Recurso' closeModal={closeModal}>
      <form className='p-6 flex flex-col gap-3' onSubmit={handleSubmit(handleUpload)}>
        <div className='flex flex-col'>
          <label className='font-semibold text-lg'>Tipo</label>
          <SelectInputControlled control={control} name='tipo' rules={{ required: true }} options={tipoRecursoData.map(el => el.nombre)} />
        </div>

        <InputWLabel name='nombre' required register={register} />
        <InputWLabel name='descripcion' required register={register} isTextArea />

        <ButtonsContainer className={'mt-6'}>
          <button type='submit'>Agregar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>
  </ModalBackground>
}

import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { SelectInputControlled } from '@/components/common/select-input-controlled'
import { useSelector } from 'react-redux'
import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '../../buttons-container'
import { toast } from 'react-toastify'

export function ChangeRoleModal ({ closeModal }) {
  const { roles: { data: rolesData }, usuarios: { showing } } = useSelector(s => s.usuarios)
  const { dependencias: { data: { complete: dependenciasData } }, puestos: { data: puestosData } } = useSelector(s => s.data).general
  const { handleSubmit, register, control } = useForm()

  const {
    rol,
    dependencia,
    puesto,
    referencia_de_oficio
  } = showing

  const handleUpdate = data => {
    toast('Este botón aún no funciona, esperando que me entreguen la api para resolver.')
  }

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>

    <DefaultModalLayout title='Cambiar rol de usuario'>
      <form className='p-6 [&_label]:font-semibold [&_label]:text-lg flex flex-col gap-3' onSubmit={handleSubmit(handleUpdate)}>
        <div className='flex flex-col'>
          <label>Rol</label>
          <SelectInputControlled control={control} name='rol' rules={{ required: true }} options={rolesData.map(el => el.nombre)} defaultValue={rol} />
        </div>
        <div className='flex flex-col'>
          <label>Dependencia</label>
          <SelectInputControlled control={control} name='dependencia' rules={{ required: true }} options={dependenciasData.map(el => el.nombre)} defaultValue={dependencia} />
        </div>
        <div className='flex flex-col'>
          <label>Puesto</label>
          <SelectInputControlled control={control} name='puesto' rules={{ required: true }} options={puestosData} defaultValue={puesto} />
        </div>
        <InputWLabel register={register} type='text' id='referencia_de_oficio' labelText='Referencia de oficio' name='referencia_de_oficio' defaultValue={referencia_de_oficio} />

        <ButtonsContainer className='[&>button]:!py-2 mt-6'>
          <button type='submit'>Guardar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}

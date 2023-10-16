import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { SelectInputControlled } from '@/components/common/select-input-controlled'
import { useSelector } from 'react-redux'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect } from 'react'
import { ButtonsContainer } from '../../buttons-container'

export function AddUsuariosModal ({ closeModal }) {
  const { dependencias: { data: { complete: dependencias } }, puestos: { data: puestos } } = useSelector(s => s.data).general
  const { data: roles } = useSelector(s => s.usuarios).roles
  const { register, control, handleSubmit } = useForm()
  const { getRolesData } = useUsuariosActions()

  useEffect(() => {
    getRolesData()
  }, [])

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>

    <DefaultModalLayout closeModal={closeModal} className='!max-w-4xl !max-h-[95vh]' title='Agregar usuario'>

      <form onSubmit={handleSubmit} className='p-6 grid grid-cols-2 gap-4 gap-x-12 font-semibold text-lg overflow-x-scroll'>

        <InputWLabel register={register} type='text' id='nombres' name='nombres' required />
        <InputWLabel register={register} type='text' id='apellidos' name='apellidos' required />
        <InputWLabel register={register} type='text' id='telefono' name='telefono' required />
        <InputWLabel register={register} type='text' id='celular' name='celular' required />
        <InputWLabel register={register} type='text' id='cui' name='cui' required />
        <InputWLabel register={register} type='text' id='registro_de_personal' name='registro_de_personal' labelText='Registro de personal' required />
        <InputWLabel register={register} type='text' id='correo' name='correo' required />
        <div className='flex flex-col'>
          <label>País</label>
          <SelectInputControlled control={control} options={['Mexico', 'Guatemala', 'Argentina', 'Uruguay', 'El Salvador']} name='pais' rules={{ required: true }} />
        </div>
        <InputWLabel register={register} type='text' id='usuario' name='usuario' required />
        <div className='flex flex-col'>
          <label>Rol</label>
          <SelectInputControlled control={control} options={roles.map(el => el.nombre)} name='rol' rules={{ required: true }} />
        </div>
        <div className='flex flex-col'>
          <label>Dependencia</label>
          <SelectInputControlled control={control} options={dependencias.map(el => el.nombre)} name='dependencia' rules={{ required: true }} />
        </div>
        <div className='flex flex-col'>
          <label>Puesto</label>
          <SelectInputControlled control={control} options={puestos} name='puesto' rules={{ required: true }} />
        </div>
        <InputWLabel register={register} type='text' id='referencia_de_oficio' labelText='Referencia de oficio' name='referencia_de_oficio' />

        <div className='col-start-1 col-end-3'>
          <ButtonsContainer closeModal={closeModal}>
            <button type='submit'>Guardar</button>
          </ButtonsContainer>
        </div>

      </form>

    </DefaultModalLayout>

  </ModalBackground>
}

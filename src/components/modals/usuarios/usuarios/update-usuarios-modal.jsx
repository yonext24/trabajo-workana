import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { SelectInputControlled } from '@/components/common/select-input-controlled'
import { useSelector } from 'react-redux'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect } from 'react'
import { ButtonsContainer } from '../../buttons-container'
import { toast } from 'react-toastify'

export function UpdateUsuariosModal ({ closeModal }) {
  const { dependencias: { data: { complete: dependencias } }, puestos: { data: puestos } } = useSelector(s => s.data).general
  const { roles: { data: roles }, usuarios: { showing } } = useSelector(s => s.usuarios)
  const { register, control, handleSubmit } = useForm()
  const { getRolesData } = useUsuariosActions()

  const {
    nombres,
    apellidos,
    telefono,
    celular,
    cui,
    registro_de_personal,
    correo,
    pais,
    usuario,
    rol,
    dependencia,
    puesto,
    referencia_de_oficio
  } = showing

  useEffect(() => {
    getRolesData()
  }, [])

  const handleUpdate = () => {
    toast('Este botón aún no hace nada, esperando a que me den la api para resolverlo.')
  }

  return <ModalBackground closeModal={closeModal} onClick={closeModal}>

    <DefaultModalLayout closeModal={closeModal} className='!max-w-4xl !max-h-[95vh]' title='Agregar usuario'>

      <form onSubmit={handleSubmit(handleUpdate)} className='p-6 grid grid-cols-2 gap-4 gap-x-12 font-semibold text-lg overflow-x-scroll'>

        <InputWLabel register={register} type='text' id='usuario' name='usuario' disabled defaultValue={usuario} />
        <div className='flex flex-col'>
          <label>Rol</label>
          <SelectInputControlled control={control} options={roles.map(el => el.nombre)} name='rol' rules={{ required: true }} disabled defaultValue={rol} />
        </div>
        <InputWLabel register={register} type='text' id='nombres' name='nombres' defaultValue={nombres} required />
        <InputWLabel register={register} type='text' id='apellidos' name='apellidos' defaultValue={apellidos} required />
        <InputWLabel register={register} type='text' id='telefono' name='telefono' defaultValue={telefono} required />
        <InputWLabel register={register} type='text' id='celular' name='celular' defaultValue={celular} required />
        <InputWLabel register={register} type='text' id='cui' name='cui' defaultValue={cui} disabled />
        <InputWLabel register={register} type='text' id='registro_de_personal' disabled name='registro_de_personal' defaultValue={registro_de_personal} labelText='Registro de personal' />
        <InputWLabel register={register} type='text' id='correo' name='correo' defaultValue={correo} required />
        <div className='flex flex-col'>
          <label>País</label>
          <SelectInputControlled control={control} disabled options={['Mexico', 'Guatemala', 'Argentina', 'Uruguay', 'El Salvador']} name='pais' defaultValue={pais} rules={{ required: true }} />
        </div>
        <div className='flex flex-col'>
          <label>Dependencia</label>
          <SelectInputControlled control={control} options={dependencias.map(el => el.nombre)} name='dependencia' defaultValue={dependencia} rules={{ required: true }} />
        </div>
        <div className='flex flex-col'>
          <label>Puesto</label>
          <SelectInputControlled control={control} options={puestos} name='puesto' defaultValue={puesto} rules={{ required: true }} />
        </div>
        <InputWLabel register={register} type='text' id='referencia_de_oficio' labelText='Referencia de oficio' name='referencia_de_oficio' defaultValue={referencia_de_oficio} />

        <div className='col-start-1 col-end-3'>
          <ButtonsContainer closeModal={closeModal}>
            <button type='submit'>Guardar</button>
          </ButtonsContainer>
        </div>

      </form>

    </DefaultModalLayout>

  </ModalBackground>
}

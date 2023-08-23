import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input'
import { PenIcon, PersonsIcon, PlusRoundedIcon, SearchIcon, TrashIcon } from '@/components/icons'
import { AddUsuariosModal } from '@/components/modals/usuarios/usuarios/add-usuarios-modal'
import { ChangeRoleModal } from '@/components/modals/usuarios/usuarios/change-role-modal'
import { InfoUsuariosModal } from '@/components/modals/usuarios/usuarios/info-usuarios-modal'
import { UpdateUsuariosModal } from '@/components/modals/usuarios/usuarios/update-usuarios-modal'
import { TableUsuarios } from '@/components/tables/usuarios/table-usuarios/table-usuarios'
import { useLayoutActions } from '@/hooks/useLayoutActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { accentParser } from '@/utils/accentsParser'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

// Esta página y todas las de la carpeta /usuarios tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Usuarios () {
  const [searchFor, setSearchFor] = useState('correo')
  const { register, handleSubmit } = useForm()
  const { setUsuariosShowing } = useUsuariosActions()
  const { data: usuariosData } = useSelector(s => s.usuarios).usuarios
  const { handleAdd, handleUpd, handleDel } = useTableDefaultModals({
    place: 'usuarios',
    add: { el: AddUsuariosModal },
    update: { el: UpdateUsuariosModal },
    del: { onClick: () => { toast('Aún no funciona, esperando que me entreguen api.') }, title: 'Borrar usuario', sure: 'Realmente quieres borrar este usuario?' }
  })
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handleInfo = () => {
    const modalId = 'info-usuarios-modal'
    openModal({
      Element: InfoUsuariosModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        }
      }
    })
  }
  const handleRole = () => {
    const modalId = 'role-usuarios-modal'
    openModal({
      Element: ChangeRoleModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        }
      }
    })
  }

  const onSubmit = (data) => {
    const { search } = data
    const usuario = usuariosData.find(el => {
      return accentParser(String(el[searchFor]).toLowerCase()).includes(accentParser(search.toLowerCase()))
    })
    if (!usuario) {
      toast.error('No se econtró ningún usuario con esas características.')
      return
    }
    setUsuariosShowing(usuario)
  }

  return <div id='page-content'>

    <div className='flex justify-between items-end'>
      <NuevoButton handleClick={handleAdd} />
      <form onSubmit={handleSubmit(onSubmit)} className='flex items-end gap-4 flex-col md:flex-row'>

        <div className='flex flex-col w-48'>
          <label className='font-semibold text-lg'>Buscar por</label>
          <SelectInput options={['correo', 'nombres', 'apellidos', 'pais', 'telefono']} defaultValue={'correo'} handleOptionClick={setSearchFor} />
        </div>

        <div className='flex'>

          <input type='text' className='border border-gris rounded-md py-1 px-4' {...register('search', { required: true })} />
          <button type='submit' className='bg-gray-800 p-1 rounded-lg ml-1'>
            <SearchIcon className='h-7 w-7 text-white' />
          </button>

        </div>

      </form>
    </div>

    <TableUsuarios />
    <button onClick={handleInfo} className='bg-neutral-800 text-white p-1 self-start -mt-7 rounded-md'>
      <PlusRoundedIcon className='h-6 w-6' />
    </button>
    <div className='w-full flex gap-3 justify-center'>
      <button className='bg-verde text-white p-2 rounded-lg flex justify-center' onClick={handleUpd}>
        <PenIcon className='h-10 w-10' />
      </button>
      <button className='bg-gray-800 text-white p-2 rounded-lg flex justify-center' onClick={handleRole}>
        <PersonsIcon className='h-10 w-10' />
      </button>
      <button className='bg-red-500 text-white p-2 rounded-lg flex justify-center' onClick={handleDel}>
        <TrashIcon className='h-10 w-10' />
      </button>
    </div>

  </div>
}

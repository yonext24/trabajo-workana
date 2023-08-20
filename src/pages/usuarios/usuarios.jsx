import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input'
import { SearchIcon } from '@/components/icons'
import { AddUsuariosModal } from '@/components/modals/usuarios/usuarios/add-usuarios-modal'
import { TableUsuarios } from '@/components/tables/usuarios/table-usuarios/table-usuarios'
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
  const { handleAdd } = useTableDefaultModals({ add: { el: AddUsuariosModal } })

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

          <input type='text' className='border border-gris rounded-l-md py-1 px-4' {...register('search', { required: true })} />
          <button type='submit' className='bg-black p-1 rounded-r-sm'>
            <SearchIcon className='h-7 w-7 text-white' />
          </button>

        </div>

      </form>
    </div>

    <TableUsuarios />

  </div>
}

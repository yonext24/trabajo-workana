/* eslint-disable n/handle-callback-err */
import { NuevoButton } from '@/components/common/nuevo-button'
import { TableGeneral } from '@/components/tables/general/table-general/table-general'
import { useLayoutActions } from '@/hooks/useLayoutActions'
import { AddSectorModal } from '@/components/modals/general/sectores/add-sector.modal'
import { useEffect } from 'react'
import { useDataActions } from '@/hooks/useDataActions'
import { useSelector } from 'react-redux'
import { Spinner } from '@/components/common/spinner'
import { toast } from 'react-toastify'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function GeneralSectores () {
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()
  const { general: { sectores: { revalidating } } } = useSelector(s => s.data)

  const { getSectoresData } = useDataActions()

  useEffect(() => {
    getSectoresData()
      .catch(err => { toast.error('Ocurrió un error') })
  }, [])

  const handleClick = () => {
    const modalId = 'update-general-modal'
    openModal({
      Element: AddSectorModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        }
      }
    })
  }

  return <div id='page-content'>
    <NuevoButton handleClick={handleClick} />
    <TableGeneral />
    {
      revalidating && <Spinner className={'absolute top-6 right-6 !border-black !h-4 !w-4 !border-2 !border-b-white'} />
    }
  </div>
}

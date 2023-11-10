import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input'
import { ExtensionAddModal } from '@/components/modals/oferta-academica/extension/extension-add-modal'
import { ExtensionMainTable } from '@/components/tables/oferta-academica/extension/extension-main-table'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function Extension() {
  const { getOfertaAcademicaExtension, setExtensionFiltered } = useOfertaAcademicaActions()
  const { handleAdd } = useTableDefaultModals({
    place: 'extension',
    add: { el: ExtensionAddModal }
  })
  const data = useSelector(s => s.ofertaAcademica.extension.data)

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions

  useEffect(() => {
    setExtensionFiltered(data)
  }, [data])

  useEffect(() => {
    getOfertaAcademicaExtension()
  }, [])

  console.log({ data })

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <div className="w-full flex flex-col gap-x-4 sm:justify-start sm:flex-row sm:items-end text-lg font-semibold">
          <div className="flex flex-col w-full max-w-[190px]">
            <label>Tipo unidad</label>
            <SelectInput options={['Escuela', 'Hospital']} firstOne />
          </div>
          <div className="flex flex-col w-full max-w-[190px]">
            <label>Unidad</label>
            <SelectInput options={['1', '2']} firstOne />
          </div>
        </div>
        <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
      </div>
      <ExtensionMainTable permissions={permissions} />
    </div>
  )
}

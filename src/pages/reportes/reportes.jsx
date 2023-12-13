import { ErrorWarning } from '@/components/common/error-warning'
import { Spinner } from '@/components/common/spinner'
import { DownloadIcon, PaperIcon } from '@/components/icons'
import { BASE_OFERTA_URL } from '@/utils/consts'
import { reportesJsonToExcelMapper } from '@/utils/excel/mappers'
import { appFetch } from '@/utils/fetchHandler'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

const fetchReportes = async () => await appFetch(`${BASE_OFERTA_URL}/rye/reporte/maestro_carreras`)

export function Reportes() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDownload = useCallback(async isExcel => {
    setLoading(true)
    const fileName = `Reporte RYE ${new Date().toLocaleDateString()}`
    try {
      const json = await fetchReportes()
      const parsedJson = reportesJsonToExcelMapper(json)

      if (isExcel === true) {
        const { createExcelFromJson } = await import('@/utils/excel/createExcel')
        createExcelFromJson(parsedJson, fileName)
      } else {
        const { createCSVFromJson } = await import('@/utils/excel/createExcel')
        createCSVFromJson(parsedJson, fileName)
      }
    } catch (err) {
      const errMessage = err?.message ?? err ?? 'Algo salió mal'
      toast.error(errMessage)
      setError(errMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div id="page-content" className="py-12 flex flex-col items-center relative">
      {loading && (
        <div className="absolute right-0 top-0">
          <Spinner className="w-4 h-4" />
        </div>
      )}
      <div className="absolute left-0 top-0">
        <ErrorWarning err={error} />
      </div>

      <div className="flex gap-2 items-center">
        <PaperIcon className="h-14 w-14" />
        <h1 className="text-4xl font-semibold text-neutral-800">Reporte maestro de carreras</h1>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center px-3 justify-center w-[200px] bg-gris-oscuro text-white rounded-md my-1 py-2 text-2xl relative"
        >
          <DownloadIcon className="h-8 w-8" />
          <span className="flex-1">CSV</span>
          <div className="w-8"></div>
        </button>
        <button
          onClick={() => {
            handleDownload(true)
          }}
          type="button"
          className="flex items-center px-3 justify-center w-[200px] bg-gris-oscuro text-white rounded-md my-1 py-2 text-2xl relative"
        >
          <DownloadIcon className="h-8 w-8" />
          <span className="flex-1">Excel</span>
          <div className="w-8"></div>
        </button>
      </div>
    </div>
  )
}

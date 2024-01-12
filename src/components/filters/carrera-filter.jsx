import { useSelector } from 'react-redux'
import { SelectInput } from '../common/select-input/select-input'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useEffect } from 'react'

export function CarreraFilter() {
  const nivelesData = useSelector(s => s.ofertaAcademica.carrera.nivel.data)
  const nivelesLoading = useSelector(s => s.ofertaAcademica.carrera.nivel.revalidating)
  const nivelesError = useSelector(s => s.ofertaAcademica.carrera.nivel.error)

  const { setCarreraCarreraPaginationData, getCarreraNivelData, setCarreraError } = useOfertaAcademicaActions()

  useEffect(() => {
    if (nivelesError) {
      setCarreraError(nivelesError)
    }
  }, [nivelesError])

  useEffect(() => {
    getCarreraNivelData()
  }, [])

  const handleOptionClick = option => {
    setCarreraCarreraPaginationData({ nivel: option?.id_nivel })
  }

  return (
    <div className="flex flex-col w-full max-w-[210px]">
      <label className="text-lg font-semibold">Nivel Carrera</label>
      <SelectInput
        options={nivelesData}
        handleOptionClick={handleOptionClick}
        onFirstChange={handleOptionClick}
        show="nombre"
        error={nivelesError}
        loading={nivelesLoading}
        firstOne
      />
    </div>
  )
}

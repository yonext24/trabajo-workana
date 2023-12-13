import { useCallback, useState } from 'react'
import { Controller } from 'react-hook-form'

// Este componente se utiliza sólamente en la modal de agregar geografía
// no es realmente reutilizable, habría que refactorizarlo para que lo sea
export function InputFileWDrop({ file, setFile }) {
  const [error, setError] = useState(false)
  const [dragging, setDragging] = useState(false)

  const handleDropFile = async e => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleParseFile(file)
  }
  const handleInputFile = async e => {
    e.preventDefault()
    const file = e.target.files[0]
    handleParseFile(file)
  }

  const handleParseFile = useCallback(async file => {
    const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    if (!isExcel) {
      setFile(null)
      setError('El archivo debe ser de tipo excel')
      setDragging(false)
      return
    }

    try {
      const { parseExcel } = await import('@/utils/excel/parseExcel')
      const { mapGeografiaExcel } = await import('@/utils/excel/mappers')

      const json = await parseExcel(file)
      const parsedRows = mapGeografiaExcel(json)
      setDragging(false)
      setFile(parsedRows)
    } catch (err) {
      const errMessage =
        err instanceof Error ? err.message : 'Ocurrió un error desconocido, si el error persiste infórmele a soporte'
      setError(errMessage)
      setDragging(false)
    }
  }, [])

  const handleDragStart = e => {
    e.preventDefault()
    setDragging(true)
    setError(false)
  }

  const handleDragEnd = e => {
    e.preventDefault()
    setDragging(false)
  }

  return (
    <div
      className={`w-full h-full flex flex-col ${file ? 'hidden' : ''}`}
      onDragOver={handleDragStart}
      onDrop={handleDropFile}
      onDragExit={handleDragEnd}
      onDragLeave={handleDragEnd}
      onDragEnd={handleDragEnd}
    >
      <Render dragging={dragging} file={file} error={error} handleInputFile={handleInputFile} />
    </div>
  )
}

const Render = ({ dragging, file, error, handleInputFile }) => {
  return (
    <div className="rounded-md overflow-hidden m-6 flex-1 flex">
      {(() => {
        if (file) return null
        if (error)
          return (
            <div className="w-full flex-1 text-center border-dashed border-red-500 border-2 flex items-center justify-center transition-colors text-xl bg-red-500 text-white">
              <span>{error}</span>
            </div>
          )

        return (
          <div
            className={`w-full flex-1 border-dashed border-blue-500 border-2 flex items-center justify-center transition-colors text-xl 
            text-black flex-col ${dragging ? 'bg-blue-500 text-white' : 'bg-transparent'}`}
          >
            {dragging ? <span>Suelte el archivo aquí</span> : <span>Arrastre un archivo de excel aquí</span>}
            <label htmlFor="input_drop_geo" className="border border-black p-2 rounded bg-gray-200">
              Seleccionar aquí
            </label>
            <input
              onChange={handleInputFile}
              type="file"
              id="input_drop_geo"
              className="hidden"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          </div>
        )
      })()}
    </div>
  )
}

export const ControlledInputFileWDrop = ({ control, id, name, rules }) => {
  return (
    <Controller
      control={control}
      name={name}
      id={id}
      rules={rules}
      render={({ field }) => {
        const { value, onChange } = field

        return <InputFileWDrop file={value} setFile={onChange} />
      }}
    />
  )
}

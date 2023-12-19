import { useState } from 'react'
import { Controller } from 'react-hook-form'

export function InputFileWDrop({ file, setFile, handleParseFile }) {
  const [error, setError] = useState(false)
  const [dragging, setDragging] = useState(false)

  const handleDropFile = async e => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    try {
      const parsedFile = await handleParseFile(file)
      setFile(parsedFile)
    } catch (err) {
      setFile(undefined)
      setError(err?.message ?? String(err))
    } finally {
      setDragging(false)
    }
  }
  const handleInputFile = async e => {
    e.preventDefault()
    const file = e.target.files[0]
    console.log(file)
    try {
      const parsedFile = await handleParseFile(file)
      setFile(parsedFile)
    } catch (err) {
      setFile(undefined)
      setError(err?.message ?? String(err))
    } finally {
      setDragging(false)
    }
  }

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

export const ControlledInputFileWDrop = ({ control, id, name, rules, handleParseFile }) => {
  return (
    <Controller
      control={control}
      name={name}
      id={id}
      rules={rules}
      render={({ field }) => {
        const { value, onChange } = field

        return <InputFileWDrop file={value} setFile={onChange} handleParseFile={handleParseFile} />
      }}
    />
  )
}

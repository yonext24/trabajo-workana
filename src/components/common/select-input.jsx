import { useEffect, useState } from 'react'
import { DownArrowIcon } from '../icons'

export function SelectInput({
  options,
  show,
  defaultValue,
  firstOne = false,
  handleOptionClick,
  disabled,
  error,
  formError,
  loading,
  rawOnChange
}) {
  const [value, setValue] = useState('Seleccionar')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (loading) setValue('Cargando...')
    else if (error) setValue('Error')
    else if (defaultValue || firstOne) {
      const newValue = firstOne ? valueParser(options[0]) : valueParser(defaultValue) ?? 'Seleccionar'
      setValue(newValue)
    } else setValue('Seleccionar')
  }, [loading, error, defaultValue])

  useEffect(() => {
    !disabled && rawOnChange?.(value) // No fui capaz de hacerlo sin esto, no creo que sea la mejor práctica
  }, [value])

  function valueParser(data) {
    return typeof data === 'string' ? data : data[show]
  }

  const handleChange = selected => {
    if (disabled) return
    setValue(selected)
    setOpen(false)
    handleOptionClick(selected)
  }

  const handleClick = () => {
    if (disabled || loading) return
    setOpen(!open)
  }

  return (
    <div className="relative w-full">
      <div
        onClick={handleClick}
        id="fake-select"
        data-disabled={disabled}
        data-loading={loading}
        className="cursor-default data-[loading=true]:cursor-not-allowed text-lg pl-4
    border-2 border-gris rounded-md flex w-full overflow-hidden data-[disabled=true]:shadow-lg data-[disabled=true]:cursor-not-allowed"
      >
        <div className="flex-1 text-left py-[2px]">
          <span className="block py-px capitalize transition-colors" style={{ color: formError && 'red' }}>
            {valueParser(value) || 'Seleccionar'}
          </span>
        </div>
        <div
          className={`border-l-2 border-gris px-4 flex items-center transition-colors ${
            open ? 'bg-azulfondo  text-white' : 'bg-gris  text-black'
          }`}
        >
          <DownArrowIcon className="h-4 w-4" />
        </div>
      </div>
      {open && (
        <ul
          className="absolute z-10 w-full bottom-0 left-0 translate-y-[calc(100%+5px)] border border-black block rounded-md shadow-md
      overflow-hidden"
        >
          {options.map(data => {
            const value = valueParser(data)

            return (
              <li
                className="bg-azulfondo text-white hover:bg-white hover:text-black py-1 px-3 transition-colors select-none capitalize"
                key={value}
                onClick={() => handleChange(data)}
              >
                {value}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

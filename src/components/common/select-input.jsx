import { useEffect, useRef, useState } from 'react'
import { DownArrowIcon } from '../icons'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

function valueParser(data, show) {
  if (data === undefined || data === null) return 'Seleccionar'
  return typeof data === 'string' ? data : data[show]
}

export function SelectInput({
  options,
  show,
  defaultValue,
  externalValue,
  firstOne = false,
  handleOptionClick,
  ligatedToExternalChange = false,
  resetOnOptionsChange = false,
  disabled,
  error,
  formError,
  loading,
  rawOnChange,
  onFirstChange = false
}) {
  const [value, setValue] = useState(loading ? 'Cargando...' : 'Seleccionar')
  const [open, setOpen] = useState(false)

  const firstChangeHasOcurred = useRef(false)
  const previousValueBeforeLoading = useRef(null)
  const previousValue = useRef(value)

  useEffect(() => {
    if (!ligatedToExternalChange) return
    // Esto está hecho porque en algunos casos se generaban loops infinitos
    if (isEqual(externalValue, previousValue.current)) return

    setValue(externalValue)
  }, [externalValue])

  useEffect(() => {
    if (loading) setValue('Cargando...')
    else if (error) setValue('Error')
    else if (firstOne) {
      if (previousValueBeforeLoading.current && !resetOnOptionsChange) {
        setValue(previousValueBeforeLoading.current)
        return
      }
      const value = options[0]
      setValue(value)
    } else if (defaultValue) {
      const newValue = defaultValue ?? 'Seleccionar'
      setValue(newValue)
    } else setValue('Seleccionar')
  }, [loading, error])

  useEffect(() => {
    if (!resetOnOptionsChange) return
    setValue('Seleccionar')
  }, [options])

  useEffect(() => {
    previousValue.current = value

    !disabled && rawOnChange?.(value) // No fui capaz de hacerlo sin esto, no creo que sea la mejor práctica
    if (!['Seleccionar', 'Cargando...', 'Error'].includes(value)) {
      previousValueBeforeLoading.current = value
    }
    if (!onFirstChange) return

    if (firstChangeHasOcurred.current) return
    /* 
      Se utiliza el valor del primer cambio para capturarlo externamente en algunos filtros,
      y así saber cual es el valor que hay que fetchear, ya que el valor por defecto es 'Seleccionar'
    */
    if (value === 'Seleccionar' || value === 'Cargando...' || value === 'Error') return
    firstChangeHasOcurred.current = true
    onFirstChange(value)
  }, [value])

  const handleChange = selected => {
    if (disabled) return
    setValue(selected)
    setOpen(false)
    handleOptionClick(selected)
  }
  const handleClick = e => {
    e.stopPropagation()
    if (disabled || loading || error) return
    setOpen(!open)
  }

  const selectRef = useRef(null)

  return (
    <div className="relative w-full">
      <div
        ref={selectRef}
        onClick={handleClick}
        id="fake-select"
        data-disabled={Boolean(disabled || error || loading)}
        data-loading={loading}
        className="cursor-default data-[loading=true]:cursor-not-allowed text-lg pl-4
    border-2 border-gris rounded-md grid grid-cols-[1fr,50px] w-full overflow-hidden data-[disabled=true]:shadow-lg data-[disabled=true]:cursor-not-allowed"
      >
        <div className="flex-1 text-left py-[2px] overflow-hidden">
          <span className="block py-px capitalize transition-colors truncate" style={{ color: formError && 'red' }}>
            {valueParser(value, show) || 'Seleccionar'}
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
        <OptionsMenu
          options={options}
          selectRef={selectRef}
          show={show}
          handleChange={handleChange}
          closeSelf={() => {
            setOpen(false)
          }}
        />
      )}
    </div>
  )
}

const OptionsMenu = ({ options, show, handleChange, closeSelf, selectRef }) => {
  const ulRef = useRef(null)
  const screenHeight = useSelector(s => s.layout.screenData.height)

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        ulRef.current &&
        !ulRef.current.contains(e.target) &&
        selectRef.current &&
        !selectRef.current.contains(e.target)
      )
        closeSelf()
    }
    document.addEventListener('mouseup', handleClickOutside)

    const data = ulRef.current.getBoundingClientRect()
    const offSet = data.bottom - screenHeight
    if (offSet > 0) ulRef.current.style.marginBottom = `${offSet}px`

    return () => document.removeEventListener('mouseup', handleClickOutside)
  }, [ulRef.current])

  return (
    <ul
      ref={ulRef}
      className="absolute z-10 w-full bottom-0 left-0 translate-y-[calc(100%+5px)] border border-black block rounded-md shadow-md
      overflow-hidden"
    >
      {options.map(data => {
        const value = valueParser(data, show)

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
  )
}

import { useEffect, useRef, useState } from 'react'
import { DownArrowIcon } from '../../icons'
import isEqual from 'lodash.isequal'
import { useHovering } from '@/hooks/useHovering'
import { SelectInputOptions } from './select-input-options'
import { SelectInputHoverMessage } from './select-input-hover-message'

export function valueParser(data, show) {
  if (data === undefined || data === null) return 'Seleccionar'
  return typeof data === 'string' ? data : data[show]
}

// Este componente es horrible, pero se utiliza en muchos lugares y no tengo tiempo para refactorizarlo
// porque genera muchos errores

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
  disabledMessage,
  noOptionsMessage,
  error,
  formError,
  loading,
  rawOnChange,
  onFirstChange = false,
  autoFocus = false,
  name,
  className = ''
}) {
  const [value, setValue] = useState(loading ? 'Cargando...' : 'Seleccionar')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)

  const firstChangeHasOcurred = useRef(false)
  const previousValueBeforeLoading = useRef(undefined)
  const previousValue = useRef(value)
  const previousOptions = useRef(options)
  const hasIndexSearchOfDefaultValueOcurred = useRef(defaultValue !== undefined)
  name === 'modulo' && console.log({ autoFocus, focused })

  useEffect(() => {
    if (!hasIndexSearchOfDefaultValueOcurred.current) return
    if (options?.length <= 0) return
    if (defaultValue === undefined) return
    hasIndexSearchOfDefaultValueOcurred.current = true
    const index = (options ?? []).findIndex(e => {
      return isEqual(e, defaultValue)
    })
    if (index === -1 || index === undefined) {
      setCurrentIndex(0)
      return
    }
    setCurrentIndex(index)
  }, [options])

  useEffect(() => {
    if (!ligatedToExternalChange) return
    // Esto está hecho porque en algunos casos se generaban loops infinitos
    if (isEqual(externalValue, previousValue.current)) return
    setValue(externalValue)
    setCurrentIndex(0)
  }, [externalValue])

  useEffect(() => {
    if (loading) setValue('Cargando...')
    else if (error) setValue('Error')
    else if (firstOne) {
      if (previousValueBeforeLoading.current !== undefined && !resetOnOptionsChange) {
        setValue(previousValueBeforeLoading.current)
        return
      }
      const value = options[0]
      setCurrentIndex(0)
      setValue(value)
    } else if (defaultValue) {
      const newValue = defaultValue ?? 'Seleccionar'
      setCurrentIndex(0)
      setValue(newValue)
    } else {
      if (previousValueBeforeLoading.current !== undefined && !resetOnOptionsChange) {
        setValue(previousValueBeforeLoading.current)
        return
      }
      setCurrentIndex(0)
      setValue('Seleccionar')
    }
  }, [loading, error, JSON.stringify(options)])

  useEffect(() => {
    /*
     * *******************************************************************************************************
     *  ResetOnOptionsChange se utiliza para que cuando cambian las opciones, se resetee el valor del select
     *  lo cual es útil en los filtros que dependen de valores de otros filtros, por ejemplo, en el filtro de
     *  geografía, se puede combinar con firstOne para que cuando cambie el valor externo, se resetee el valor
     *  si no hay ninguna opción, de lo contrario, se selecciona la primer opción (linea 53)
     * *******************************************************************************************************
     */
    if (!resetOnOptionsChange) return
    if (firstOne && options.length >= 1) return

    if (isEqual(previousOptions.current, options)) return

    previousOptions.current = options
    setCurrentIndex(0)
    setValue('Seleccionar')
  }, [options])

  useEffect(() => {
    previousValue.current = value

    !disabled && !['Seleccionar', 'Cargando...', 'Error', undefined].includes(value) && rawOnChange?.(value)
    if (!['Seleccionar', 'Cargando...', 'Error'].includes(value)) {
      previousValueBeforeLoading.current = value
    }
    if (!onFirstChange) return
    if (firstChangeHasOcurred.current) return
    /* 
      Se utiliza el valor del primer cambio para capturarlo externamente en algunos filtros,
      y así saber cual es el valor que hay que fetchear, ya que el valor por defecto es 'Seleccionar'
    */
    if (value === 'Seleccionar' || value === 'Cargando...' || value === 'Error' || value === undefined) return
    firstChangeHasOcurred.current = true
    onFirstChange(value)
  }, [value])

  const handleChange = (selected, index) => {
    if (disabled) return
    setCurrentIndex(index)
    setValue(selected)
    setOpen(false)
    handleOptionClick(selected)
  }
  const handleClick = e => {
    e.stopPropagation()
    if (disabled || loading || error || options?.length === 0) return
    setOpen(!open)
  }

  const selectRef = useRef(null)
  const { elementRef, hovering } = useHovering()

  const handleKeyDown = e => {
    if (disabled || loading || error || options?.length === 0) return
    if (e.key === 'Enter') {
      if (open) {
        setOpen(false)
      } else {
        setOpen(true)
      }
    }
    if (e.key === 'Escape') {
      setOpen(false)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (currentIndex + 1 >= options.length) return
      handleChange(options[currentIndex + 1], currentIndex + 1)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (currentIndex - 1 < 0) return
      handleChange(options[currentIndex - 1], currentIndex - 1)
    }
  }

  return (
    <div className={`relative w-full flex ${className ?? ''}`} ref={elementRef}>
      <input
        autoFocus={autoFocus}
        id={'Fa'}
        type="text"
        className="h-0 w-0"
        onFocus={() => {
          setFocused(true)
          console.log('FOCUS ', name)
        }}
        onBlur={() => {
          setFocused(false)
          console.log('blur ', name)
        }}
        onKeyDown={handleKeyDown}
      />
      {hovering && (
        <SelectInputHoverMessage
          disabled={disabled}
          error={error}
          loading={loading}
          options={options}
          disabledMessage={disabledMessage}
          noOptionsMessage={noOptionsMessage}
        />
      )}
      <div
        ref={selectRef}
        onClick={handleClick}
        id="fake-select"
        data-disabled={Boolean(disabled || error || loading || options?.length === 0)}
        data-loading={loading}
        data-focused={focused}
        className="cursor-default data-[loading=true]:cursor-not-allowed text-base sm:text-lg pl-4 data-[focused=true]:border-blue-700
        border-2 border-gris rounded-md grid grid-cols-[1fr,50px] w-full overflow-hidden data-[disabled=true]:shadow-lg data-[disabled=true]:cursor-not-allowed"
      >
        <div className="flex-1 text-left py-[2px] overflow-hidden">
          <span
            className="block py-px capitalize transition-colors truncate select-none"
            style={{ color: formError && 'red' }}
          >
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
        <SelectInputOptions
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

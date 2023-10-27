import { Controller, useForm } from 'react-hook-form'
import { SelectInput } from './select-input'
import { useEffect } from 'react'

export function SelectInputControlled({
  control,
  error,
  loading,
  name,
  show,
  handleOptionClick,
  defaultValue,
  options,
  rules,
  disabled,
  validate,
  ...props
}) {
  const { setValue, watch } = useForm({
    defaultValues: {
      [name]: defaultValue
    }
  })
  useEffect(() => {
    setValue(name, defaultValue)
  }, [setValue, defaultValue])

  const validateSelect = value => {
    const condition =
      value !== 'Cargando...' && value !== 'Seleccionar' && value !== undefined
    return condition
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate: { validateSelect, ...validate }, ...rules }}
      render={({ field: { onChange, value } }) => {
        return (
          <SelectInput
            options={options}
            show={show}
            error={error}
            loading={loading}
            disabled={disabled}
            defaultValue={watch(value)?.[name]}
            handleOptionClick={selected => {
              handleOptionClick && handleOptionClick(selected)
              onChange(selected)
            }}
            rawOnChange={onChange}
            {...props}
          />
        )
      }}
    />
  )
}

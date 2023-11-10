import { Controller, useForm } from 'react-hook-form'
import { SelectInput } from './select-input'
import { useEffect } from 'react'

// No estoy seguro de si todo lo que se hace en este componente contribuye para que el componente
// funcione correctamente, quizá hay cosas que sobren
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
    !disabled && setValue(name, defaultValue)
  }, [setValue, defaultValue])

  const validateSelect = value => {
    if (value === 'Cargando...') return 'Debes esperar a que las opciones terminen de cargar.'
    if (value === 'Seleccionar') return 'Debes seleccionar una opción'
    if (value === undefined && !disabled) return false
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate: { validateSelect, ...validate }, ...rules }}
      render={({ field: { onChange }, formState: { errors } }) => {
        return (
          <SelectInput
            options={options}
            show={show}
            error={error}
            formError={errors[name]}
            loading={loading}
            disabled={disabled}
            defaultValue={watch(name)}
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

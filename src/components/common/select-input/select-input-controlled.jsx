import { Controller } from 'react-hook-form'
import { SelectInput } from './select-input'

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
      render={({ field: { onChange, value }, formState: { errors } }) => {
        return (
          <SelectInput
            options={options}
            show={show}
            error={error}
            formError={errors[name]}
            loading={loading}
            disabled={disabled}
            defaultValue={defaultValue}
            externalValue={value}
            handleOptionClick={selected => {
              handleOptionClick && handleOptionClick(selected)
              onChange(selected)
            }}
            name={name}
            rawOnChange={onChange}
            {...props}
          />
        )
      }}
    />
  )
}

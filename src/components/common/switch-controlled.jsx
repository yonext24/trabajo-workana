import { Controller } from 'react-hook-form'
import { SwitchButton } from './table-buttons'

export function SwitchControlled({
  control,
  disabled,
  defaultValue = false,
  // validate,
  // externalValue,
  name
}) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { value, name, onChange }, fieldState: { error } }) => {
        return <SwitchButton estado={value} handleClick={onChange} disabled={disabled} />
      }}
    />
  )
}

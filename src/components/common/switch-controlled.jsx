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
      render={({ field: { value, onChange } }) => {
        return <SwitchButton estado={value} handleClick={onChange} disabled={disabled} />
      }}
    />
  )
}

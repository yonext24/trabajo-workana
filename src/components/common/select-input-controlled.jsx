import { Controller } from 'react-hook-form'
import { SelectInput } from './select-input'

export function SelectInputControlled ({ control, name, handleOptionClick, defaultValue, options, rules }) {
  return <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue={defaultValue}
    render={({ field: { onChange, value } }) => (
      <SelectInput
        options={options}
        defaultValue={value}
        handleOptionClick={(selected) => {
          handleOptionClick && handleOptionClick(selected)
          onChange(selected)
        }}
      />
    )}
  />
}

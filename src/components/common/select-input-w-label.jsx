import { SelectInput } from './select-input'

export function SelectInputWithLabel({ labelText, id, name, noLabel = false, ...SelectInputProps }) {
  return (
    <div className={'flex flex-col'} id="input-w-label">
      {!noLabel && (
        <label htmlFor={id ?? name} className="font-semibold text-lg capitalize">
          {labelText ?? name}
        </label>
      )}
      <SelectInput name={name} {...SelectInputProps} />
    </div>
  )
}

import { SelectInputControlled } from './select-input-controlled'

export function SelectInputControlledWithLabel({
  labelText,
  id,
  name,
  noLabel = false,
  ...SelectInputControlledProps
}) {
  return (
    <div className={'flex flex-col'} id="input-w-label">
      {!noLabel && (
        <label htmlFor={id ?? name} className="font-semibold text-lg capitalize">
          {labelText ?? name}
        </label>
      )}
      <SelectInputControlled name={name} {...SelectInputControlledProps} />
    </div>
  )
}

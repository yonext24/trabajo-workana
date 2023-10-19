export function InputWLabel ({
  id,
  name,
  placeholder,
  labelText,
  type,
  inputClassName,
  register,
  isTextArea = false,
  noLabel = false,
  required,
  disabled,
  ...props
}) {
  return <div className={'flex flex-col'} id='input-w-label'>
    {
      !noLabel && <label htmlFor={id ?? name} className="font-semibold text-lg capitalize">{labelText ?? name}</label>
    }
    {
      isTextArea
        ? <textarea
          placeholder={placeholder ?? ''}
          className={`py-1 px-2 border-2 border-gris rounded-md w-full read-only:shadow-lg read-only:cursor-not-allowed ${inputClassName}`}
          id={id ?? name}
          name={name}
          type={type}
          readOnly={disabled} // Esto esta hecho porque me di cuenta muy tarde de que podía usar readOnly en vez de disabled
          {...props}
          {...(register && register(id ?? name, { required }))}
        />
        : <input
          placeholder={placeholder ?? ''}
          className={`py-1 px-2 border-2 border-gris rounded-md w-full read-only:shadow-lg read-only:cursor-not-allowed ${inputClassName}`}
          id={id ?? name}
          name={name}
          type={type}
          readOnly={disabled} // Esto esta hecho porque me di cuenta muy tarde de que podía usar readOnly en vez de disabled
          {...props}
          {...(register && register(id ?? name, { required }))}
        />
    }
  </div>
}

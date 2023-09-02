export function InputWLabel ({ id, name, placeholder, labelText, type, inputClassName, register, isTextArea = false, noLabel = false, required, ...props }) {
  return <div className={'flex flex-col'} id='input-w-label'>
    {
      !noLabel && <label htmlFor={id ?? name} className="font-semibold text-lg capitalize">{labelText ?? name}</label>
    }
    {
      isTextArea
        ? <textarea
          placeholder={placeholder ?? ''}
          className={`py-1 px-2 border-2 border-gris rounded-md w-full disabled:shadow-lg disabled:cursor-not-allowed ${inputClassName}`}
          id={id ?? name}
          name={name}
          type={type}
          {...props}
          {...(register && register(id ?? name, { required }))}
        />
        : <input
          placeholder={placeholder ?? ''}
          className={`py-1 px-2 border-2 border-gris rounded-md w-full disabled:shadow-lg disabled:cursor-not-allowed ${inputClassName}`}
          id={id ?? name}
          name={name}
          type={type}
          {...props}
          {...(register && register(id ?? name, { required }))}
        />
    }
  </div>
}

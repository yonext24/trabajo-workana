export function InputWLabel ({ id, name, placeholder, labelText, type, inputClassName, register, required, ...props }) {
  return <div className="flex flex-col">
    <label htmlFor={id} className="font-semibold text-lg">{labelText}</label>
    <input
      placeholder={placeholder ?? ''}
      className={`py-1 px-2 border-2 border-gris rounded-md w-full ${inputClassName}`}
      id={id}
      name={name}
      type={type}
      {...props}
      {...register(id, { required })}
    />
  </div>
}

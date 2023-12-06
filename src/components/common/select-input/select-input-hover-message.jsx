export function SelectInputHoverMessage({ error, disabled, loading, options, disabledMessage }) {
  if (!error && !disabled && !loading && options?.length >= 1) return null

  const defaultClassNames =
    'absolute top-0 left-0 -translate-y-full rounded-md p-2 text-sm animate-appear bg-azulfondo text-white'

  console.log(error)

  if (error)
    return <div className={`${defaultClassNames} bg-red-500 text-white`}>{String(error?.message ?? error)}</div>
  if (disabled) return <div className={`${defaultClassNames}`}>{disabledMessage ?? 'Esta opción está desactivada'}</div>
  if (loading) return <div className={`${defaultClassNames}`}>Cargando los datos</div>
  if (options?.length <= 0) return <div className={`${defaultClassNames}`}>No hay opciones disponibles</div>
}

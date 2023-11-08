import { Spinner } from './spinner'

export function SubmitButton({
  loading,
  text = 'Agregar',
  spinnerProps,
  className
}) {
  return (
    <button type="submit" disabled={loading} className={className ?? ''}>
      {loading ? <Spinner className={'h-4 w-4'} {...spinnerProps} /> : text}
    </button>
  )
}

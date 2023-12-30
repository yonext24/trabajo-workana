import { Spinner } from './spinner'

export function SubmitButton({ loading, text = 'Agregar', spinnerProps, className, disabled }) {
  return (
    <button type="submit" disabled={loading || disabled} className={className ?? ''}>
      {loading ? <Spinner className={'h-4 w-4'} {...spinnerProps} /> : text}
    </button>
  )
}

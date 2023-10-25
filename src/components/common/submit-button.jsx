import { Spinner } from './spinner'

export function SubmitButton ({ loading, text = 'Agregar', spinnerProps }) {
  return <button type='submit'>
    {
      loading ? <Spinner className={'h-4 w-4'} /> : text
    }
  </button>
}

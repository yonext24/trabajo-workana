import { useCallback, useState } from 'react'

export function useFormCustom() {
  // Este hook se utiliza para wrappear las funciones que se utilizan para enviar los formularios con handleSubmit
  // y tener un estado de loading

  const [loading, setLoading] = useState(false)

  const handleLoading = useCallback(
    fn => async data => {
      setLoading(true)
      await fn(data)
      setLoading(false)
    },
    []
  )

  return { loading, handleLoading }
}

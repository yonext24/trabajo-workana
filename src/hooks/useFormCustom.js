import { useState } from 'react'

export function useFormCustom() {
  const [loading, setLoading] = useState(false)

  const handleLoading = fn => async data => {
    setLoading(true)
    await fn(data)
    setLoading(false)
  }

  return { loading, handleLoading }
}

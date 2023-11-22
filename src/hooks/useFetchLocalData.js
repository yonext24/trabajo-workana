import { useEffect, useState } from 'react'

export function useFetchLocalData({ func, dependencies = [] }) {
  const [state, setState] = useState({ loading: false, error: null, data: [] })

  useEffect(() => {
    setState(prev => ({ ...prev, loading: true }))
    func(dependencies)
      .then(res => {
        setState({ loading: false, error: null, data: res })
      })
      .catch(err => {
        setState({ loading: false, error: err, data: [] })
      })
  }, dependencies)

  return state
}

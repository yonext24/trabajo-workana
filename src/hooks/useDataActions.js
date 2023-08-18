import { useDispatch } from 'react-redux'
import { set_general_dependencias_filtered } from '../store/data/slice'

export function useDataActions () {
  const dispatch = useDispatch()
  const setGeneralDependenciesFilteredData = (filteredData) => { dispatch(set_general_dependencias_filtered({ filteredData })) }

  return { setGeneralDependenciesFilteredData }
}

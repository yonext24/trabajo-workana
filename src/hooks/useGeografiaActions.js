import { set_geografia_pagination_data } from '@/store/geografia/slice'
import { get_geografia_municipios, get_geografia_params } from '@/store/geografia/thunks'
import { useDispatch } from 'react-redux'

export function useGeografiaActions() {
  const dispatch = useDispatch()

  const setGeoPaginationData = data => {
    dispatch(set_geografia_pagination_data(data))
  }

  const getGeoParams = async data => await dispatch(get_geografia_params(data))
  const getGeoMunicipios = async data => await dispatch(get_geografia_municipios(data))

  return { setGeoPaginationData, getGeoParams, getGeoMunicipios }
}
